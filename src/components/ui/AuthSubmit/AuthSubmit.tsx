import { Link, useLocation } from 'react-router-dom';
import './AuthSubmit.css';
import type AuthSubmitProps from './types';

const AuthSubmit = ({ type, serverResponseError, isValid, isLocked }: AuthSubmitProps) => {
  const location = useLocation();

  return (
    <div className={`auth-submit auth-submit_type_${type}`}>
      <p className='auth-submit__error-text'>{serverResponseError}</p>
      {location.pathname === '/signup' ? (
        <>
          <button className='auth-submit__button' type='submit' disabled={!isValid || isLocked}>
            Зарегистрироваться
          </button>

          <p className='auth-submit__question'>
            Уже зарегистрированы?
            <Link className='auth-submit__link' to='/signin'>
              Войти
            </Link>
          </p>
        </>
      ) : (
        <>
          <button className='auth-submit__button' type='submit' disabled={!isValid || isLocked}>
            Войти
          </button>

          <p className='auth-submit__question'>
            Ещё не зарегистрированы?
            <Link className='auth-submit__link' to='/signup'>
              Регистрация
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthSubmit;
