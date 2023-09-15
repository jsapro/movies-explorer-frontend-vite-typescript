interface SearchFormProps {
  onSearch: (isShortMovies: boolean, valueSearchInput: string) => [];
  onCheck: () => void;
  isShortMovies: boolean;
  searchString: string;
}

export default SearchFormProps;
