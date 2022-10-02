import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import burger from '../images/burger.svg'
import close from '../images/close.svg'

function Header({
  loggedIn,
  email,
  handleLogOut
}) {
  const { pathname } = useLocation();
  const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const path = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;  

  const [isBurgerOpen, setBurgerOpen] = useState(false);

  function handleBurgerClick() {
    setBurgerOpen((state) => !state);
  }

  function onLogOut() {
    if (isBurgerOpen) {
      handleBurgerClick();
    }
    handleLogOut();
  }

  return(
    <>
      <section className={`burger-popup ${isBurgerOpen && 'burger-popup_open'}`}>
        <p className="burger-popup__paragraph">{email}</p>
        <button className="button burger-popup__close-button" onClick={onLogOut}>Выйти</button>
      </section>
      <header className="header">
        <img className="logo" src={logo} alt="Логотип"/>
        <div> 
          { loggedIn ?
            (
              <div className="header__context">
                <p className="header__email">{email}</p>
                <button className="button header__close-button" onClick={onLogOut}>Выйти</button>
              </div>
            ) : (<Link to={path} className="header__link">{text}</Link>)
          }
        </div>
        {loggedIn ? (<img className="header__burger" src={(!isBurgerOpen) ? burger : close} onClick={handleBurgerClick} alt="Кнопка Меню" /> ) : ''}
      </header>
    </>
  )
}

export default Header;