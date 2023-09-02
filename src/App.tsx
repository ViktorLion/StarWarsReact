import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import Toc from './Toc';
import Content from './Content';

export default function App() {
  // State to store the selected movie and favorite films
  const [selectedMovie, setSelectedMovie] = React.useState<Film | null>(null);
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
  
  useEffect(() => {
    // Load favorite films from local storage when the component mounts
    const storedFavoriteFilms: Film[] = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    if (storedFavoriteFilms) {
      setFavoriteFilms(storedFavoriteFilms);
    }
  }, []);
  
  // Function to add or remove a film from favorites
  const addFilmFavorite = (film: Film) => {
    const storedFavoriteFilms: Film[] = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    
    // Check if the film is already in favorites
    const isFilmInFavorites = storedFavoriteFilms.some(
      (favoriteFilm: Film) => favoriteFilm.episode_id === film.episode_id
    );
  
    // Store the updated list of favorite films
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

    // Update the list of favorite films in local storage and state
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
      
    </Box>
  );
}
