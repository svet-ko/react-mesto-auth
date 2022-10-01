import { Link } from 'react-router-dom';

function PopupWithBurgerMenu({
  isOpen,
  email,
  onLogOut
}) {
    return (
      <section className={`header__burger-popup ${isOpen && 'header__burger-popup_open'}`}>
        <p>{email}</p>
        <Link className="header__close-button" to="" onClick={onLogOut}>Выйти</Link>
      </section>
    )
}

export default PopupWithBurgerMenu;