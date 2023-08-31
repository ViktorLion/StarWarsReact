export async function fetchCharacterData(characterUrls: string[]): Promise<People[]> {
    const promises = characterUrls.map(url =>
      fetch(url)
        .then(res => res.json())
    );
  
    return Promise.all(promises);
  }

export async function fetchPlanetData(planetsUrls: string[]): Promise<Planet[]> {
const promises = planetsUrls.map(url =>
    fetch(url)
    .then(res => res.json())
    );

    return Promise.all(promises);
    }

export async function fetchStarshipsData(starshipsUrls: string[]): Promise<Starships[]> {
    const promises = starshipsUrls.map(url =>
        fetch(url)
        .then(res => res.json())
    );
    
    return Promise.all(promises);
    }

export async function fetchSpeciesData(SpeciesUrls: string[]): Promise<Species[]> {
    const promises = SpeciesUrls.map(url =>
        fetch(url)
        .then(res => res.json())
    );  
    return Promise.all(promises);
    }
export async function fetchVehicleData(VehicleUrls: string[]): Promise<Vehicles[]> {
    const promises = VehicleUrls.map(url =>
        fetch(url)
        .then(res => res.json())
    );  
    return Promise.all(promises);
    }
