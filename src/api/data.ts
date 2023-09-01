export async function fetchAllCharacterData(): Promise<People[]> {
    let allCharacters: People[] = [];
    let nextPage = 'https://swapi.dev/api/people/';
  
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      allCharacters = allCharacters.concat(data.results);
      nextPage = data.next;
    }
  
    localStorage.setItem('characters', JSON.stringify(allCharacters));
    return allCharacters;
  }

  export async function fetchAllPlanetData(): Promise<Planet[]> {
    let allPlanets: Planet[] = [];
    let nextPage = 'https://swapi.dev/api/planets/';
  
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      allPlanets = allPlanets.concat(data.results);
      nextPage = data.next;
    }
  
    localStorage.setItem('planets', JSON.stringify(allPlanets));
    return allPlanets;
  }

  export async function fetchAllStarshipsData(): Promise<Starships[]> {
    let allStarships: Starships[] = [];
    let nextPage = 'https://swapi.dev/api/starships/';
  
    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      allStarships = allStarships.concat(data.results);
      nextPage = data.next;
    }
  
    localStorage.setItem('starships', JSON.stringify(allStarships));
    return allStarships;
  }

    export async function fetchAllSpeciesData(): Promise<Species[]> {
        let allSpecies: Species[] = [];
        let nextPage = 'https://swapi.dev/api/species/';
      
        while (nextPage) {
          const response = await fetch(nextPage);
          const data = await response.json();
          allSpecies = allSpecies.concat(data.results);
          nextPage = data.next;
        }
      
        localStorage.setItem('species', JSON.stringify(allSpecies));
        return allSpecies;
      }

export async function fetchAllVehicleData(): Promise<Vehicles[]> {
    let allVehicles: Vehicles[] = [];
    let nextPage = 'https://swapi.dev/api/vehicles/';
    
    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allVehicles = allVehicles.concat(data.results);
        nextPage = data.next;
    }
    
    localStorage.setItem('vehicles', JSON.stringify(allVehicles));
    return allVehicles;
    }

export async function fetchFilms(): Promise<Film[]> {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    return data.results;
    }

    

       