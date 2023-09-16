import { ChangeEvent } from 'react';
import { SavedMovieType } from '../../utils/types';

interface SearchFormProps {
  onSearch: (searchString: string, isShortMovies: boolean) => SavedMovieType;
  onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  isShortMovies: boolean;
  searchString: string;
}

export default SearchFormProps;
