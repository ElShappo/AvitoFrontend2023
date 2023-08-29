import { defer } from "react-router-dom";

function gamePageLoader({params} : any) {
    const { id } = params;

    let cookies = document.cookie.split("; ");
    let cookieKeys = cookies.map(item => item.split('=')[0]);
    let cookieValues = cookies.map(item => item.split('=')[1]);

    let idIndex = cookieKeys.indexOf('id');

    if (idIndex !== -1 && cookieValues[idIndex] === id) {
      const platform = decodeURIComponent(cookieValues[cookieKeys.indexOf('platform')]);
      const title = decodeURIComponent(cookieValues[cookieKeys.indexOf('title')]);
      const thumbnail = decodeURIComponent(cookieValues[cookieKeys.indexOf('thumbnail')]);
      const minimum_system_requirements = JSON.parse(decodeURIComponent(cookieValues[cookieKeys.indexOf('minimum_system_requirements')]));
      const genre = decodeURIComponent(cookieValues[cookieKeys.indexOf('genre')]);
      const release_date = decodeURIComponent(cookieValues[cookieKeys.indexOf('release_date')]);
      const publisher = decodeURIComponent(cookieValues[cookieKeys.indexOf('publisher')]);
      const developer = decodeURIComponent(cookieValues[cookieKeys.indexOf('developer')]);
      const screenshots = JSON.parse(decodeURIComponent(cookieValues[cookieKeys.indexOf('screenshots')]));

      console.warn('Checking if values have been cached: ');

      console.warn(`Cached platform: ${platform}`);
      console.warn(`Cached title: ${title}`);
      console.warn(`Cached thumbnail: ${thumbnail}`);

      console.warn(`Cached minimum_system_requirements: ${minimum_system_requirements}`);
      console.warn(`Cached genre: ${genre}`);
      console.warn(`Cached release_date: ${release_date}`);

      console.warn(`Cached publisher: ${publisher}`);
      console.warn(`Cached developer: ${developer}`);
      console.warn(`Cached screenshots: ${screenshots}`);

      return defer({
        game: Promise.resolve({
          platform,
          title,
          thumbnail,
          minimum_system_requirements,
          genre,
          release_date,
          publisher,
          developer,
          screenshots
        })
      })
    }

    console.log(`gamePageLoader with id = ${id}`);
    let response = fetch(`http://localhost:3002/games/${id}`);
    return defer({
      game: response.then(res => res.json())
    })
}

export default gamePageLoader;