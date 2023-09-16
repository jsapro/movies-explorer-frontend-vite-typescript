import { ChangeEvent } from 'react';
import './FilterCheckbox.css';
import type FilterCheckboxProps from './types';

const FilterCheckbox = ({ onCheck, isShortMovies }: FilterCheckboxProps) => {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onCheck(e);
  };

  return (
    <label className='filter-checkbox' htmlFor='checkbox'>
      <input
        onChange={handleCheck}
        className='filter-checkbox__input'
        id='checkbox'
        name='checkbox'
        type='checkbox'
        checked={isShortMovies}
      ></input>
      <span className='filter-checkbox__text'>Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
