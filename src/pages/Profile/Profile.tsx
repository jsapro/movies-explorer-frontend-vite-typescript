import './Profile.css';
import Header from '../../components/ui/Header/Header';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useEffect } from 'react';
import { EMAIL_REGEX, EMAIL_TITLE_TEXT } from '../../utils/constants';
import type ProfileProps from './types';

const Profile = ({ handleSignOut, isLoggedIn, onUpdateUser, isLocked }: ProfileProps) => {
  const currentUser = useContext(CurrentUserContext);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { values, handleChange, errors, isValid, setIsValid, setValues } = useFormWithValidation();

  const onSignOut = () => {
    handleSignOut();
  };

  const handleSubmit = (e: React.FormEvent <HTMLInputElement>) => {
    e.preventDefault();
    const name = values.name;
    const email = values.email;
    onUpdateUser(name, email)
      .then(() => {
        setSuccessMessage('Успешное обновление профиля');
      })
      .catch(() => {
        setErrorMessage('Неверно введены данные. Попробуйте ещё раз');
      });
  };

  useEffect(() => {
    if (currentUser !== null && values.email === currentUser.email && values.name === currentUser.name) {
      return setIsValid(false);
    }
  }, [values, currentUser]);

  useEffect(() => {
    setErrorMessage('');
  }, [values]);

  const handleEdit = () => {
    setIsReadyToSave(true);
  };

  useEffect(() => {
    setValues((prevState: object) => {
      return { ...prevState, name: currentUser!.name, email: currentUser!.email };
    });
  }, [currentUser]);

  const handleFocus = () => {
    setSuccessMessage('');
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <main className='profile'>
        <h1 className='profile__title'>Привет, {currentUser!.name}!</h1>
        <form className='profile__form' name='profile' onSubmit={handleSubmit} noValidate>
          <label className='profile__label'>
            <span className='profile__input-description'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              minLength={2}
              maxLength={30}
              required
              onChange={handleChange}
              value={values.name || ''}
              onFocus={handleFocus}
            />
          </label>
          <span className='profile__span-error'>{errors.name}</span>
          <label className='profile__label'>
            <span className='profile__input-description'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              name='email'
              minLength={3}
              required
              onChange={handleChange}
              value={values.email || ''}
              pattern={EMAIL_REGEX}
              title={EMAIL_TITLE_TEXT}
              onFocus={handleFocus}
            />
          </label>
          <span className='profile__span-error'>{errors.email}</span>
          <div className='profile__btn-container'>
            {isReadyToSave ? (
              <>
                <p
                  className={`profile__submit-message ${
                    successMessage && 'profile__submit-message_type_succsess'
                  } ${errorMessage && 'profile__submit-message_type_error'}`}
                >
                  {errorMessage || successMessage}
                </p>
                <button
                  className='profile__submit-btn'
                  type='submit'
                  onClick={() => {}}
                  disabled={!isValid || errorMessage || isLocked}
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <button className='profile__edit-btn' type='button' onClick={handleEdit}>
                  Редактировать
                </button>
                <button className='profile__logout-btn' type='button' onClick={onSignOut}>
                  Выйти из аккаунта
                </button>
              </>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default Profile;
