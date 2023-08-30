import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useFilmsApi} from './hooks/useFilmsApi';
import { ListItem, ListItemButton, Skeleton, Typography } from '@mui/material';


const drawerWidth = 240;

interface ContentProps {
  selectedMovie: Film | null; // Replace 'Film' with the actual type
}
export default function ClippedDrawer(props: ContentProps) {
  const data = useFilmsApi();
  

  const renderFilmData = () => {
    const film = props.selectedMovie || data.films[0]; // Use the selectedMovie if available
  
    if (!film) {
      // Handle loading state or no data
      return <Skeleton variant="rectangular" width={500} height={200} />;
    }
  
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          {film.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Episode {film.episode_id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Director: {film.director}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Producer: {film.producer}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Release Date: {film.release_date}
        </Typography>
        <div className="opening-crawl">
          <Typography variant="h6" gutterBottom>
            Opening Crawl:
          </Typography>
          <Typography variant="body1">{film.opening_crawl}</Typography>
        </div>
        
        <Typography paragraph>
      {/* Characters */}
      Characters: {film.characters.map((characterUrl) => (
        <a key={characterUrl} href={characterUrl}>
          <button>{characterUrl}</button>
        </a>
      ))}
    </Typography>
    
    <Typography paragraph>
      {/* Planets */}
      Planets: {film.planets.map((planetUrl) => (
        <a key={planetUrl} href={planetUrl}>
          <button>{planetUrl}</button>
        </a>
      ))}
    </Typography>

    <Typography paragraph>
      {/* Starships */}
      Starships: {film.starships.map((starshipUrl) => (
        <a key={starshipUrl} href={starshipUrl}>
          <button>{starshipUrl}</button>
        </a>
      ))}
    </Typography>
    
    <Typography paragraph>
      {/* Vehicles */}
      Vehicles: {film.vehicles.map((vehicleUrl) => (
        <a key={vehicleUrl} href={vehicleUrl}>
          <button>{vehicleUrl}</button>
        </a>
      ))}
    </Typography>
    
    <Typography paragraph>
      {/* Species */}
      Species: {film.species.map((speciesUrl) => (
        <a key={speciesUrl} href={speciesUrl}>
          <button>{speciesUrl}</button>
        </a>
      ))}
    </Typography>
  </Box>
);
  };
  
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography paragraph>
        {/* Any introductory text or components */}
      </Typography>
      <Typography paragraph>
        {renderFilmData()}
      </Typography>
    </Box>
  );
}