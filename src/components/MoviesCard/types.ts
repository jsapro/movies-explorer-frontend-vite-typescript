import { SavedMovieType } from '../../utils/types';

interface MoviesCardProps {
  movie: SavedMovieType;
  onSaveMovie?: (movie: SavedMovieType) => Promise<void>
  onDeleteMovie: (id: string) => Promise<void>;
}

export default MoviesCardProps;
