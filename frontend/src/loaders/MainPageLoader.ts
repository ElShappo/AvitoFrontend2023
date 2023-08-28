import { defer } from "react-router-dom";

function mainPageLoader({request} : any) {
    const requestUrl = new URL(request.url);
    const platform = requestUrl.searchParams.get("platform") || '';
    const genres = requestUrl.searchParams.get("genres") || '';
    const sort = requestUrl.searchParams.get("sort") || '';
  
    const fetchUrl = new URL('http://localhost:3002/games');
  
    if (platform) {
      fetchUrl.searchParams.set('platform', platform);
    }
    if (genres) {
      fetchUrl.searchParams.set('genres', genres);
    }
    if (sort) {
      fetchUrl.searchParams.set('sort', sort);
    }
    console.log(platform);
    console.log(genres);
    console.log(sort);
  
    const response = fetch(fetchUrl);
    console.log(response);
    console.log('hey!');
  
    return defer({
      games: response.then(res => res.json()),
      platform,
      genres,
      sort
    });
}

export default mainPageLoader;