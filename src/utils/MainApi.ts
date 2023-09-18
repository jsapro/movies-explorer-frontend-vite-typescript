import { SavedMovieType } from './types';

class MainApi {
  private _baseUrl: string;
  
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.statusText}`));
  }

  _request(endPoint: string, options = {}) {
    const params = {
      headers: {
        'Content-Type-1': 'application/json',
        AuthorizationA: `Bearer ${localStorage.getItem('jwt')}`,
      },
      ...options,
    };
    return fetch(`${this._baseUrl}/${endPoint}`, params).then(
      this._checkResponse
    );
  }

  register(name: string, email: string, password: string) {
    return this._request('signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  login(email: string, password: string) {
    return this._request('signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(({ data }) => {
      localStorage.setItem('jwt', data);
    });
  }

  getUserInfo() {
    return this._request('users/me/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
  }

  updateUserInfo(name: string, email: string) {
    return this._request('users/me/', {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        email,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getMovies() {
    return this._request('movies/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  saveMovie(movie: SavedMovieType) {
    return this._request('movies/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  deleteMovie(id: string) {
    return this._request(`movies/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

export default MainApi;


