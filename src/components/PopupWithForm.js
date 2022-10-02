function PopupWithForm({
  name,
  heading,
  formType,
  formName,
  ariaLabel,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  children
}) {
  return(
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened': ''}`}>
      <div className="popup__container">
        <button type="button" className="button popup__close-button" aria-label="Закрыть форму" onClick={onClose}></button>
        <h2 className="popup__heading">{heading}</h2>
        <form className={`form form_type_${formType}`} name={formName} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`button form__submit-button ${isFormValid ? '' : 'form__submit-button_inactive'}`} aria-label={ariaLabel} disabled={!isFormValid}>{buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;