import React from 'react';
import './ProfileModal.css'; // Create a CSS file for styling

const ProfileModal = ({ userProfile, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>User Profile</h2>
                <p><strong>Username:</strong> {userProfile.username}</p>
                <p><strong>First Name:</strong> {userProfile.firstName}</p>
                <p><strong>Last Name:</strong> {userProfile.lastName}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Date of Birth:</strong> {new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                <button onClick={onClose} className="modal-close-button">Close</button>
            </div>
        </div>
    );
};

export default ProfileModal;
