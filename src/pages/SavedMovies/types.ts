import { SavedMovieType } from '../../utils/types';

interface SavedMoviesProps {
  combinedMoviesArray: SavedMovieType[];
  onDeleteMovie: (id: string) => Promise<void>;
  onSearch: () => Promise<SavedMovieType[]>;
  setCombinedMoviesArray: React.Dispatch<
    React.SetStateAction<[] | SavedMovieType[]>
  >;
  isLoggedIn: boolean;
}

export default SavedMoviesProps;
