// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const { token, user } = await loginUser(username, password);

            // Store the JWT token in local storage
            localStorage.setItem('token', token);

            // Navigate to the dashboard and pass the user data
            navigate('/dashboard', { state: { profile: user } });
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            required
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="toggle-password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="login-footer">
                    Don't have an account?{' '}
                    <a href="/register" className="login-link">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
