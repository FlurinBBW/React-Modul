import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";

const tripsData = [
  {
    id: 1,
    title: "San Francisco",
    description: "San Francisco World Trade Center on new Server/IOT/Client",
    startTrip: [2021, 2, 13, 0, 0],
    endTrip: [2021, 2, 15, 16, 56]
  },
  {
    id: 2,
    title: "Santa Clara",
    description: "Santa Clara Halley on new Server/IOT/Client",
    startTrip: [2021, 6, 23, 9, 0],
    endTrip: [2021, 6, 27, 16, 56]
  },
  {
    id: 3,
    title: "San Jose",
    description: "San Jose City Halley on Docker/IOT/Client",
    startTrip: [2021, 12, 13, 9, 0],
    endTrip: [2021, 12, 15, 16, 56]
  }
];

export default function App({ triplist, setTriplist }) {
  function handleAddToTriplist(trip) {
    if (!triplist.find(t => t.id === trip.id)) {
      setTriplist([...triplist, trip]);
    }
  }

  function renderTrip(t) {
    return (
      <div className="product" key={t.id}>
        <figure>
          <div>
            <img src={"images/items/" + t.id + ".jpg"} alt="name " />
          </div>
          <figcaption>
            <a href="#">{t.title}</a>
            <div>
              <span>
                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
              </span>
            </div>
            <p>{t.description}</p>
            <div>
              <button 
                type="button" 
                className="addToTripList"
                onClick={() => handleAddToTriplist(t)}
                disabled={triplist.find(trip => trip.id === t.id)}
              >
                Add to Triplist
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <>
      <div>
        <Header />
        <main>
          <section id="products">{tripsData.map(renderTrip)}</section>
          <Link to="/meetings" className="meetings-button">
            Manage Meetings
          </Link>
          <Link to="/flights" className="flights-button">
            Manage Flights
          </Link>
          <Link to="/triplist" className="view-triplist-button">
            View Triplist
          </Link>
        </main>
      </div>
      <Footer />
    </>
  );
}
