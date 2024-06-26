import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Flights.css';

const API_URL = 'http://localhost:3001/flights';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFlightId, setCurrentFlightId] = useState(null);
  const [newFlight, setNewFlight] = useState({
    date: '',
    startLocation: '',
    endLocation: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight({ ...newFlight, [name]: value });
  };

  const handleAddFlight = async () => {
    if (isEditing) {
      await updateFlight(currentFlightId, newFlight);
      setIsEditing(false);
      setCurrentFlightId(null);
    } else {
      await createFlight(newFlight);
    }
    setNewFlight({ date: '', startLocation: '', endLocation: '' });
    setShowModal(false);
    fetchFlights(); // Refresh flights list
  };

  const createFlight = async (flight) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flight),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newFlight = await response.json();
      setFlights((prevFlights) => [...prevFlights, newFlight]);
    } catch (error) {
      console.error('Error creating flight:', error);
    }
  };

  const updateFlight = async (id, flight) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flight),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedFlight = await response.json();
      setFlights((prevFlights) =>
        prevFlights.map((f) => (f.id === id ? updatedFlight : f))
      );
    } catch (error) {
      console.error('Error updating flight:', error);
    }
  };

  const handleEditFlight = (id) => {
    const flightToEdit = flights.find((flight) => flight.id === id);
    setNewFlight(flightToEdit);
    setCurrentFlightId(id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteFlight = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setFlights((prevFlights) => prevFlights.filter((flight) => flight.id !== id));
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <div className="flights-container">
      <h1>Flights Management</h1>
      <button
        className="add-button"
        onClick={() => {
          setNewFlight({ date: '', startLocation: '', endLocation: '' });
          setIsEditing(false);
          setShowModal(true);
        }}
      >
        Add Flight
      </button>
      <Link to="/" className="return-home-button">
        Return to Home
      </Link>
      <ul className="flights-list">
        {flights.map((flight) => (
          <li key={flight.id} className="flight-item">
            <h2>Flight on {flight.date}</h2>
            <p>From: {flight.startLocation}</p>
            <p>To: {flight.endLocation}</p>
            <button className="edit-button" onClick={() => handleEditFlight(flight.id)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDeleteFlight(flight.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Flight' : 'Add New Flight'}</h2>
            <label>
              Date:
              <input
                type="datetime-local"
                name="date"
                value={newFlight.date}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Start Location:
              <input
                type="text"
                name="startLocation"
                value={newFlight.startLocation}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Location:
              <input
                type="text"
                name="endLocation"
                value={newFlight.endLocation}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleAddFlight}>{isEditing ? 'Save Changes' : 'Add Flight'}</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
