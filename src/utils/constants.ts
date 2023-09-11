export const BEATFILMMOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BASIC_MOVIES_URL = 'https://api.nomoreparties.co';
// export const MAIN_BACKEND_URL = 'http://localhost:3000';
export const MAIN_BACKEND_URL = 'https://api.viewport-jsapro.nomoreparties.co';

export const filter = (movies, search, isShort) => {
  return movies.filter((movie) => {
    const matchedSearch =
      movie.nameRU.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
      movie.nameEN.trim().toLowerCase().includes(search.trim().toLowerCase());

    return isShort ? movie.duration <= 40 && matchedSearch : matchedSearch;
  });
};

export const EMAIL_REGEX = '^[a-zA-Z0-9]+[a-zA-Z0-9\\-_.]+@[a-z]+\\.[a-z]{2,4}$';
export const EMAIL_TITLE_TEXT =
  'Электронный адрес должен состоять из имени пользователя, знака @ и доменного имени. Имена пользователей должны начинаться с буквы, могут содержать: буквы (a-z, A-Z), цифры (0-9). Пример: test01@test.ru';
