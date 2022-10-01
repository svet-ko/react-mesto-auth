import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { checkInputValidity } from '../utils/utils';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}){
  const avatar = useRef();
  const [isInputValid, setIsInputValid] = useState(false);
  const [avatarChangeValidationMessage, setAvatarChangeValidationMessage] = useState('');
  const isFormValid = isInputValid;

  function onInputChange(e) {
    checkInputValidity(e, isInputValid, setIsInputValid, setAvatarChangeValidationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      avatar.current.value = '';
      setAvatarChangeValidationMessage('');
      setIsInputValid(false);
    }
}, [isOpen]);

  return(
    <PopupWithForm
      name="edit-avatar"
      heading="Обновить аватар"
      formType="edit"
      formName="edit"
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
            type="url"
            className="form__input form__input_type_url"
            ref={avatar}
            onChange={onInputChange}
            id="url-avatar"
            name="avatar"
            placeholder="Ссылка на новый аватар"
            required
          />
          <span className={`form__input-error ${isInputValid ? '' : 'form__input-error_visible'}`}>{avatarChangeValidationMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;