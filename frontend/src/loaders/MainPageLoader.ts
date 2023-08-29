import { defer } from "react-router-dom";
import { isPlatform, isGenre, isSort, isPageSize } from "../types";

function mainPageLoader({request} : any) {
    const requestUrl = new URL(request.url);
    let platform = requestUrl.searchParams.get("platform");
    let genre = requestUrl.searchParams.get("genre");
    let sort = requestUrl.searchParams.get("sort");
    let page = requestUrl.searchParams.get("page");
    let pageSize = requestUrl.searchParams.get("pageSize");

    console.log(platform, genre, sort, page, pageSize);
  
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
    if (!page || !Number.isInteger(Number(page)) || Number(page) <= 0) {
      console.error('Smth wrong with page');
      page = '1';
    }
    if (!isPageSize(pageSize)) {
      pageSize = '20';
    }
    console.log(platform);
    console.log(genre);
    console.log(sort);
  
    const response = fetch(fetchUrl);
    console.log(response);
    console.log('hey!');

    console.error(page, pageSize);
  
    return defer({
      games: response.then(res => res.json()),
      platform,
      genre,
      sort,
      page,
      pageSize
    });
}

export default mainPageLoader;