import express from 'express';

const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/games', async (req, res) => {
  let response = await fetch('https://www.freetogame.com/api/games');
  let json = await response.json();
  res.send(json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});