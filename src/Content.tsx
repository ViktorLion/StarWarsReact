import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { ListItem, ListItemButton, Skeleton, Typography } from '@mui/material';
import { fetchCharacterData ,fetchPlanetData, fetchSpeciesData, fetchStarshipsData, fetchVehicleData } from './api/data';
import  BasicModal from './ModalProps';


const drawerWidth = 240;

interface ContentProps {
  selectedMovie: Film | null; 
}
export default function ClippedDrawer(props: ContentProps) {
  
  const [characterData, setCharacterData] = useState<People[]>([]);
  const [planetData, setPlanetData] = useState<Planet[]>([]);
  const [starshipsData, setStarshipsData] = useState<Starships[]>([]);
  const [vehiclesData, setVehiclesData] = useState<Vehicles[]>([]);
  const [speciesData, setSpeciesData] = useState<Species[]>([]);
 
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCharacter, setSelectedCharacter] = useState<People | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedStarships, setSelectedStarships] = useState<Starships | null>(null);
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicles | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<'people' | 'planets' | 'starships' | 'species'| 'vehicles'>();

  useEffect(() => {
    setIsLoading(true);

    if (props.selectedMovie) {
      const cachedCharacterData = localStorage.getItem(`${props.selectedMovie.url}_characters`);
      const cachedPlanetData = localStorage.getItem(`${props.selectedMovie.url}_planets`);
      const cachedStarshipsData = localStorage.getItem(`${props.selectedMovie.url}_starships`);
      const cachedvehiclesData = localStorage.getItem(`${props.selectedMovie.url}_vehicles`);
      const cachedspeciesData = localStorage.getItem(`${props.selectedMovie.url}_species`);


      if (cachedCharacterData) {
        setCharacterData(JSON.parse(cachedCharacterData));
      }
      if (cachedPlanetData) {
        setPlanetData(JSON.parse(cachedPlanetData));
      }
      if (cachedStarshipsData) {
        setStarshipsData(JSON.parse(cachedStarshipsData));
      }
      if (cachedvehiclesData) {
        setStarshipsData(JSON.parse(cachedvehiclesData));
      }
      if (cachedspeciesData) {
        setStarshipsData(JSON.parse(cachedspeciesData));
      }


      // Fetch and store data if not cached
    if (!cachedCharacterData || !cachedPlanetData || !cachedStarshipsData || !cachedvehiclesData || !cachedspeciesData) {
        Promise.all([
          fetchCharacterData(props.selectedMovie.characters),
          fetchPlanetData(props.selectedMovie.planets),
          fetchStarshipsData(props.selectedMovie.starships),
          fetchVehicleData(props.selectedMovie.vehicles),
          fetchSpeciesData(props.selectedMovie.species)
        ]).then(([characters, planets, starships,vehicles,species]) => {
          setCharacterData(characters);
          setPlanetData(planets);
          setStarshipsData(starships);
          setVehiclesData(vehicles);
          setSpeciesData(species);
          setIsLoading(false);

          if (props.selectedMovie?.url) {
            localStorage.setItem(`${props.selectedMovie.url}_characters`, JSON.stringify(characters));
            localStorage.setItem(`${props.selectedMovie.url}_planets`, JSON.stringify(planets));
            localStorage.setItem(`${props.selectedMovie.url}_starships`, JSON.stringify(starships));
            localStorage.setItem(`${props.selectedMovie.url}_vehicles`, JSON.stringify(vehicles));
            localStorage.setItem(`${props.selectedMovie.url}_species`, JSON.stringify(species));
          }
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [props.selectedMovie]);

 

  const renderFilmData = () => {

    const data = JSON.parse(localStorage.getItem('films') || '{}')
    
    const film = props.selectedMovie  

    if (!film) {

      return <Skeleton variant="rectangular" width={500} height={200} />;
    }

  const renderCharactersData = (data: People[] ) => {
    if (isLoading) {
      return <Skeleton variant="rectangular" width={500} height={100} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <button
            key={item.url}
            onClick={() => {
              setSelectedCharacter(item);
              setIsModalOpen('people');
            }}
          >
            {item.name}
          </button>
        ))}
        {isModalOpen && selectedCharacter && (
          <BasicModal
            title={selectedCharacter.name}
            isOpen={isModalOpen === 'people'}
            handleClose={() => setIsModalOpen(undefined)}
          >
          <p>Height: {selectedCharacter.height}</p>
          <p>Mass: {selectedCharacter.mass}</p>
          <p>Hair Color: {selectedCharacter.hair_color}</p>
          <p>Skin Color: {selectedCharacter.skin_color}</p>
          <p>Eye Color: {selectedCharacter.eye_color}</p>
          <p>Birth Year: {selectedCharacter.birth_year}</p>
          <p>Gender: {selectedCharacter.gender}</p>
          <p>Homeworld: {selectedCharacter.homeworld}</p>
          <p>Films: {selectedCharacter.films.join(', ')}</p>
          <p>Vehicles: {selectedCharacter.vehicles.join(', ')}</p>
          <p>Starships: {selectedCharacter.starships.join(', ')}</p>
          </BasicModal>
        )}
      </>
    );
  };

  const renderPlanetData = (data: Planet[]) => {
    if (isLoading) {
      return <Skeleton variant="rectangular" width={500} height={100} />;
    }
    return (
      <>
        {data.map((planet) => (
          <button
            key={planet.url}
            onClick={() => {
              setSelectedPlanet(planet);
              setIsModalOpen('planets');
            }}
          >
            {planet.name}
          </button>
        ))}
        {isModalOpen && selectedPlanet && (
          <BasicModal
            title={selectedPlanet.name}
            isOpen={isModalOpen === 'planets'}
            handleClose={() => setIsModalOpen(undefined)}
          >
            <p>Rotation Period: {selectedPlanet.rotation_period}</p>
            <p>Orbital Period: {selectedPlanet.orbital_period}</p>
            <p>Diameter: {selectedPlanet.diameter}</p>
            <p>Climate: {selectedPlanet.climate}</p>
            <p>Gravity: {selectedPlanet.gravity}</p>
            <p>Terrain: {selectedPlanet.terrain}</p>
            <p>Surface Water: {selectedPlanet.surface_water}</p>
            <p>Population: {selectedPlanet.population}</p>
            <p>Residents: {selectedPlanet.residents.join(', ')}</p>
            <p>Films: {selectedPlanet.films.join(', ')}</p>
            
          </BasicModal>
        )}
      </>
    );
  };
    
  const renderStarshipsData = (data: Starships[]) => {
    if (isLoading) {
      return <Skeleton variant="rectangular" width={500} height={100} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <button
            key={item.url}
            onClick={() => {
              setSelectedStarships(item);
              setIsModalOpen('starships');
            }}
          >
            {item.name}
          </button>
        ))}
        {isModalOpen && selectedStarships && (
          <BasicModal
            title={selectedStarships.name}
            isOpen={isModalOpen === 'starships'}
            handleClose={() => setIsModalOpen(undefined)}
          >
            <p>Name: {selectedStarships.name}</p>
            <p>Model: {selectedStarships.model}</p>
            <p>Manufacturer: {selectedStarships.manufacturer}</p>
            <p>Cost in Credits: {selectedStarships.cost_in_credits}</p>
            <p>Length: {selectedStarships.length}</p>
            <p>Max Atmosphering Speed: {selectedStarships.max_atmosphering_speed}</p>
            <p>Crew: {selectedStarships.crew}</p>
            <p>Passengers: {selectedStarships.passengers}</p>
            <p>Cargo Capacity: {selectedStarships.cargo_capacity}</p>
            <p>Consumables: {selectedStarships.consumables}</p>
            <p>Hyperdrive Rating: {selectedStarships.hyperdrive_rating}</p>
            <p>MGLT: {selectedStarships.MGLT}</p>
            <p>Starship Class: {selectedStarships.starship_class}</p>
            <p>Pilots: {selectedStarships.pilots.join(', ')}</p>
            <p>Films: {selectedStarships.films.join(', ')}</p>
          </BasicModal>
        )}
      </>
    );
  };

  const renderVehiclesData = (data: Vehicles[]) => {
    if (isLoading) {
      // Handle loading state or no data
      return <Skeleton variant="rectangular" width={500} height={200} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <button
            key={item.url}
            onClick={() => {
              setSelectedVehicles(item);
              setIsModalOpen('vehicles');
            }}
          >
            {item.name}
          </button>
        ))}
        {isModalOpen && selectedVehicles && (
          <BasicModal
            title={selectedVehicles.name}
            isOpen={isModalOpen===  'vehicles'}
            handleClose={() => setIsModalOpen(undefined)}
          >
            <p>Name: {selectedVehicles.name}</p>
            <p>Model: {selectedVehicles.model}</p>
            <p>Manufacturer: {selectedVehicles.manufacturer}</p>
            <p>Cost in Credits: {selectedVehicles.cost_in_credits}</p>
            <p>Length: {selectedVehicles.length}</p>
            <p>Max Atmosphering Speed: {selectedVehicles.max_atmosphering_speed}</p>
            <p>Crew: {selectedVehicles.crew}</p>
            <p>Passengers: {selectedVehicles.passengers}</p>
            <p>Cargo Capacity: {selectedVehicles.cargo_capacity}</p>
            <p>Consumables: {selectedVehicles.consumables}</p>
            <p>Vehicle Class: {selectedVehicles.vehicle_class}</p>
            <p>Pilots: {selectedVehicles.pilots.join(', ')}</p>
            <p>Films: {selectedVehicles.films.join(', ')}</p>
          </BasicModal>
        )}
      </>
    );
  };
  
  const renderSpeciesData = (data: Species[]) => {
    if (isLoading) {
      // Handle loading state or no data
      return <Skeleton variant="rectangular" width={500} height={200} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <button
            key={item.url}
            onClick={() => {
              setSelectedSpecies(item);
              setIsModalOpen('species');
            }}
          >
            {item.name}
          </button>
        ))}
        {isModalOpen && selectedSpecies && (
          <BasicModal
            title={selectedSpecies.name}
            isOpen={isModalOpen === 'species'}
            handleClose={() => setIsModalOpen(undefined)}
          >
            <p>Name: {selectedSpecies.name}</p>
            <p>Classification: {selectedSpecies.classification}</p>
            <p>Designation: {selectedSpecies.designation}</p>
            <p>Average Height: {selectedSpecies.average_height}</p>
            <p>Skin Colors: {selectedSpecies.skin_colors}</p>
            <p>Hair Colors: {selectedSpecies.hair_colors}</p>
            <p>Eye Colors: {selectedSpecies.eye_colors}</p>
            <p>Average Lifespan: {selectedSpecies.average_lifespan}</p>
            <p>Homeworld: {selectedSpecies.homeworld}</p>
            <p>Language: {selectedSpecies.language}</p>
            <p>People: {selectedSpecies.people.join(', ')}</p>
            <p>Films: {selectedSpecies.films.join(', ')}</p>
          </BasicModal>
        )}
      </>
    );
  };


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
        <Typography variant="h6" gutterBottom>
          Characters:
          {renderCharactersData(characterData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Planets
          {renderPlanetData(planetData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Starships
          {renderStarshipsData(starshipsData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Vehicles
          {renderVehiclesData(vehiclesData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Species
          {renderSpeciesData(speciesData)}
        </Typography>

  </Box>
);
  };
  
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {renderFilmData()}
    </Box>
  );
}