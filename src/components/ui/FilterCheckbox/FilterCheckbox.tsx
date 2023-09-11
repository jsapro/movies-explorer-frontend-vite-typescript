import './FilterCheckbox.css';

const FilterCheckbox = ({ onCheck, isShortMovies }) => {
  const handleCheck = (e) => {
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
