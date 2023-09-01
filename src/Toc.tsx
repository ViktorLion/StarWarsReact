import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Skeleton, Typography } from '@mui/material';
import { fetchFilms } from './api/data';

const drawerWidth = 210;

interface TocProps {
  onMovieClick: (film: Film) => void; 
}


export default function Toc(props: TocProps) {
  
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const cachedFilms = localStorage.getItem('films');
    if (cachedFilms?.length) {
      setIsLoading(false);
      return;
    }
   
    fetchFilms()
      .then(filmsData => {
        localStorage.setItem('films', JSON.stringify(filmsData));

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching films:', error);
        setIsLoading(false);
      });
  }, []);



 
  const handleMovieClick = (film: Film) => {
    props.onMovieClick(film);
  };


  const renderFilms = () => {
    const data = JSON.parse(localStorage.getItem('films') || '{}')
    return data?.map((film: Film, index: number) => (
      <ListItem key={index} disablePadding>
        <ListItemButton onClick={() => handleMovieClick(film)}>
          <ListItemText primary={film.title} />
        </ListItemButton>
      </ListItem>
    ));
  };

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
        <List>
          {isLoading ? renderFilmsLoading() : renderFilms()}
        </List>
      </Box>
    </Drawer>
  );
}