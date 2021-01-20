import React from 'react';

const MovieList=(props)=>{
	const FavoriteComp= props.FavoriteComp;
	return(
		<>
		{props.movies.map((movie, index)=><div className='image-container d-flex justify-content-start m-3'>
			<img src={movie.Poster} alt='movie'></img>
			<div onClick={()=>props.handleFavList(movie)} className='overlay d-flex align-items-center justify-content-ceter'>
				<FavoriteComp />
				</div>
			</div>)}
		</>	
		);

}


export default MovieList;