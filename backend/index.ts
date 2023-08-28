import express from 'express';
import cors from 'cors';
import {Platform, Genre, Sort, isPlatform, isGenre, isSort} from '../frontend/src/types'

const app = express();
const port = 3002;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/games', async (req, res) => {
  let url;
  let {platform, genre, sort} = req.query;

  console.log('Platform: ' + platform);
  console.log('Genre: ' + genre);
  console.log('Sort: ' + sort);

  url = new URL('https://www.freetogame.com/api/games');

  if (isPlatform(platform) ) {
    if (platform !== 'any platform') {
      url.searchParams.set('platform', platform);
    }
  } else {
    res.status(404);
    res.send('Invalid platform.');
  }
  if (isGenre(genre) ) {
    if (genre !== 'any genre') {
      url.searchParams.set('category', genre);
    }
  } else {
    res.status(404);
    res.send('Invalid genre.');
  }
  if (isSort(sort) ) {
    url.searchParams.set('sort-by', sort);
  } else {
    res.status(404);
    res.send('No such sort');
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