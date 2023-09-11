// import { useState, useEffect } from 'react';
// import './SavedMovies.css';
// import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
// import Header from '../../components/ui/Header/Header';
// import Footer from '../../components/ui/Footer/Footer';
// import SearchForm from '../../components/SearchForm/SearchForm';
// import { filter } from '../../utils/constants';

// const SavedMovies = ({
//   combinedMoviesArray,
//   onDeleteMovie,
//   onSearch,
//   setCombinedMoviesArray,
//   isLoggedIn,
// }: any) => {
//   const [isShortMovies, setIsShortMovies] = useState(false);
//   const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);
//   const [searchString, setSearchString] = useState('');

//   useEffect(() => {
//     onSearch()
//       .then((combinedMoviesArray) => {
//         setCombinedMoviesArray(combinedMoviesArray);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     handleSubmitSearch(searchString, isShortMovies);
//   }, [isShortMovies, combinedMoviesArray]);

//   const handleSubmitSearch = (searchString, isShortMovies) => {
//     setSearchString(searchString);
//     const onlySavedMoviesArray = combinedMoviesArray.filter((movie) => movie._id !== '');
//     const filteredMoviesArray = filter(onlySavedMoviesArray, searchString, isShortMovies);
//     setFilteredMoviesArray(filteredMoviesArray);
//     return filteredMoviesArray;
//   };

//   const handleCheckBox = (e) => {
//     setIsShortMovies(e.target.checked);
//   };

//   return (
//     <>
//       <Header isLoggedIn={isLoggedIn} />
//       <main>
//         <SearchForm
//           onSearch={handleSubmitSearch}
//           isShortMovies={isShortMovies}
//           onCheck={handleCheckBox}
//         />
//         <MoviesCardList
//           isShortMovies={isShortMovies}
//           onDeleteMovie={onDeleteMovie}
//           filteredMoviesArray={filteredMoviesArray}
//           searchString={searchString}
//         />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default SavedMovies;
