import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUserInfoContext = React.useContext(CurrentUserContext);

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUserInfoContext.avatar} alt="Аватар пользователя"/>
            <button type="button" className="button profile__avatar-overlay" aria-label="Изменить аватар" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__user">
              <h1 className="profile__user-name">{currentUserInfoContext.name}</h1>
              <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__user-about">{currentUserInfoContext.about}</p>
          </div>
        </div>
        <button type="button" className="button profile__add-button" aria-label="Добавить картинку" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Список картинок пользователя">
        <ul className="list elements__list">
          {
              props.cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  image={card.link}
                  name={card.name}
                  likesCount={card.likes.length}
                  onCardClick={props.onCardClick}
                  onLikeClick={props.onLikeClick}
                  onTrashClick={props.onTrashClick}
                />
              ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;