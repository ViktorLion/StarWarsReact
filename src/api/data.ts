export async function fetchFilms(): Promise<Films[]> {
   let allFilms: Films[] = [];
    let nextPage = 'https://swapi.dev/api/films/';

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allFilms = allFilms.concat(data.results);
        nextPage = data.next;
    }

    localStorage.setItem('films', JSON.stringify(allFilms));
    return allFilms;
}
    
export async function fetchAllCharacterData(): Promise<Characters[]> {
    let allPeople: Characters[] = [];
    let nextPage = 'https://swapi.dev/api/people/';

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        allPeople = allPeople.concat(data.results);
        nextPage = data.next;
    }
    localStorage.setItem('characters', JSON.stringify(allPeople));
    return allPeople;
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



    

       