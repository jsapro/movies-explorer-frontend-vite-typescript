import './AuthInput.css';
import type { AuthInputProps } from './types';

const AuthInput = ({
  inputDescription,
  name,
  minLength,
  maxLength,
  type,
  handleChange,
  inputError,
  value,
  title,
  emailRegex,
}: AuthInputProps) => {
  return (
    <label className='auth-input'>
      <span className='auth-input__name'>{inputDescription}</span>
      <input
        className='auth-input__input'
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={value || ''}
        required
        onChange={handleChange}
        pattern={emailRegex}
        title={title}
      />
      <span className='auth-input__error-text'>{inputError}</span>
    </label>
  );
};

export default AuthInput;
