import { SavedMovieType } from '../../utils/types';

interface MoviesProps {
  onSaveMovie: (movie: SavedMovieType) => void;
  onDeleteMovie: (id: string) => Promise<void>;
  setCombinedMoviesArray: React.Dispatch<React.SetStateAction<[] | SavedMovieType[]>>;
  onSearch: () => Promise<void>;
  serverResponceError: string;
  isLoggedIn: boolean;
}

export default MoviesProps;
