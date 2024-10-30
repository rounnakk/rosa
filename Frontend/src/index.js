import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//Import Pages to be used for Routing.j
import App from './App';
import Team from './pages/TeamPage/TeamPage';
import EventPage from './pages/EventPage/EventPage';
import Sponsors from './pages/SponsorPage/SponsorsPage'
import Contact from './pages/ContactPage/ContactPage'
import GeekGames from './pages/GeekGamesPage/GeekGamesPage';
//Router and other imports
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/eventpage" element={<EventPage/>}></Route>
        <Route path="/sponsors" element={<Sponsors />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/geekgames" element={<GeekGames />}></Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/