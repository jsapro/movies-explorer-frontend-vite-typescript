import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navigation.css';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Navigation = ({ isLoggedIn }) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(window.innerWidth <= 768);
  const [width, setWidth] = useState(window.innerWidth);

  // const  currentUser  = useContext(CurrentUserContext);

  const onResize = () => {
    setIsMobileMode(window.innerWidth <= 768);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [width]);

  const openBurger = () => {
    setIsBurgerOpen(true);
  };

  const closeBurger = () => {
    setIsBurgerOpen(false);
  };

  const getGuestNav = () => {
    return (
      <nav className='nav-guest'>
        <ul className='nav-guest__list'>
          <li>
            <Link to='/signup' className='nav-guest__link nav-guest__link_type_register'>
              Регистрация
            </Link>
          </li>
          <li>
            <Link to='/signin' className='nav-guest__link nav-guest__link_type_login'>
              Войти
            </Link>
          </li>
        </ul>
      </nav>
    );
  };

  const getDesktopNav = () => {
    return (
      <nav className='nav-desktop'>
        <ul className='nav-desktop__list'>
          <li className='nav-desktop__item'>
            <NavLink
              to='/movies'
              className={({ isActive }) =>
                `nav-desktop__link ${isActive && 'nav-desktop__link_active'}`
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className='nav-desktop__item'>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                `nav-desktop__link ${isActive && 'nav-desktop__link_active'}`
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className='nav-desktop__item nav-desktop__item_type_special'>
            <NavLink to='/profile' className='nav-desktop__link nav-desktop__link_type_special'>
              Аккаунт
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };

  const getBurgerNav = () => {
    return (
      <>
        <button onClick={openBurger} className='nav-burget-btn' />
        <section className={`nav-burger ${isBurgerOpen && 'nav-burger_opened'} `}>
          <div className='nav-burger__container'>
            <button onClick={closeBurger} className='nav-burger__close-btn' />
            <nav>
              <ul className='nav-burger__list'>
                <li className='nav-burger__item'>
                  <NavLink
                    onClick={closeBurger}
                    to='/'
                    className={({ isActive }) =>
                      `nav-burger__link ${isActive && 'nav-burger__link_type_active'}`
                    }
                  >
                    Главная
                  </NavLink>
                </li>
                <li className='nav-burger__item'>
                  <NavLink
                    onClick={closeBurger}
                    to='/movies'
                    className={({ isActive }) =>
                      `nav-burger__link ${isActive && 'nav-burger__link_type_active'}`
                    }
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li className='nav-burger__item'>
                  <NavLink
                    onClick={closeBurger}
                    to='/saved-movies'
                    className={({ isActive }) =>
                      `nav-burger__link ${isActive && 'nav-burger__link_type_active'}`
                    }
                  >
                    Сохранённые фильмы
                  </NavLink>
                </li>
                <li className='nav-burger__item'>
                  <NavLink
                    onClick={closeBurger}
                    to='/profile'
                    className='nav-burger__link nav-burger__link_type_special'
                  >
                    Аккаунт
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </>
    );
  };

  const getActualNav = () => {
    // if (!currentUser) return getGuestNav();
    if (!isLoggedIn) return getGuestNav();
    if (isMobileMode) return getBurgerNav();
    return getDesktopNav();
  };

  return getActualNav();
};

export default Navigation;
