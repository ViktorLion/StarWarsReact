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
import { Skeleton} from '@mui/material';
import { fetchFilms } from './api/data';



const drawerWidth = 210;

interface TocProps {
  onMovieClick: (film: Film) => void; 
}


export default function Toc(props: TocProps) {
  
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [favoriteStatus, setFavoriteStatus] = React.useState({});
  
  React.useEffect(() => {
    if (localStorage.getItem('films')) {
      setIsLoading(false);
      return;
    }
    fetchFilms().then((data) => {
      localStorage.setItem('films', JSON.stringify(data));
      setIsLoading(false);
    });
  }, []);


  const handleMovieClick = (film: Film) => {
    props.onMovieClick(film);
  };

  const isFavorite = (film: Film) => {
    const favoriteFilms = JSON.parse(localStorage.getItem('favoriteFilms') || '[]');
    return favoriteFilms.some((favoriteFilm: Film) => favoriteFilm.episode_id === film.episode_id);
  };



  // ...

  const renderFilms = () => {
    const data = JSON.parse(localStorage.getItem('films') || '{}')
    return data?.map((film: Film, index: number) => (
      <ListItem  sx={{
        
      }}
      key={index} disablePadding>
        <ListItemButton
          onClick={() => handleMovieClick(film)}
          sx={{
            background: isFavorite(film)
              ? '#b5e7a0'
              : '#d5e1df',
            borderRadius: '10px',
            borderColor: 'white',
            borderStyle: 'solid',
          }}
        >
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