class MoviesApi {
  private _url: string
  
  constructor(url: string) {
    this._url = url;
  }

  getInitialMovies() {
    return fetch(this._url, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(new Error(`Ошибка получения фильмов с сервера: ${res.status}`));
    });
  }
}

export default MoviesApi;
