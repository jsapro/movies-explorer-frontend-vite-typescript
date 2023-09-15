import { useState } from 'react';
import './Login.css';
import AuthInput from '../../components/ui/AuthInput/AuthInput';
import AuthSubmit from '../../components/ui/AuthSubmit/AuthSubmit';
import Logo from '../../components/ui/Logo/Logo';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { EMAIL_REGEX, EMAIL_TITLE_TEXT } from '../../utils/constants';
import type { LoginProps } from './types';

const Login = ({ handleUserLogin, isLocked }: LoginProps) => {
  const [serverResponseError, setServerResponseError] = useState('');
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleUserLogin(values.email, values.password).catch((err: Error) => {
      setServerResponseError(err.message);
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerResponseError('');
    handleChange(e);
  };

  return (
    <main className='login'>
      <div className='login__container'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
        <form
          name='login'
          className='login__form'
          autoComplete='on'
          onSubmit={handleLoginSubmit}
          noValidate
        >
          <AuthInput
            inputDescription='E-mail'
            name='email'
            type='email'
            handleChange={handleChangeInput}
            inputError={errors.email}
            emailRegex={EMAIL_REGEX}
            value={values.email}
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
            type='login'
            serverResponseError={serverResponseError}
            isValid={isValid}
            isLocked={isLocked}
          />
        </form>
      </div>
    </main>
  );
};

export default Login;
