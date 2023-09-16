import { useState, useEffect, ChangeEvent } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import { filterMovies } from '../../utils/constants';
import type { SavedMovieType } from '../../utils/types';
import type SavedMoviesProps from './types';

const SavedMovies = ({
  combinedMoviesArray,
  onDeleteMovie,
  onSearch,
  setCombinedMoviesArray,
  isLoggedIn,
}: SavedMoviesProps) => {
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    onSearch()
      .then((combinedMoviesArray: SavedMovieType[]) => {
        setCombinedMoviesArray(combinedMoviesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleSubmitSearch(searchString, isShortMovies);
  }, [isShortMovies, combinedMoviesArray]);

  const handleSubmitSearch = (
    searchString: string,
    isShortMovies: boolean
  ): SavedMovieType => {
    setSearchString(searchString);
    const onlySavedMoviesArray = combinedMoviesArray.filter(
      (movie: SavedMovieType) => movie._id !== ''
    );
    const filteredMoviesArray = filterMovies(
      onlySavedMoviesArray,
      searchString,
      isShortMovies
    );
    setFilteredMoviesArray(filteredMoviesArray);
    return filteredMoviesArray;
  };

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShortMovies(e.target.checked);
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
          isShortMovies={isShortMovies}
          onDeleteMovie={onDeleteMovie}
          filteredMoviesArray={filteredMoviesArray}
          searchString={searchString}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
