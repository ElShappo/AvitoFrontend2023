import express from 'express';
import jsdom from 'jsdom';

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

app.get('/genres', async (req, res) => {
  let response = await fetch('https://www.freetogame.com/api-doc');
  let text = await response.text();
  const html = new jsdom.JSDOM(text);
  let genres = html.window.document.querySelector(".modal-body").textContent;
  res.send(genres.trim().split(', '));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});