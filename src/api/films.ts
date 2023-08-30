export  async function getFilms() : Promise<Film[]> {
    return await fetch('https://swapi.dev/api/films/').then(res => res.json()).then(data => data.results);
}