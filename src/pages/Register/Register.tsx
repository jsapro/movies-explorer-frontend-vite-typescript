import { useState } from 'react';
import './Register.css';
import Logo from '../../components/ui/Logo/Logo';
import AuthInput from '../../components/ui/AuthInput/AuthInput';
import AuthSubmit from '../../components/ui/AuthSubmit/AuthSubmit';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { EMAIL_REGEX, EMAIL_TITLE_TEXT } from '../../utils/constants';

const Register = ({ onRegister, isLocked }) => {
  const [serverResponseError, setServerResponseError] = useState('');
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister(values.name, values.email, values.password).catch((err) => {
      setServerResponseError(err.message);
    });
  };

  const handleChangeInput = (e) => {
    setServerResponseError('');
    handleChange(e);
  };

  return (
    <main className='register'>
      <div className='register__container'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form
          className='register__form'
          autoComplete='on'
          onSubmit={handleRegisterSubmit}
          noValidate
        >
          <AuthInput
            inputDescription='Имя'
            name='name'
            minLength='2'
            type='text'
            handleChange={handleChangeInput}
            inputError={errors.name}
            value={values.name}
          />
          <AuthInput
            inputDescription='E-mail'
            name='email'
            type='email'
            handleChange={handleChangeInput}
            inputError={errors.email}
            value={values.email}
            emailRegex={EMAIL_REGEX}
            title={EMAIL_TITLE_TEXT}
          />
          <AuthInput
            inputDescription='Пароль'
            name='password'
            minLength='8'
            type='password'
            handleChange={handleChangeInput}
            inputError={errors.password}
            value={values.password}
          />

          <AuthSubmit
            type='register'
            onRegister={onRegister}
            serverResponseError={serverResponseError}
            isValid={isValid}
            isLocked={isLocked}
          ></AuthSubmit>
        </form>
      </div>
    </main>
  );
};

export default Register;
