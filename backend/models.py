from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.mutable import MutableList
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=True)

class Reminder(db.Model):
    __tablename__ = 'reminders'

    id = db.Column(db.Integer, primary_key=True)
    medication = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reminder_time = db.Column(db.String, nullable=False)  # Storing reminder time as a string (HH:MM)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    reminder_dates = db.Column(db.JSON, nullable=False)  # JSON type for storing dates

    def __init__(self, medication, user_id, reminder_time, start_date, end_date, reminder_dates):
        self.medication = medication
        self.user_id = user_id
        self.reminder_time = reminder_time
        self.start_date = start_date
        self.end_date = end_date
        self.reminder_dates = reminder_dates

class Hospital(db.Model):
    __tablename__ = 'hospitals'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)  # Ensure location is not nullable
    contact = db.Column(db.String(20), nullable=False)    # Ensure contact is not nullable
    address = db.Column(db.String(255), nullable=True)    # New field for hospital address
    city = db.Column(db.String(100), nullable=True)       # New field for city
    state = db.Column(db.String(100), nullable=True)      # New field for state
    email = db.Column(db.String(100), nullable=True)      # New field for email
    hospital_type = db.Column(db.String(50), nullable=True)  # New field for hospital type

    def __init__(self, name, location, contact, address=None, city=None, state=None, email=None, hospital_type=None):
        self.name = name
        self.location = location
        self.contact = contact
        self.address = address
        self.city = city
        self.state = state
        self.email = email
        self.hospital_type = hospital_type
