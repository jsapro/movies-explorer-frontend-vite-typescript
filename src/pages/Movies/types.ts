import { SavedMovieType } from '../../utils/types';

interface MoviesProps {
  onSaveMovie: (movie: SavedMovieType) => Promise<void>;
  onDeleteMovie: (id: string) => Promise<void>;
  setCombinedMoviesArray: React.Dispatch<
    React.SetStateAction<[] | SavedMovieType[]>
  >;
  onSearch: () => Promise<void>;
  serverResponceError: string;
  isLoggedIn: boolean;
}

type MoviesConfigType = {
  numberOnStart: number,
  numberToAdd: number,
}

export type {MoviesProps, MoviesConfigType};
