import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { fetchUserProfile, fetchReminders, addReminder, searchHospitalsByState, searchHospitalsByLocation } from '../services/api';
import Modal from './Modal.js';
import { FiLogOut } from 'react-icons/fi';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 
    'Lakshadweep', 'Puducherry'
];

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
                            <select
                                value={searchState}
                                onChange={(e) => setSearchState(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-1/2"
                            >
                                <option value="">Select State</option>
                                {INDIAN_STATES.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
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
                                disabled={!searchState}
                            >
                                Search
                            </button>
                        </div>

                        <div className="hospitals-list mt-4">
                            {hospitals.length > 0 ? (
                                <>
                                    <h3 className="text-xl font-semibold mb-2">Found Hospitals:</h3>
                                    <div className="hospitals-grid">
                                        {hospitals.map((hospital) => (
                                            <div key={hospital.id} className="hospital-card">
                                                <div className="hospital-header">
                                                    <h4>{hospital.name}</h4>
                                                    <span className="hospital-type">{hospital.hospital_type}</span>
                                                </div>
                                                <div className="hospital-info">
                                                    <div className="info-row">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                        <p>{hospital.address}, {hospital.city}, {hospital.state}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <i className="fas fa-phone"></i>
                                                        <p>{hospital.contact_number}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <i className="fas fa-envelope"></i>
                                                        <p>{hospital.email}</p>
                                                    </div>
                                                </div>
                                                <div className="hospital-actions">
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.location)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="action-button maps-button"
                                                    >
                                                        <i className="fas fa-map-marked-alt"></i>
                                                        View on Maps
                                                    </a>
                                                    {hospital.website && (
                                                        <a
                                                            href={hospital.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="action-button website-button"
                                                        >
                                                            <i className="fas fa-globe"></i>
                                                            Visit Website
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : searchState && (
                                <div className="no-hospitals-message">
                                    <i className="fas fa-hospital-alt"></i>
                                    <h3>No Hospitals Found</h3>
                                    <p>We couldn't find any hospitals in {searchCity ? `${searchCity}, ` : ''}{searchState}</p>
                                    <p>Try searching in a different location or contact our support for assistance.</p>
                                </div>
                            )}
                        </div>
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