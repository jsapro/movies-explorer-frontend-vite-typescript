import { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Page404 from '../../pages/Page404/Page404';
import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import {
  BEATFILMMOVIES_URL,
  BASIC_MOVIES_URL,
  MAIN_BACKEND_URL,
} from '../../utils/constants';
import type {
  BitfilmMovieType,
  SavedMovieType,
  BitfilmImageType,
} from '../../utils/types';
import type { CurrentUserContextType } from '../../contexts/CurrentUserContext';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const App = () => {
  const moviesApi = new MoviesApi(BEATFILMMOVIES_URL);
  const mainApi = useMemo(() => new MainApi(MAIN_BACKEND_URL), []);
  const [combinedMoviesArray, setCombinedMoviesArray] = useState<
    [] | SavedMovieType[]
  >([]);
  const [currentUser, setCurrentUser] = useState<
    CurrentUserContextType | Record<string, never>
  >({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));
  const [serverResponceError, setServerResponceError] = useState<string | ''>(
    ''
  );
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleTokenCheck = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      mainApi
      .getUserInfo()
      .then((user) => {
        if (user.data._id) {
          setCurrentUser(user.data);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
    }
  }, [mainApi]);
  
  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck, isLoggedIn]);

  const hahdleSubmitSearch = () => {
    const storage = localStorage.getItem('combinedMoviesArray');
    if (storage && JSON.parse(storage)?.length !== 0) {
      return Promise.resolve(JSON.parse(storage));
    }
    return Promise.all([moviesApi.getInitialMovies(), mainApi.getMovies()])
      .then(([initialMovies, savedMovies]) => {
        const combinedMoviesArray: SavedMovieType[] = initialMovies.map(
          (initialMovie: BitfilmMovieType<BitfilmImageType>) => {
            const savedMovie = savedMovies.data.find(
              (savedMovieItem: SavedMovieType) => {
                return savedMovieItem.movieId === initialMovie.id;
              }
            );
            const thumbnail =
              BASIC_MOVIES_URL + initialMovie.image.formats.thumbnail.url;
            const image = BASIC_MOVIES_URL + initialMovie.image.url;

            const resultArray = initialMovie as unknown as BitfilmMovieType<string>;
            resultArray.thumbnail = thumbnail;
            resultArray.image = image;

            if (savedMovie !== undefined) {
              resultArray._id = savedMovie._id;
            } else {
              resultArray._id = '';
            }

            return resultArray;
          }
        );
        localStorage.setItem(
          'combinedMoviesArray',
          JSON.stringify(combinedMoviesArray)
        );
        setServerResponceError('');
        setCombinedMoviesArray(
          combinedMoviesArray as unknown as SavedMovieType[]
        );
        return combinedMoviesArray;
      })
      .catch((err) => {
        setServerResponceError(err.message);
        console.log(`Ошибка Promise.all: ${err.message}`);
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('combinedMoviesArray');
    localStorage.removeItem('isShortMovies');
    localStorage.removeItem('lastSearchString');
    navigate('/', { replace: true });
  };

  const handleUserRegister = (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    setIsLocked(true);
    return (
      mainApi
        .register(name, email, password)
        .then(() => {
          handleUserLogin(email, password);
        })
        // .catch((err) => console.log(err))
        .finally(() => setIsLocked(false))
    );
  };

  const handleUserLogin = (email: string, password: string) => {
    setIsLocked(true);
    return (
      mainApi
        .login(email, password)
        .then(() => {
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        })
        // .catch((err) => console.log(err))
        .finally(() => setIsLocked(false))
    );
  };

  const handleUpdateUserInfo = (name: string, email: string) => {
    setIsLocked(true);
    return (
      mainApi
        .updateUserInfo(name, email)
        .then((currentUser) => {
          setCurrentUser(currentUser.data);
        })
        // .catch((err) => console.log(err))
        .finally(() => setIsLocked(false))
    );
  };

  const handleSaveMovie = (movie: SavedMovieType) => {
    return mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        const updatedMoviesArray = combinedMoviesArray.map((oldMovie) => {
          if (oldMovie.id === savedMovie.data.movieId) {
            oldMovie._id = savedMovie.data._id;
            oldMovie.thumbnail = savedMovie.data.thumbnail;
            oldMovie.image = savedMovie.data.image;
          }
          return oldMovie;
        });
        setCombinedMoviesArray(updatedMoviesArray);
        localStorage.setItem(
          'combinedMoviesArray',
          JSON.stringify(updatedMoviesArray)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (id: string) => {
    return mainApi
      .deleteMovie(id)
      .then((deletedMovie) => {
        const updatedMoviesArray = combinedMoviesArray.map((oldMovie) => {
          if (oldMovie._id === deletedMovie.data._id) {
            oldMovie._id = '';
          }
          return oldMovie;
        });
        setCombinedMoviesArray(updatedMoviesArray);
        localStorage.setItem(
          'combinedMoviesArray',
          JSON.stringify(updatedMoviesArray)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser as CurrentUserContextType}>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path='/signin'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login handleUserLogin={handleUserLogin} isLocked={isLocked} />
              )
            }
          />
          <Route
            path='/signup'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register onRegister={handleUserRegister} isLocked={isLocked} />
              )
            }
          />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route
              path='/movies'
              element={
                <Movies
                  isLoggedIn={isLoggedIn}
                  onSearch={hahdleSubmitSearch}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                  setCombinedMoviesArray={setCombinedMoviesArray}
                  combinedMoviesArray={combinedMoviesArray}
                  serverResponceError={serverResponceError}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  onDeleteMovie={handleDeleteMovie}
                  combinedMoviesArray={combinedMoviesArray}
                  setCombinedMoviesArray={setCombinedMoviesArray}
                  onSearch={hahdleSubmitSearch}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  handleSignOut={handleSignOut}
                  isLoggedIn={isLoggedIn}
                  onUpdateUser={handleUpdateUserInfo}
                  isLocked={isLocked}
                />
              }
            />
          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;