import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Toc from './Toc';
import Content from './Content';


export default function App() {
  const [selectedMovie, setSelectedMovie] = React.useState<Film | null>(null);

  const handleMovieClick = (film: Film) => {
    setSelectedMovie(film);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Toc onMovieClick={handleMovieClick} />
      <Content selectedMovie={selectedMovie} />
    </Box>
  );
}