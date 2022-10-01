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
import PopupWithBurgerMenu from './PopupWithBurgerMenu';
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
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [currentEmail, setCurrentEmail] = React.useState('');
  const [currentUser, setcurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisteredIn, setIsRegisteredIn] = React.useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const history = useHistory();

  function handleRegistration(email, password) {
    console.log(email);
    console.log(password);
    auth.register(email, password)
      .then((data) => {
        if (data) {
          setIsRegisteredIn(true)
          setIsInfoTooltipOpen(true)
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsRegisteredIn(false)
        setIsInfoTooltipOpen(true)
        console.log(err);
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setCurrentEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
    setBurgerOpen(!isBurgerOpen);
  }  

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
          console.log(err);
        })
    }
  }, [history]);

  function handleBurgerClick() {
    setBurgerOpen(!isBurgerOpen);
  }

  useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setcurrentUser(res);
    })
    .catch((err) => {
        console.warn(err);
      })
}, []);

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

  function fetchCardsInfo() {
      api.getInitialCards()
      .then((initialCards) => {
          setCards(initialCards);
      })
      .catch((err) => {
          console.warn(err);
        })
  }

  useEffect(() => {
      fetchCardsInfo();
  }, []); 

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
      setcurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.warn(err);
    })
  }

  function handleAvatarUpdate({avatar}) {
    api.updateUserAvatar(avatar)
    .then((res)=> {
      setcurrentUser(res);
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

          <PopupWithBurgerMenu
            isOpen={isBurgerOpen}
            onClose={closeAllPopups}
            email={currentEmail}
            onLogOut={handleLogOut}
          />

          <Header 
            loggedIn={loggedIn}
            email={currentEmail}
            isBurgerOpen={isBurgerOpen}
            onBurgerClick={handleBurgerClick}
            onLogOut={handleLogOut}
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
            isRegistered={isRegisteredIn} 
          />
        </div>

      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
