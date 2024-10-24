// backend/models/MedicineReminder.js
const mongoose = require('mongoose');

const MedicineReminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    medicineName: { type: String, required: true },
    reminderTime: { type: Date, required: true },
    notes: { type: String },
});

module.exports = mongoose.model('MedicineReminder', MedicineReminderSchema);
