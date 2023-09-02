import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import Toc from './Toc';
import Content from './Content';


export default function App() {
  const [selectedMovie, setSelectedMovie] = React.useState<Film | null>(null);
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
 
  
  const addFilmFavorite = (film: Film) => {
    const storedFavoriteFilms: Film[] = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    
    // Check if the film is already in favorites
    const isFilmInFavorites = storedFavoriteFilms.some(
      (favoriteFilm: Film) => favoriteFilm.episode_id === film.episode_id
    );
  
    // store the updated list of favorite films
    let newFavoriteFilms: Film[] = [];
  
    if (isFilmInFavorites) {
      // Remove the film from favorites
      newFavoriteFilms = storedFavoriteFilms.filter(
        (favoriteFilm: Film) => favoriteFilm.episode_id !== film.episode_id
      );
    } else {
      // Add the film to favorites
      newFavoriteFilms = [...storedFavoriteFilms, film];
    }

    localStorage.setItem('favoriteFilms', JSON.stringify(newFavoriteFilms));
    setFavoriteFilms(newFavoriteFilms);
  };

  const handleMovieClick = (film: Film) => {
    setSelectedMovie(film);
  };

  
  

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Toc onMovieClick={handleMovieClick} />
      <Content favoriteFilms={favoriteFilms} selectedMovie={selectedMovie} addFilmFavorite={addFilmFavorite} />
      <footer />
    </Box>
  );
}
