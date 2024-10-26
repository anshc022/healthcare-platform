import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Format dateOfBirth to "YYYY-MM-DD" if needed
            const formattedDateOfBirth = new Date(dateOfBirth).toISOString().split('T')[0];
            await registerUser({
                username,
                password,
                firstName,
                lastName,
                email,
                dateOfBirth: formattedDateOfBirth,
            });
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                        className="register-input"
                    />
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
