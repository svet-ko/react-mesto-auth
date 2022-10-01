import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({
  card,
  image,
  name,
  likesCount,
  onCardClick,
  onLikeClick,
  onTrashClick
}){
  const currentUserInfoContext = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUserInfoContext._id;
  const cardDeleteButtonClassName = (
    `button element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  ); 
  const isLiked = card.likes.some(i => i._id === currentUserInfoContext._id);
  const cardLikeButtonClassName = (`button element__like-button ${isLiked ? 'element__like-button_active' : ''}`)

  return(
      <li className="element">
        <button type="button" className={cardDeleteButtonClassName} onClick={() => onTrashClick(card)}/>
        <img src={image} alt={name} className="element__image" onClick={() => onCardClick(card)}/>
        <div className="element__content">
          <h2 className="element__name">{name}</h2>
          <div className="element__like">
            <button type="button" className={cardLikeButtonClassName} onClick={() => onLikeClick(card)} aria-label="Поставить оценку нравится"></button>
            <p className="element__like-counter">{likesCount}</p>
          </div>
        </div>
      </li>
  )
}

export default Card;