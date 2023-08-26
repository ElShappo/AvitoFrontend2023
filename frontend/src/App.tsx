import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider, defer, json
} from "react-router-dom";
import MainPage from './pages/MainPage';
import './App.css';

async function loader({request} : any) {
  const requestUrl = new URL(request.url);
  const platform = requestUrl.searchParams.get("platform");
  const genres = requestUrl.searchParams.get("genres");
  const sort = requestUrl.searchParams.get("sort");

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
  const response = await fetch(fetchUrl);
  const json = response.json();

  return defer({
    games: json,
    platform: await platform,
    genres: await genres,
    sort: await sort
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
