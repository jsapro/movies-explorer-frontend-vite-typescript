import { SavedMovieType } from '../../utils/types';

interface SavedMoviesProps {
  combinedMoviesArray: SavedMovieType[];
  onDeleteMovie: (id: string) => Promise<void>;
  onSearch: () => Promise<void>;
  setCombinedMoviesArray: React.Dispatch<
    React.SetStateAction<[] | SavedMovieType[]>
  >;
  isLoggedIn: boolean;
}

export default SavedMoviesProps;
