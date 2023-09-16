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
  };
  
