import express from 'express';
import cors from 'cors';

const app = express();
const port = 3002;

app.use(cors());

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

app.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  let response = await fetch(`https://www.freetogame.com/api/game?id=${id}`);
  let json = await response.json();
  res.send(json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});