function ImagePopup(props) {
    return(
      <section className={`popup popup_type_photo ${(props.isOpen) ? 'popup_opened': ''}`} aria-label="Увеличенная выбранная картинка">
        <div className="popup__photo-container">
          <button 
            type="button"
            className="button popup__close-button"
            aria-label="Закрыть увеличенную картинку"
            onClick={props.onClose}>              
          </button>
          <img src={props.selectedCard.link} alt ={props.selectedCard.name} className="popup__image"/>
          <p className="popup__caption">{props.selectedCard.name}</p>
        </div>
      </section>
    )
}

export default ImagePopup;