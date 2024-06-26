import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Meetings from './services/Meetings';
import Flights from './services/Flights';
import Triplist from './services/Triplist';

const Root = () => {
  const [triplist, setTriplist] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App triplist={triplist} setTriplist={setTriplist} />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/triplist" element={<Triplist triplist={triplist} setTriplist={setTriplist} />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
