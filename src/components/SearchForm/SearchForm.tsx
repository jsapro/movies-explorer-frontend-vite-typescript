import { FormEvent, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../ui/FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import type SearchFormProps from './types';

const SearchForm = ({ onSearch, onCheck, isShortMovies, searchString }: SearchFormProps) => {
  const { values, handleChange, isValid, setValues } = useFormWithValidation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(values.searchInput, isShortMovies);
  };

  useEffect(() => {
    setValues((prevState) => {
      return { ...prevState, searchInput: searchString };
    });
  }, [searchString]);

  useEffect(() => {
    setValues((prevState) => {
      return { ...prevState, searchInput: searchString };
    });
  }, []);

  return (
    <section className='search-form'>
      <form onSubmit={handleSubmit} className='search-form__form' name='searchForm' noValidate>
        <div className='search-form__container'>
          <input
            onChange={handleChange}
            value={values.searchInput}
            className='search-form__input'
            placeholder='Фильм'
            type='text'
            name='searchInput'
            required
          />
          <button className='search-form__button' type='submit' disabled={!isValid}></button>
        </div>
        <FilterCheckbox onCheck={onCheck} isShortMovies={isShortMovies} />
      </form>
    </section>
  );
};

export default SearchForm;
