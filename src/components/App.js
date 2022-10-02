import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] = useState(false);

  const [currentEmail, setCurrentEmail] = React.useState('');
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const history = useHistory();  

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setCurrentEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.warn(err);
        })
    }
  }, [history]);

  useEffect(() => {
    loggedIn && Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([res, initialCards]) => {
        setCurrentUser(res);
        setCards(initialCards);
      })
      .catch((err) => {
        console.warn(err);
      })
  }, [loggedIn]);

  function handleRegistration(email, password) {
    let isRegistered = false;
    auth.register(email, password)
      .then(() => {
        isRegistered = true;
        history.push('/sign-in');
      })
      .catch((err) => {
        isRegistered = false;
      })
      .finally(()=>{
        setIsInfoTooltipSuccessed(isRegistered);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setIsInfoTooltipSuccessed(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(
        setCards((state) => state.filter((c) => {
        return c._id !== card._id
        }))
      )
      .catch((err) => {
        console.warn(err);
      })
  }

  function handleUpdateUser({name, about}) {
    api.applyUserInfo({name, about})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.warn(err);
      })
  }

  function handleAvatarUpdate({avatar}) {
    api.updateUserAvatar(avatar)
      .then((res)=> {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.warn(err);
      })
  }

  function handleAddPlace({name, link}) {
    api.sendCreatedCard({name, link})
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.warn(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header 
            loggedIn={loggedIn}
            email={currentEmail}
            handleLogOut={handleLogOut}
          />

          <Switch>
            <ProtectedRoute exact path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onLikeClick={handleCardLike}
              onTrashClick={handleCardDelete}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegistration} />
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {loggedIn && <Footer />}

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          /> 

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          
          <PopupWithForm
            name="remove-confirm"
            heading="Вы уверены?"
            formType="remove-confirm"
            formName="remove"
            ariaLabel="Согласие"
            buttonText="Да"
          ></PopupWithForm>

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
          /> 

          <ImagePopup isOpen={isImagePopupOpen} selectedCard={selectedCard} onClose={closeAllPopups}/>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessed={isInfoTooltipSuccessed}
            successText='Вы успешно зарегистрировались!'
            errorText='Что-то пошло не так! Попробуйте ещё раз.'
          />
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
