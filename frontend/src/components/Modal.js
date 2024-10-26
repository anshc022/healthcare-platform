import React from 'react';
import './Modal.css'; // Ensure you have this CSS file for styling
import { FaTimes } from 'react-icons/fa'; // Import the close icon

const Modal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    medication, 
    setMedication, 
    reminderTime, 
    setReminderTime, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate 
}) => {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Medication Reminder</h2>
                    <FaTimes className="close" onClick={onClose} />
                </div>
                <div className="form-group">
                    <label htmlFor="medication">Medication Name:</label>
                    <input 
                        type="text" 
                        id="medication" 
                        value={medication} 
                        onChange={(e) => setMedication(e.target.value)} 
                        placeholder="Enter medication name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reminderTime">Reminder Time:</label>
                    <input 
                        type="time" 
                        id="reminderTime" 
                        value={reminderTime} 
                        onChange={(e) => setReminderTime(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input 
                        type="date" 
                        id="startDate" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input 
                        type="date" 
                        id="endDate" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={onSubmit} className="btn btn-primary">Add Reminder</button>
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;