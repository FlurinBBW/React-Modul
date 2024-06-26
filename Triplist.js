import React from 'react';
import { Link } from 'react-router-dom';
import './Triplist.css';

const Triplist = ({ triplist, setTriplist }) => {
  const handleRemoveTrip = (id) => {
    const updatedTriplist = triplist.filter(trip => trip.id !== id);
    setTriplist(updatedTriplist);
  };

  return (
    <div className="triplist-container">
      <h1>Your Triplist</h1>
      <Link to="/" className="return-home-button">Return to Home</Link>
      <ul className="triplist-list">
        {triplist.map(trip => (
          <li key={trip.id} className="triplist-item">
            <h2>{trip.title}</h2>
            <p>{trip.description}</p>
            <p>Start Date: {trip.startTrip.join('-')}</p>
            <p>End Date: {trip.endTrip.join('-')}</p>
            <button onClick={() => handleRemoveTrip(trip.id)} className="remove-trip-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Triplist;
