import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { fetchUserProfile, fetchReminders, addReminder, searchHospitalsByState, searchHospitalsByLocation } from '../services/api';
import Modal from './Modal.js';
import { FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeReminderId, setActiveReminderId] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [searchState, setSearchState] = useState('');
    const [searchCity, setSearchCity] = useState('');

    const fetchUserProfileData = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const data = await fetchUserProfile(token);
            setUserProfile(data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    }, []);

    const fetchRemindersData = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const data = await fetchReminders(token);
            setReminders(data);
        } catch (error) {
            console.error('Failed to fetch reminders:', error);
        }
    }, []);

    const handleSearchHospitals = async () => {
        try {
            let data;
            if (searchCity) {
                data = await searchHospitalsByLocation(searchState, searchCity);
            } else {
                data = await searchHospitalsByState(searchState);
            }
            setHospitals(data);
        } catch (error) {
            console.error('Failed to search hospitals:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3485);

            if (location.state && location.state.profile) {
                setUserProfile(location.state.profile);
            } else {
                fetchUserProfileData();
            }

            fetchRemindersData();

            return () => clearTimeout(timer);
        }
    }, [location.state, navigate, fetchUserProfileData, fetchRemindersData]);

    const handleAddReminder = async () => {
        if (newReminder.trim() && reminderTime && startDate && endDate && userProfile) {
            try {
                const reminderData = {
                    medication: newReminder,
                    reminder_time: reminderTime,
                    start_date: startDate,
                    end_date: endDate,
                };
                await addReminder(reminderData);
                setReminders((prev) => [...prev, reminderData]);
                setNewReminder('');
                setReminderTime('');
                setStartDate('');
                setEndDate('');
                setIsModalOpen(false);
            } catch (error) {
                console.error('Failed to add reminder:', error);
            }
        } else {
            alert('Please enter all fields.');
        }
    };

    const toggleReminderDetails = (id) => {
        setActiveReminderId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="dashboard-container shared-background">
            {loading ? (
                <div className="loader">
                    {/* Loader implementation */}
                    <div className="box box0"><div></div></div>
                    <div className="box box1"><div></div></div>
                    <div className="box box2"><div></div></div>
                    <div className="box box3"><div></div></div>
                    <div className="box box4"><div></div></div>
                    <div className="box box5"><div></div></div>
                    <div className="box box6"><div></div></div>
                    <div className="box box7"><div></div></div>
                    <div className="ground"><div></div></div>
                </div>
            ) : (
                <div className="dashboard-content">
                    <div className="card-container">
                        <div className="dashboard-header">
                            <h1 className="dashboard-title">Dashboard</h1>
                            <div 
                                className="logout-icon" 
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/login');
                                }}
                            >
                                <FiLogOut size={24} />
                            </div>
                        </div>
                        {userProfile && (
                            <div className="profile-card">
                                <h2>User Profile</h2>
                                <p><strong>Name:</strong> {userProfile.name || "User"}</p>
                                <p><strong>Username:</strong> {userProfile.username}</p>
                                <p><strong>Email:</strong> {userProfile.email}</p>
                                <p><strong>Date of Birth:</strong> {new Date(userProfile.date_of_birth).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>

                    <div className="card-container">
                        <div className="add-reminder-icon" onClick={() => setIsModalOpen(true)}>
                            <span>➕ Add Reminder</span>
                        </div>
                        <div className="reminders-section">
                            <h2>Medication Reminders</h2>
                            <ul className="reminders-list">
                                {reminders.length > 0 ? (
                                    reminders.map((reminder) => (
                                        <li 
                                            key={reminder.id} 
                                            className={`reminder-card ${activeReminderId === reminder.id ? 'active' : ''}`} 
                                            onClick={() => toggleReminderDetails(reminder.id)}
                                        >
                                            <p><strong>Medication:</strong> {reminder.medication}</p>
                                            {activeReminderId === reminder.id && (
                                                <div className="reminder-details">
                                                    <p><strong>Time:</strong> {new Date(reminder.reminder_time).toLocaleString()}</p>
                                                    <p><strong>Start Date:</strong> {new Date(reminder.start_date).toLocaleDateString()}</p>
                                                    <p><strong>End Date:</strong> {new Date(reminder.end_date).toLocaleDateString()}</p>
                                                </div>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <p>No reminders found.</p>
                                )}
                            </ul>    
                        </div>
                    </div>

                    {/* Hospital Search Section */}
                    <div className="card-container">
                        <h2>Search Hospitals</h2>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="State"
                                value={searchState}
                                onChange={(e) => setSearchState(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-1/2"
                            />
                            <input
                                type="text"
                                placeholder="City (optional)"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-1/2"
                            />
                            <button
                                onClick={handleSearchHospitals}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Search
                            </button>
                        </div>

                        {hospitals.length > 0 && (
                            <div className="hospitals-list mt-4">
                                <h3 className="text-xl font-semibold mb-2">Found Hospitals:</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {hospitals.map((hospital) => (
                                        <div key={hospital.id} className="border p-4 rounded-md shadow-md">
                                            <h4 className="text-lg font-semibold">{hospital.name}</h4>
                                            <p className="text-gray-600"><strong>Address:</strong> {hospital.address}, {hospital.city}, {hospital.state}</p>
                                            <p className="text-gray-600"><strong>Contact:</strong> {hospital.contact_number}</p>
                                            <p className="text-gray-600"><strong>Email:</strong> {hospital.email}</p>
                                            <p className="text-gray-600"><strong>Type:</strong> {hospital.hospital_type}</p>
                                            <p className="text-gray-600"><strong>Location:</strong> {hospital.location}</p>
                                            <div className="mt-2">
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.location}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline mr-2"
                                                >
                                                    📍 View on Google Maps
                                                </a>
                                                {hospital.website && (
                                                    <a
                                                        href={hospital.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        🌐 Visit Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modal for adding reminders */}
                    {isModalOpen && (
                        <Modal onClose={() => setIsModalOpen(false)}>
                            <h2>Add Reminder</h2>
                            <input
                                type="text"
                                placeholder="Medication"
                                value={newReminder}
                                onChange={(e) => setNewReminder(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full mb-2"
                            />
                            <input
                                type="time"
                                value={reminderTime}
                                onChange={(e) => setReminderTime(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full mb-2"
                            />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full mb-2"
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full mb-2"
                            />
                            <button
                                onClick={handleAddReminder}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Add Reminder
                            </button>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;