import { useState, useEffect } from 'react';
import { getFilms } from '../api/films';


export function useFilmsApi() : { films: Film[]}{
    const [films, setFilms] = useState<Film[]>([]);
    getFilms().then(data => setFilms(data));
    return { films: films} 
}

