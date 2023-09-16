import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardListProps from './types';

const MoviesCardList = ({
  onSaveMovie,
  onDeleteMovie,
  filteredMoviesArray,
  isShortMovies,
  serverResponceError,
  searchString,
  onClick,
  isHideButton,
}: MoviesCardListProps) => {
  const location = useLocation();
  const lastSearchString = JSON.parse(localStorage.getItem('lastSearchString')) || '';

  const getSearchErrorText = () => {
    if (location.pathname === '/movies' && serverResponceError !== '') {
      return serverResponceError;
    }

    if (
      location.pathname === '/movies' &&
      filteredMoviesArray.length === 0 &&
      lastSearchString === null
    ) {
      return 'Нужно ввести ключевое слово';
    }

    if (location.pathname === '/movies' && lastSearchString !== '') {
      return 'Ничего не найдено';
    }

    if (location.pathname === '/saved-movies' && searchString !== '') {
      return 'Ничего не найдено';
    }

    if (
      location.pathname === '/saved-movies' &&
      filteredMoviesArray.length === 0 &&
      isShortMovies
    ) {
      return 'Пока нет сохранённых короткометражных фильмов';
    }

    if (location.pathname === '/saved-movies' && filteredMoviesArray.length === 0) {
      return 'Пока нет сохранённых фильмов';
    }

    return;
  };

  return (
    <>
      {filteredMoviesArray?.length === 0 ? (
        <p className='search-error-text'>{getSearchErrorText()}</p>
      ) : null}
      <ul className='movies-card-list'>
        {filteredMoviesArray.map((movie: any) => {
          return (
            <MoviesCard
              key={movie.id}
              movie={movie}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })}
      </ul>

      {location.pathname === '/movies' && filteredMoviesArray.length !== 0 && !isHideButton ? (
        <div className='load-button'>
          <button className='load-button__more-btn' type='button' onClick={onClick}>
            Ещё
          </button>
        </div>
      ) : null}
    </>
  );
};

export default MoviesCardList;
