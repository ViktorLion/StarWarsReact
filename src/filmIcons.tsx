import React from 'react';
export const renderMoviePoster = (title: string) => {
    let url = ''
    switch(title) {
      case 'A New Hope':
        url = 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
        break;
      case 'The Empire Strikes Back': 
        url = 'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg'
        break;
      case 'Return of the Jedi':
        url = 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
        break;

      case 'The Phantom Menace':
          url = 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
          break;
          
      case 'Attack of the Clones':
            url = 'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg'
            break;
      case 'Revenge of the Sith':
              url = 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
              break;
    }

    return <img height={200} src={url} alt={title}/>
  }