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

  console.log(platform);
  console.log(genres);
  console.log(sort);

  if (platform === 'any platform') {
    platform = 'all';
  } 

  if (genres === 'any genre') {
    url = `https://www.freetogame.com/api/games?platform=${platform}&sort-by=${sort}`;
  } else if (typeof genres === 'string') {
    url = `https://www.freetogame.com/api/games?platform=${platform}&sort-by=${sort}&category=${genres}`;
  } else {
    // should be array
    let genresString = genres.join('.');
    url = `https://www.freetogame.com/api/filter?platform=${platform}&sort-by=${sort}&tag=${genresString}`;
  }

  let response = await fetch(url);
  let json = await response.json();
  res.send(json);
});

app.get('/genres', async (req, res) => {
  let response = await fetch('https://www.freetogame.com/api-doc');
  let text = await response.text();
  const html = new jsdom.JSDOM(text);
  let genres = html.window.document.querySelector(".modal-body").textContent;
  genres = 'any genre,' + genres; 
  res.send(genres.trim().split(', '));
});

// app.get('/genre/:category', async (req, res) => {
//   const { category } = req.params; 
//   let response = await fetch(`https://www.freetogame.com/api/games?category=${category}`);
//   let json = await response.json();
//   res.send(json);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});