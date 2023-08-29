import express, {Request, Response} from 'express';
import cors from 'cors';
import {isPlatform, isGenre, isSort} from './types'

const app = express();
const port = 3002;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/games', async (req: Request, res: Response) => {
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
    if (platform !== undefined) {
      res.status(404).send('Invalid platform.');
      return;
    }
  }
  if (isGenre(genre) ) {
    if (genre !== 'any genre') {
      url.searchParams.set('category', genre);
    }
  } else {
    if (genre !== undefined) {
      res.status(404).send('Invalid genre.');
      return;
    }
  }
  if (isSort(sort) ) {
    url.searchParams.set('sort-by', sort);
  } else {
    if (sort !== undefined) {
      res.status(404).send('Invalid sort.');
      return;
    }
  }
  
  let response = await fetch(url);
  let json = await response.json();
  res.send(json);
});

app.get('/games/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  let response = await fetch(`https://www.freetogame.com/api/game?id=${id}`);
  if (!response.ok) {
    console.log('No such id');
    res.status(404).json('Invalid id.');
    return;
  }
  let json = await response.json();
  res.send(json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});