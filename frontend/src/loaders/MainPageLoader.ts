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
      console.warn('Invalid or empty platform specified: substituting it with \'any platform\'');
      platform = 'any platform';
    }
    if (isGenre(genre)) {
      fetchUrl.searchParams.set('genre', genre);
    } else {
      console.warn('Invalid or empty genre specified: substituting it with \'any genre\'');
      genre = 'any genre';
    }
    if (isSort(sort)) {
      fetchUrl.searchParams.set('sort', sort);
    } else {
      console.warn('Invalid or empty sort specified: substituting it with \'relevance\'');
      sort = 'relevance';
    }
    if (!page || !Number.isInteger(Number(page)) || Number(page) <= 0) {
      console.warn('Invalid or empty page No specified: substituting it with \'1');
      page = '1';
    }
    if (!isPageSize(pageSize)) {
      console.warn('Invalid or empty pageSize specified: substituting it with \'20');
      pageSize = '20';
    }
    console.log(platform);
    console.log(genre);
    console.log(sort);
    console.log(page);
    console.log(pageSize);
  
    const response = fetch(fetchUrl);

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