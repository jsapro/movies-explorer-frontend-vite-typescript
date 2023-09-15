class MainApi {
  private _baseUrl: string;
  private _defaultHeaders: { 'Content-Type': string };
  private _authHeaders: { Authorization: string; 'Content-Type': string };
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this._authHeaders = {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    };
  }

  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.statusText}`));
  }

  _request(endPoint, options = {}) {
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

  login(email, password) {
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

  updateUserInfo(name, email) {
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

  saveMovie(movie) {
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

  deleteMovie(id) {
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

// type Test = Partial<BitfilmImageType>;

export type BitfilmImageType = {
  alternativeText: string;
  caption: string;
  created_at: string;
  ext: string;
  formats: {
    small: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      path: null;
      size: number;
      url: string;
      width: number;
    };
    thumbnail: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      path: null;
      size: number;
      url: string;
      width: number;
    };
  };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string;
  provider: string;
  provider_metadata: null;
  size: number;
  updated_at: string;
  url: string;
  width: number;
};

export type BitfilmMovieType = {
  country: string;
  created_at: string;
  description: string;
  director: string;
  duration: number;
  id: number;
  image: BitfilmImageType;
  nameEN: string;
  nameRU: string;
  trailerLink: string;
  updated_at: string;
  year: string;
  thumbnail?: string;
  _id?: string;
};

export type SavedMovieType = Omit<BitfilmMovieType, 'image'> & {
  image: string;
  thumbnail: string;
  _id: string;
  owner?: string;
  movieId?: number;
  ddd: Test;
};

enum Test {
  aaa = 'default',
  bbb = 'primary',
}

Object.values(Test)[0];

Test.bbb;
