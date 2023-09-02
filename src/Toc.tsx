import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Skeleton } from '@mui/material';
import { fetchFilms } from './api/data';
import StarIcon from '@mui/icons-material/Star';

const drawerWidth = 250;

interface TocProps {
  onMovieClick: (film: Film) => void;
}

export default function Toc(props: TocProps) {
  // State to track loading status
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch films data if not available in local storage
  React.useEffect(() => {
    if (localStorage.getItem('films')) {
      setIsLoading(false);
      return;
    }
    // Fetch films data and store it in local storage
    fetchFilms().then((data) => {
      localStorage.setItem('films', JSON.stringify(data));
      setIsLoading(false);
    });
  }, []);

  // Handle movie click event
  const handleMovieClick = (film: Film) => {
    props.onMovieClick(film);
  };

  // Check if a film is in the favorites list
  const isFavoriteFilm = (film: Film) => {
    const favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    return favoriteFilms?.some((favoriteFilm: Film) => favoriteFilm.episode_id === film.episode_id);
  };

  // Render the list of films
  const renderFilms = () => {
    const data = JSON.parse(localStorage.getItem('films') || '{}');
    return data?.map((film: Film, index: number) => (
      <ListItem
        sx={{
          marginTop: '15px', 
        }}
        key={index}
        disablePadding
      >
        <ListItemButton onClick={() => handleMovieClick(film)}>
          <ListItemText primary={film.title} />
          {isFavoriteFilm(film) ? <StarIcon color="secondary" /> : null} {/* Display a star icon for favorites */}
        </ListItemButton>
      </ListItem>
    ));
  };

  // Render loading skeleton while data is being fetched
  const renderFilmsLoading = () => {
    return [0, 1, 2, 3, 4, 5, 6].map((index: number) => (
      <ListItem key={index} disablePadding>
        <ListItemButton>
          <Skeleton width={200} />
        </ListItemButton>
      </ListItem>
    ));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>{isLoading ? renderFilmsLoading() : renderFilms()}</List>
      </Box>
    </Drawer>
  );
}
