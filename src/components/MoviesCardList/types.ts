import { SavedMovieType } from '../../utils/types'

interface MoviesCardListProps {
    onSaveMovie?: (movie: SavedMovieType) => Promise<void>
    onDeleteMovie: (id: string) => Promise<void>,
    filteredMoviesArray: Array<SavedMovieType> ,
    isShortMovies?: boolean,
    serverResponceError?: string,
    searchString?: string,
    onClick?: () => void,
    isHideButton?: boolean,
}

export default MoviesCardListProps