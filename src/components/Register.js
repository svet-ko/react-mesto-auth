import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkInputValidity } from '../utils/utils';

function Register({ onRegister }) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [isEmailInputValid, setIsEmailInputValid] = useState(false);
  const [emailChangeValidationMessage, setEmailChangeValidationMessage] = useState('');

  const [isPasswordInputValid, setIsPasswordInputValid] = useState(false);
  const [passwordChangeValidationMessage, setPasswordChangeValidationMessage] = useState('');

  const isFormValid = isEmailInputValid && isPasswordInputValid;

  function onPasswordChange(e) {
     setPassword(e.target.value);
     checkInputValidity(e, isPasswordInputValid, setIsPasswordInputValid, setPasswordChangeValidationMessage);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
    checkInputValidity(e, isEmailInputValid, setIsEmailInputValid, setEmailChangeValidationMessage);
  }


  function handleFormSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form className="form form_type_sign" onSubmit={handleFormSubmit}>
      <h2 className="form__header">Регистрация</h2>
      <fieldset className="form__set form__set_type_sign">
        <label className="form__field form__field_type_sign">
          <input
            type="email"
            className="form__input form__input_type_email form__input_type_sign"
            onChange={onEmailChange}
            value={email || ''}
            id="email" name="email"
            placeholder="Email"
            required
          />
          <span className={`form__input-error ${isEmailInputValid ? '' : 'form__input-error_visible'}`}>{emailChangeValidationMessage}</span>
        </label>
        <label className="form__field form__field_type_sign">
          <input
            type="password"
            className="form__input form__input_type_password form__input_type_sign"
            onChange={onPasswordChange}
            value={password || ''}
            id="password" name="password"
            placeholder="Пароль"
            required
          />
          <span className={`form__input-error ${isPasswordInputValid ? '' : 'form__input-error_visible'}`}>{passwordChangeValidationMessage}</span>
        </label>
      </fieldset>
      <button type="submit" className={`button form__submit-button form__submit-button_type_sign ${isFormValid ? '' : 'form__submit-button_inactive'}`} disabled={!isFormValid}>Зарегистрироваться</button>
      <p className="form__text">Уже зарегистрированы?
        <Link to="/sign-in" className="form__link"> Войти</Link>
      </p>
    </form>
  )
}

export default Register;