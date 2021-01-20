import React,{ useState , useEffect } from 'react';
import MovieList from './movieList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieListheading from './movieListHeading.js';
import SearchBox from './searchBox.js';
import AddFav from './AddFav.js';
import RemoveFav from './RemoveFav.js';



function App() {

const[movies, SetMovies]=useState([]);
const[favourites, Setfav]=useState([]);
const[searchValue,setSearchValue]=useState('');
const getMovRequest= async ()=>{
  const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=34fb6f45`;
  const response= await fetch(url);
  const responseJson=await response.json();
  if (responseJson.Search) {
    SetMovies(responseJson.Search);  
  }
  
};

useEffect(()=>{
  getMovRequest(searchValue);
},[searchValue]);

useEffect(()=>{
  const movieFav=JSON.parse(
    localStorage.getItem('react-movie-app-favorites')
);
  Setfav(movieFav);
},[]);

const savetoLocalStorage=(items)=>{
  localStorage.setItem('react-movie-app-favorites',JSON.stringify(items))
}

const AddFavMov=(movie)=>{
  const newFavList=[...favourites,movie];
  Setfav(newFavList);
  savetoLocalStorage(newFavList);
}

const RemovFavMov=(movie)=>{
  const newFavList= favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
    );
  Setfav(newFavList);
  savetoLocalStorage(newFavList);
}

  return (
    <div className='container-fluid movie-app'> 
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListheading heading='Movies'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
      <div className='row'> 
        <MovieList movies={movies} handleFavList={AddFavMov} FavoriteComp={AddFav}/>
    </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListheading heading='Favorites'/>
    </div>
    <div className='row'> 
        <MovieList movies={favourites} handleFavList={RemovFavMov} FavoriteComp={RemoveFav}/>
    </div>
    </div>
    );
}

export default App;
