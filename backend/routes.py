from datetime import datetime, timedelta
from flask import Blueprint, json, jsonify, request
from models import Reminder, User, db, Hospital
import jwt
import os

# Create a Blueprint for general routes
routes_bp = Blueprint('routes', __name__)

# Medicine Reminders routes
@routes_bp.route('/reminders', methods=['POST'])
def add_reminder():
    data = request.get_json()
    if not data:
        return jsonify(message='No data provided'), 400

    medication = data.get('medication')
    reminder_time = data.get('reminder_time')
    start_date = data.get('start_date')
    end_date = data.get('end_date')

    if not all([medication, reminder_time, start_date, end_date]):
        return jsonify(message='Medication, reminder time, start date, and end date are required'), 400

    # Validate date formats
    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
        reminder_time = datetime.strptime(reminder_time, '%H:%M')
    except ValueError:
        return jsonify(message='Invalid date/time format. Use YYYY-MM-DD for dates and HH:MM for time.'), 400

    # Extract user_id from JWT token
    token = request.headers.get('Authorization')
    if not token:
        return jsonify(message='Token is required'), 401

    try:
        payload = jwt.decode(token.split()[1], os.getenv("JWT_SECRET"), algorithms=['HS256'])
        user_id = payload['id']

        # Prepare reminder dates
        reminder_dates = []
        current_date = start_date
        while current_date <= end_date:
            reminder_datetime = current_date.replace(hour=reminder_time.hour, minute=reminder_time.minute)
            reminder_dates.append(reminder_datetime.isoformat())
            current_date += timedelta(days=1)

        # Create a new reminder
        new_reminder = Reminder(
            medication=medication,
            user_id=user_id,
            reminder_time=reminder_time.strftime('%H:%M'),  # Correct parameter name
            start_date=start_date,
            end_date=end_date,
            reminder_dates=json.dumps(reminder_dates)  # Store reminder times as JSON string
        )
        db.session.add(new_reminder)
        db.session.commit()

        return jsonify(message='Reminders added successfully'), 201

    except jwt.ExpiredSignatureError:
        return jsonify(message='Token has expired'), 401
    except jwt.InvalidTokenError:
        return jsonify(message='Invalid token'), 401


# Retrieve reminders using JWT token
@routes_bp.route('/reminders/user', methods=['GET'])
def get_reminders_by_user():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify(message='Token is required'), 401

    try:
        # Decode the token to get the user ID
        payload = jwt.decode(token.split()[1], os.getenv("JWT_SECRET"), algorithms=['HS256'])
        user_id = payload['id']

        # Query reminders for the specific user
        reminders = Reminder.query.filter_by(user_id=user_id).all()

        # Format the reminders to return only the specified fields
        return jsonify([{
            'medication': r.medication,
            'reminder_time': r.reminder_time,
            'start_date': r.start_date.strftime('%Y-%m-%d'),  # Format the date as needed
            'end_date': r.end_date.strftime('%Y-%m-%d')  # Format the date as needed
        } for r in reminders])

    except jwt.ExpiredSignatureError:
        return jsonify(message='Token has expired'), 401
    except jwt.InvalidTokenError:
        return jsonify(message='Invalid token'), 401
    except Exception as e:
        return jsonify(message=str(e)), 500  # General error handling


# Hospital routes
# Hospital routes
@routes_bp.route('/hospitals', methods=['POST'])
def add_hospitals():
    data = request.get_json()
    if not data or not isinstance(data, list):
        return jsonify(message='No data provided or incorrect format, must be a list'), 400

    successful_additions = []
    failed_additions = []

    for hospital_data in data:
        name = hospital_data.get('name')
        location = hospital_data.get('location')
        contact = hospital_data.get('contact')

        # Check for required fields
        if not all([name, location, contact]):
            failed_additions.append({
                'hospital_data': hospital_data,
                'error': 'Name, location, and contact are required'
            })
            continue  # Skip to the next hospital

        # Create a new hospital instance
        new_hospital = Hospital(
            name=name,
            location=location,
            contact=contact,
            address=hospital_data.get('address'),
            city=hospital_data.get('city'),
            state=hospital_data.get('state'),
            email=hospital_data.get('email'),
            hospital_type=hospital_data.get('hospital_type')
        )

        try:
            db.session.add(new_hospital)
            successful_additions.append(new_hospital.name)
        except Exception as e:
            failed_additions.append({
                'hospital_data': hospital_data,
                'error': str(e)
            })

    db.session.commit()  # Commit all additions at once

    return jsonify(
        message='Hospitals added successfully',
        successful_additions=successful_additions,
        failed_additions=failed_additions
    ), 201

# Get hospitals by state and optionally by city
@routes_bp.route('/hospitals/search', methods=['GET'])
def get_hospitals_by_state_and_city():
    # Extract user token from Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify(message='Token is required'), 401

    try:
        # Decode the token to verify it
        payload = jwt.decode(token.split()[1], os.getenv("JWT_SECRET"), algorithms=['HS256'])
        user_id = payload['id']  # Extract user ID (optional, depending on your needs)

    except jwt.ExpiredSignatureError:
        return jsonify(message='Token has expired'), 401
    except jwt.InvalidTokenError:
        return jsonify(message='Invalid token'), 401

    state = request.args.get('state')
    city = request.args.get('city')

    # Ensure at least the state filter is provided
    if not state:
        return jsonify(message='State is required to filter'), 400

    # Query hospitals based on provided filters
    query = Hospital.query.filter(Hospital.state == state)

    if city:
        query = query.filter(Hospital.city == city)

    hospitals = query.all()

    # Format the response
    if not hospitals:
        return jsonify(message='No hospitals found for the given criteria'), 404

    return jsonify([
        {
            'name': h.name,
            'location': h.location,
            'contact': h.contact,
            'address': h.address,
            'city': h.city,
            'state': h.state,
            'email': h.email,
            'hospital_type': h.hospital_type
        } for h in hospitals
    ]), 200


# User profile route
@routes_bp.route('/profile', methods=['GET'])
def get_user_profile_from_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify(message='Token is required'), 401

    try:
        payload = jwt.decode(token.split()[1], os.getenv("JWT_SECRET"), algorithms=['HS256'])
        user_id = payload['id']
        
        user = User.query.get(user_id)
        if user is None:
            return jsonify(message='User not found'), 404
        
        return jsonify({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_of_birth': user.date_of_birth.isoformat() if user.date_of_birth else None,
            'email': user.email
        })

    except jwt.ExpiredSignatureError:
        return jsonify(message='Token has expired'), 401
    except jwt.InvalidTokenError:
        return jsonify(message='Invalid token'), 401
