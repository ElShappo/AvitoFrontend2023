import express from 'express';
import jsdom from 'jsdom';

const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/games', async (req, res) => {
  let url;
  let {platform, genres, sort} = req.query;

  console.log('Platform: ' + platform);
  console.log('Genres: ' + genres);
  console.log('Sort: ' + sort);

  if (platform === 'any platform') {
    platform = 'all';
  }

  if (Array.isArray(genres)) {
    url = new URL('https://www.freetogame.com/api/filter');

    let genresString = genres.join('.');
    url.searchParams.set('tag', genresString);

    if (platform) {
      url.searchParams.set('platform', platform);
    }
    if (sort) {
      url.searchParams.set('sort-by', sort);
    }

  } else {
    url = new URL('https://www.freetogame.com/api/games');

    if (genres && genres !== 'any genre') {
      url.searchParams.set('category', genres);
    }
    if (platform) {
      url.searchParams.set('platform', platform);
    }
    if (sort) {
      url.searchParams.set('sort-by', sort);
    }
  }

  let response = await fetch(url);
  let json = await response.json();
  res.send(json);
});

// app.get('/genres', async (req, res) => {
//   let response = await fetch('https://www.freetogame.com/api-doc');
//   let text = await response.text();
//   const html = new jsdom.JSDOM(text);
//   let genres = html.window.document.querySelector(".modal-body").textContent;
//   genres = 'any genre,' + genres; 
//   res.send(genres.trim().split(', '));
// });

// app.get('/genre/:category', async (req, res) => {
//   const { category } = req.params; 
//   let response = await fetch(`https://www.freetogame.com/api/games?category=${category}`);
//   let json = await response.json();
//   res.send(json);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});