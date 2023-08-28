import { defer } from "react-router-dom";
import { isPlatform, isGenre, isSort } from "../types";

function mainPageLoader({request} : any) {
    const requestUrl = new URL(request.url);
    let platform = requestUrl.searchParams.get("platform");
    let genre = requestUrl.searchParams.get("genre");
    let sort = requestUrl.searchParams.get("sort");

    console.log(platform, genre, sort);
  
    const fetchUrl = new URL('http://localhost:3002/games');
  
    if (isPlatform(platform)) {
      fetchUrl.searchParams.set('platform', platform);
    } else {
      platform = 'any platform';
    }
    if (isGenre(genre)) {
      fetchUrl.searchParams.set('genre', genre);
    } else {
      genre = 'any genre';
    }
    if (isSort(sort)) {
      fetchUrl.searchParams.set('sort', sort);
    } else {
      sort = 'relevance';
    }
    console.log(platform);
    console.log(genre);
    console.log(sort);
  
    const response = fetch(fetchUrl);
    console.log(response);
    console.log('hey!');
  
    return defer({
      games: response.then(res => res.json()),
      platform,
      genre,
      sort
    });
}

export default mainPageLoader;