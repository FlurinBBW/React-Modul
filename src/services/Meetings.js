import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Meetings.css';

const API_URL = 'http://localhost:3001/meetings';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  const handleAddMeeting = async () => {
    if (isEditing) {
      await updateMeeting(currentMeetingId, newMeeting);
      setIsEditing(false);
      setCurrentMeetingId(null);
    } else {
      await createMeeting(newMeeting);
    }
    setNewMeeting({ title: '', date: '', description: '' });
    setShowModal(false);
  };

  const createMeeting = async (meeting) => {
    try {
      console.log('Creating meeting:', meeting);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meeting),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newMeeting = await response.json();
      console.log('Created meeting:', newMeeting);
      setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const updateMeeting = async (id, meeting) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meeting),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedMeeting = await response.json();
      console.log('Updated meeting:', updatedMeeting);
      setMeetings((prevMeetings) =>
        prevMeetings.map((m) => (m.id === id ? updatedMeeting : m))
      );
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  const handleEditMeeting = (id) => {
    const meetingToEdit = meetings.find((meeting) => meeting.id === id);
    setNewMeeting(meetingToEdit);
    setCurrentMeetingId(id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteMeeting = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== id));
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  return (
    <div className="meetings-container">
      <h1>Meetings Management</h1>
      <button
        className="add-meeting-button"
        onClick={() => {
          setNewMeeting({ title: '', date: '', description: '' });
          setIsEditing(false);
          setShowModal(true);
        }}
      >
        Add Meeting
      </button>
      <Link to="/" className="return-home-button">
        Return to Home
      </Link>
      <ul className="meetings-list">
        {meetings.map((meeting) => (
          <li key={meeting.id} className="meeting-item">
            <h2>{meeting.title}</h2>
            <p>{meeting.date}</p>
            <p>{meeting.description}</p>
            <button className="edit-meeting-button" onClick={() => handleEditMeeting(meeting.id)}>
              Edit
            </button>
            <button className="delete-meeting-button" onClick={() => handleDeleteMeeting(meeting.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? 'Edit Meeting' : 'Add New Meeting'}</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newMeeting.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={newMeeting.date}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newMeeting.description}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleAddMeeting}>{isEditing ? 'Save Changes' : 'Add Meeting'}</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
