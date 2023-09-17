import { ChangeEvent, useState } from 'react';

type initialValueType = {
  name: string;
  email: string;
  password: string;
  searchInput: string;
};

type initialErrorType = {
  name: string;
  email: string;
  password: string;
};

const useFormWithValidation = () => {
  const [values, setValues] = useState<initialValueType>({
    name: '',
    email: '',
    password: '',
    searchInput: '',
  });
  const [errors, setErrors] = useState<initialErrorType>({
    name: '',
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    if (event.target.closest('form') !== null) {
      const formElement = event.target.closest('form');
      setIsValid(formElement!.checkValidity());
    }
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setValues,
  };
};

export default useFormWithValidation;
