// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL for the API

const apiClient = axios.create({
    baseURL: API_URL,
});

// Interceptors for handling requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Register User
// Register User
export const registerUser = async ({ username, password, firstName, lastName, email, dateOfBirth }) => {
    try {
        const response = await apiClient.post('/auth/register', { 
            username, 
            password, 
            firstName, 
            lastName, 
            email,
            dateOfBirth // Ensure dateOfBirth is sent in the correct format
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to register');
    }
};


// Login User
export const loginUser = async (username, password) => {
    try {
        console.log('Sending login request with:', { username, password });
        const response = await apiClient.post('/auth/login', { username, password });
        
        const { token, user } = response.data; // Assuming your API returns token and user data
        localStorage.setItem('token', token);
        
        console.log('Login successful:', { token, user });
        return { token, user }; // Return both token and user info
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
};

// Fetch Reminders
export const fetchReminders = async () => {
    try {
        const response = await apiClient.get('/reminders/user'); // Fetch reminders for the logged-in user
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch reminders.');
    }
};

// Add Reminder
// Add Reminder
export const addReminder = async ({ medication, reminder_time, start_date, end_date }) => {
    try {
        const response = await apiClient.post('/reminders', {
            medication, 
            reminder_time, // Send reminder time as a string
            start_date, // Send start date in YYYY-MM-DD format
            end_date // Send end date in YYYY-MM-DD format
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add reminder.');
    }
};
// Fetch User Profile
export const fetchUserProfile = async () => {
    try {
        const response = await apiClient.get('/profile'); // Endpoint for fetching user profile
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user profile.');
    }
};
// Fetch Hospitals by State
export const searchHospitalsByState = async (state) => {
    try {
        const response = await apiClient.get(`/hospitals/search?state=${state}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to search hospitals by state.');
    }
};

// Fetch Hospitals by State and City
export const searchHospitalsByLocation = async (state, city) => {
    try {
        const response = await apiClient.get(`/hospitals/search?state=${state}&city=${city}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to search hospitals by location.');
    }
};