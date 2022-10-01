import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip ({
  isOpen,
  onClose,
  isRegistered,
}) {
  return (
    <section className={`popup ${(isOpen) ? 'popup_opened': ''}`} aria-label="Уведомление о регистрации">
    <div className="popup__container popup__container_type_tooltip">
        <button type="button" className="button popup__close-button" aria-label="Закрыть окно с уведомлением" onClick={onClose}></button>
        <img 
          src={ (isRegistered) ? success : error }
          alt ={ (isRegistered) ? 'Значок успешной регистрации' : 'Значок ошибки при регистрации' }
          className="popup__image popup__image_type_tooltip"
        />
        <p className="popup__caption popup__caption_type_tooltip">{ (isRegistered) ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }</p>
    </div>
  </section>
  )
}

export default InfoTooltip;