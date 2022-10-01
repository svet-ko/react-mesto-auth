import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm';
import { checkInputValidity } from '../utils/utils';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}){

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [isNameInputValid, setIsNameInputValid] = useState(false);
  const [nameChangeValidationMessage, setNameChangeValidationMessage] = useState('');

  const [isLinkInputValid, setIsLinkInputValid] = useState(false);
  const [linkChangeValidationMessage, setLinkChangeValidationMessage] = useState('');

  const isFormValid = isLinkInputValid && isNameInputValid;

  function onNameChange(e) {
    setName(e.target.value);
    checkInputValidity(e, isNameInputValid, setIsNameInputValid, setNameChangeValidationMessage);
  }

  function onLinkChange(e) {
    setLink(e.target.value);
    checkInputValidity(e, isLinkInputValid, setIsLinkInputValid, setLinkChangeValidationMessage);
  }

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return(
    <PopupWithForm
      name="add-place"
      heading="Новое место"
      formType="place"
      formName="place"
      ariaLabel="Создать новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_type_place"
            value={name || ''}
            onChange={onNameChange}
            id="place" name="place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className={`form__input-error ${isNameInputValid ? '' : 'form__input-error_visible'}`}>{nameChangeValidationMessage}</span>
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__input form__input_type_url"
            value={link || ''}
            onChange={onLinkChange}
            id="url"
            name="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className={`form__input-error ${isLinkInputValid ? '' : 'form__input-error_visible'}`}>{linkChangeValidationMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;