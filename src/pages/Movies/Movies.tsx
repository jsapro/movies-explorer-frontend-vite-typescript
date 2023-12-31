import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import './Movies.css';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/constants';
import type { MoviesProps, MoviesConfigType } from './types';
import type { SavedMovieType } from '../../utils/types';

const Movies = ({
  onSaveMovie,
  onDeleteMovie,
  setCombinedMoviesArray,
  onSearch,
  serverResponceError,
  isLoggedIn,
  combinedMoviesArray,
}: MoviesProps) => {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [filteredMoviesArray, setFilteredMoviesArray] =
    useState(combinedMoviesArray);
  const [searchString, setSearchString] = useState('');
  const [numberToRender, setNumberToRender] = useState(1);
  const [isHideButton, setIsHideButton] = useState(false);

 

  useEffect(() => {
    onSearch()
      .then((combinedMoviesArray) => {
        setCombinedMoviesArray(combinedMoviesArray);
        const lastSearchStringStorage =
          localStorage.getItem('lastSearchString');
        const isShortMoviesStorage = localStorage.getItem('isShortMovies');
        if (
          lastSearchStringStorage &&
          isShortMoviesStorage &&
          JSON.parse(lastSearchStringStorage)?.length !== 0 &&
          JSON.parse(isShortMoviesStorage)?.length !== 0
        ) {
          const search = JSON.parse(lastSearchStringStorage);
          const isShort = JSON.parse(isShortMoviesStorage);
          const lastSearchResultArray = filterMovies(
            combinedMoviesArray,
            search,
            isShort
          );
          setFilteredMoviesArray(lastSearchResultArray);
          setSearchString(search);
          setIsShortMovies(isShort);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitSearch = useCallback( (searchString: string, isShortMovies: boolean) => {
    setSearchString(searchString);
    localStorage.setItem('lastSearchString', JSON.stringify(searchString));
    onSearch()
      .then((combinedMoviesArray) => {
        setCombinedMoviesArray(combinedMoviesArray);
        const filteredMoviesArray = filterMovies(
          combinedMoviesArray,
          searchString,
          isShortMovies
        );
        setFilteredMoviesArray(filteredMoviesArray);

        return filteredMoviesArray;
      })
      .catch((err) => console.log(err));

    return filteredMoviesArray;
  },[]);

  useEffect(() => {
    if (searchString !== '') {
      handleSubmitSearch(searchString, isShortMovies);
    }
  }, [handleSubmitSearch, isShortMovies, searchString]);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const isShort = e.target.checked;
    setIsShortMovies(isShort);
    localStorage.setItem('isShortMovies', JSON.stringify(isShort));
  };

  useEffect(() => {
    setNumberToRender(() => getMoviesConfig().numberOnStart);
  }, []);

  const getMoviesConfig = (): MoviesConfigType => {
    if (window.innerWidth < 768) {
      return {
        numberOnStart: 5,
        numberToAdd: 2,
      };
    }
    if (window.innerWidth < 1280) {
      return {
        numberOnStart: 8,
        numberToAdd: 2,
      };
    }
    if (window.innerWidth >= 1280) {
      return {
        numberOnStart: 12,
        numberToAdd: 3,
      };
    }
    return {
      numberOnStart: 8,
      numberToAdd: 2,
    };
  };

  useEffect(() => {
    if (filteredMoviesArray.length <= numberToRender) {
      return setIsHideButton(true);
    }
    setIsHideButton(false);
  }, [numberToRender, filteredMoviesArray, isShortMovies]);

  const handleMoreButton = () => {
    setNumberToRender((prevState) => prevState + getMoviesConfig().numberToAdd);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          onSearch={handleSubmitSearch}
          isShortMovies={isShortMovies}
          onCheck={handleCheckBox}
          searchString={searchString}
        />
        <MoviesCardList
          serverResponceError={serverResponceError}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          filteredMoviesArray={
            filteredMoviesArray.slice(
              0,
              numberToRender
            ) as Array<SavedMovieType>
          }
          onClick={handleMoreButton}
          isHideButton={isHideButton}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
