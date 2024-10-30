import React, { useEffect} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import ChatBox from './Pages/Chat/Chatbox';
// import LandingPage from './Components/LandingPage';
// import LogoAnimation from './Components/LogoAnimation';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import NewLandingPage from './Pages/Landing/NewLandingPage';
// import LogoAnimation from './Components/LogoAnimation';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<> <Header /><NewLandingPage /> </>
    },
    {
      path: "/chat",
      element: <ChatBox />
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
