function checkInputValidity(e, isInputValid, setValidity, setValidityMessage) {
  if (e.target.type !== 'password'){
    setValidity(e.target.validity.valid);
    if (isInputValid) {
      setValidityMessage('');
    } else {
      setValidityMessage(e.target.validationMessage);
    }
  } else {
    const passw =  /^\w{6,10}$/;
    if(e.target.value.match(passw)) { 
      setValidity(true);
      setValidityMessage('');
    } else { 
      setValidity(false);
      setValidityMessage('Длина пароля должна быть не короче 6 и не превышать 10 символов');
    }
  }
}

export {checkInputValidity}