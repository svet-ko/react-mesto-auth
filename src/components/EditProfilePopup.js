import React, { useState, useEffect } from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { checkInputValidity } from '../utils/utils';

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser
}){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [isNameInputValid, setIsNameInputValid] = useState(true);
  const [nameChangeValidationMessage, setNameChangeValidationMessage] = useState('');

  const [isAboutInputValid, setIsAboutInputValid] = useState(true);
  const [aboutChangeValidationMessage, setAboutChangeValidationMessage] = useState('');

  const isFormValid = isAboutInputValid && isNameInputValid;

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]); 

  function onNameChange(e) {
    setName(e.target.value);
    checkInputValidity(e, isNameInputValid, setIsNameInputValid, setNameChangeValidationMessage);
  }

  function onDescriptionChange(e) {
    setDescription(e.target.value);
    checkInputValidity(e, isAboutInputValid, setIsAboutInputValid, setAboutChangeValidationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return(
    <PopupWithForm 
      name="edit"
      heading="Редактировать профиль"
      formType="edit"
      formName="form-edit"
      ariaLabel="Сохранить изменения"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_type_name"
            onChange={onNameChange}
            value={name || ''}
            id="name" name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className={`form__input-error ${isNameInputValid ? '' : 'form__input-error_visible'}`}>{nameChangeValidationMessage}</span>
        </label>
        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_type_about"
            value={description || ''}
            onChange={onDescriptionChange}
            id="about" name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className={`form__input-error ${isAboutInputValid ? '' : 'form__input-error_visible'}`}>{aboutChangeValidationMessage}</span>
        </label>
      </fieldset>
  </PopupWithForm>
  )
}

export default EditProfilePopup;