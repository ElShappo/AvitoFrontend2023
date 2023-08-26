import React from 'react';
import {
  createBrowserRouter,
  RouterProvider, defer
} from "react-router-dom";
import MainPage from './pages/MainPage';
import './App.css';

async function loader({request} : any) {
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: loader,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
