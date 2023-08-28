import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import mainPageLoader from './loaders/MainPageLoader';
import gamePageLoader from './loaders/GamePageLoader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: mainPageLoader,
  },
  {
    path: "/game/:id",
    element: <GamePage />,
    loader: gamePageLoader,
  },

]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
