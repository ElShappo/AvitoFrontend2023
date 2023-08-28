import { defer } from "react-router-dom";
import { Platform, Genre, Sort } from "../types";

function mainPageLoader({request} : any) {
    const requestUrl = new URL(request.url);
    const platform = requestUrl.searchParams.get("platform");
    const genre = requestUrl.searchParams.get("genre");
    const sort = requestUrl.searchParams.get("sort");
  
    const fetchUrl = new URL('http://localhost:3002/games');
  
    if (platform) {
      fetchUrl.searchParams.set('platform', platform);
    }
    if (genre) {
      fetchUrl.searchParams.set('genre', genre);
    }
    if (sort) {
      fetchUrl.searchParams.set('sort', sort);
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