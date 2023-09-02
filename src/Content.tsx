import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


import { Button,  Skeleton, Typography } from '@mui/material';
import { fetchAllSpeciesData,  fetchAllVehicleData , fetchAllCharacterData,fetchAllPlanetData,fetchAllStarshipsData} from './api/data';
import ModalProps from './ModalProps';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


interface ContentProps {
  selectedMovie: Film | null; 
  favoriteFilms: Film[];
  addFilmFavorite: (film: Film) => void;
}
export default function ClippedDrawer(props: ContentProps) {
  
  
  const [vehiclesData, setVehiclesData] = useState<Vehicles[]>([]);
  const [characterData, setCharacterData] = useState<Characters[]>([]);
  const [planetData, setPlanetData] = useState<Planet[]>([]);
  const [starshipsData, setStarshipsData] = useState<Starships[]>([]);
  const [speciesData, setSpeciesData] = useState<Species[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Characters | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedStarships, setSelectedStarships] = useState<Starships | null>(null);
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicles | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<'people' | 'planets' | 'starships' | 'species' | 'vehicles'>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const data = JSON.parse(localStorage.getItem('films') || '{}')
  let film = props.selectedMovie

  if(data && !film) {
    film = data[0]
  }
  
  useEffect(() => {
    setIsFavorite(props.favoriteFilms.some((favoriteFilm: Film) => favoriteFilm.episode_id === film?.episode_id))
  }, [props.favoriteFilms, film]);

  React.useEffect(() => {
    const films = localStorage.getItem('films');
    const cachedVehicles = localStorage.getItem('vehicles');
    const cachedSpecies = localStorage.getItem('species');
    const cachedCharacters = localStorage.getItem('characters');
    const cachedPlanets = localStorage.getItem('planets');
    const cachedStarships = localStorage.getItem('starships');
  
    if (cachedVehicles && cachedSpecies && cachedCharacters && cachedPlanets && cachedStarships && films) {
      setIsLoading(false);
    } else {
      Promise.all([
        fetchAllVehicleData(),
        fetchAllSpeciesData(),
        fetchAllCharacterData(),
        fetchAllPlanetData(),
        fetchAllStarshipsData(),
      ])
        .then(([vehiclesData, speciesData, charactersData, planetsData, starshipsData]) => {
          setVehiclesData(vehiclesData);
          setSpeciesData(speciesData);
          setCharacterData(charactersData);
          setPlanetData(planetsData);
          setStarshipsData(starshipsData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const movie = props.selectedMovie || film;

    if (movie) {
      setIsLoading(true);
      const veichlesdata = JSON.parse(localStorage.getItem("vehicles") || '{}')
      const speciesdata = JSON.parse(localStorage.getItem("species") || '{}')
      const characterdata = JSON.parse(localStorage.getItem("characters") || '[]');
      const planetdata = JSON.parse(localStorage.getItem("planets") || '{}')
      const starshipsdata = JSON.parse(localStorage.getItem("starships") || '{}')


      const matchingVehicles = movie?.vehicles.filter((selectedVehicleUrl) => {
        return veichlesdata.some((vehicleData : Vehicles) => vehicleData.url === selectedVehicleUrl);
      });
      const selectedVeichelsData = veichlesdata.filter((vehicleData: Vehicles) => {
        return matchingVehicles?.includes(vehicleData.url);
      });
      setVehiclesData(selectedVeichelsData);
      
      const matchingSpecies = movie?.species.filter((selectedSpeciesUrl) => {
        return speciesdata.some((speciesData : Species) => speciesData.url === selectedSpeciesUrl);
      }
      );
      const selectedSpeciesData = speciesdata.filter((speciesData: Species) => {
        return matchingSpecies?.includes(speciesData.url);
      }
      );
      setSpeciesData(selectedSpeciesData);

      const matchingCharacter = movie?.characters.filter((selectedCharacterUrl) => {
        return characterdata.some((characterData : Characters) => characterData.url === selectedCharacterUrl);
      }
      );
      const selectedCharacterData = characterdata.filter((characterData: Characters) => {
        return matchingCharacter?.includes(characterData.url);
      }
      );
      setCharacterData(selectedCharacterData);

      const matchingPlanet = movie?.planets.filter((selectedPlanetUrl) => {
        return planetdata.some((planetData : Planet) => planetData.url === selectedPlanetUrl);
      }
      );

      const selectedPlanetData = planetdata.filter((planetData: Planet) => {
        return matchingPlanet?.includes(planetData.url);
      }
      );
      setPlanetData(selectedPlanetData);

      const matchingStarships = movie?.starships.filter((selectedStarshipsUrl) => {
        return starshipsdata.some((starshipsData : Starships) => starshipsData.url === selectedStarshipsUrl);
      }
      );
      const selectedStarshipsData = starshipsdata.filter((starshipsData: Starships) => {
        return matchingStarships?.includes(starshipsData.url);
      }
      );

      setStarshipsData(selectedStarshipsData);
      
      setIsLoading(false);
    }


 }, [props.selectedMovie, props.favoriteFilms]);


  const renderFilmData = () => {

    if (!film) {

      return <Skeleton variant="rectangular" width={500} height={200} />;
    }

  const renderCharactersData = (data: Characters[]) => {
    if (isLoading) {
      return <Skeleton variant="rectangular" width={500} height={100} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <Button variant="outlined" size="small"  
          sx={{
            fontSize: '12px',
            margin: '2px', 
          }}
            key={item.url}
            onClick={() => {
              setSelectedCharacter(item);
              setIsModalOpen('people');
            }}
          >
            {item.name}
          </Button>
        ))}
        {isModalOpen && selectedCharacter && (
          <ModalProps
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
          </ModalProps>
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
          <Button variant="outlined"  size="small"  
          sx={{
            fontSize: '12px',
            margin: '2px', 
          }}
            key={planet.url}
            onClick={() => {
              setSelectedPlanet(planet);
              setIsModalOpen('planets');
            }}
          >
            {planet.name}
          </Button>
        ))}
        {isModalOpen && selectedPlanet && (
          <ModalProps
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

          </ModalProps>
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
          <Button variant="outlined" size="small"   
          sx={{
            fontSize: '12px',
            margin: '2px', 
          }}
            key={item.url}
            onClick={() => {
              setSelectedStarships(item);
              setIsModalOpen('starships');
            }}
          >
            {item.name}
          </Button>
        ))}
        {isModalOpen && selectedStarships && (
          <ModalProps
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
          </ModalProps>
        )}
      </>
    );
  };

  const renderVehiclesData = (data: Vehicles[]) => {
    if (isLoading) {

      return <Skeleton variant="rectangular" width={500} height={200} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <Button variant="outlined"   size="small" 
          sx={{
            fontSize: '12px',
            margin: '2px', 
          }}
            key={item.url}
            onClick={() => {
              setSelectedVehicles(item);
              setIsModalOpen('vehicles');
            }}
          >
            {item.name}
          </Button>
        ))}
        {isModalOpen && selectedVehicles && (
          <ModalProps
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
          </ModalProps>
        )}
      </>
    );
  };
  
  const renderSpeciesData = (data: Species[]) => {
    if (isLoading) {
      
      return <Skeleton variant="rectangular" width={500} height={200} />;
    }
  
    return (
      <>
        {data.map((item) => (
          <Button variant="outlined"  size="small"  
          sx={{
            fontSize: '12px',
            margin: '2px', 
          }}
            key={item.url}
            onClick={() => {
              setSelectedSpecies(item);
              setIsModalOpen('species');
            }}
          >
            {item.name}
          </Button>
        ))}
        {isModalOpen && selectedSpecies && (
          <ModalProps
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
            <p>Language: {selectedSpecies.language}</p> 
          </ModalProps>
        )}
      </>
    );
  };

  const renderAddFavoriteButton = (film: Film) => {

    return (
      <Button  size="small" 
        variant="outlined"
        color={isFavorite ? "secondary" : "primary"}
        onClick={() => props.addFilmFavorite(film)}
        endIcon={isFavorite ? <StarIcon/> : <StarBorderIcon /> }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    );
  };


    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
        {film.title} {renderAddFavoriteButton(film)}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Episode: {film.episode_id}
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
        <Typography variant="h6" gutterBottom paragraph > 
          Characters:
          {renderCharactersData(characterData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Planets:
          {renderPlanetData(planetData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Starships:
          {renderStarshipsData(starshipsData)}
        </Typography> 
        <Typography variant="h6" gutterBottom>
          Vehicles:
          {renderVehiclesData(vehiclesData)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Species:
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