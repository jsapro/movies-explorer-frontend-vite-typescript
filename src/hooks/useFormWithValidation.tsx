import { useCallback, useState } from 'react';

const useFormWithValidation = () => {
  const [values, setValues] = useState<
    Record<'name' | 'email' | 'password' | 'searchInput', string> | Record<string, never>
  >({});
  const [errors, setErrors] = useState<
    Record<'name' | 'email' | 'password', string> | Record<string, never>
  >({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setIsValid,
    setValues,
  };
};

export default useFormWithValidation;
