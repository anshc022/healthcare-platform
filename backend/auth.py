from flask import Blueprint, jsonify, request
from models import User, db
import bcrypt
import jwt
import os
from datetime import datetime, timedelta

# Create a Blueprint for authentication routes
auth_bp = Blueprint('auth', __name__)

# User registration route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password'].encode('utf-8')
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
    
    date_of_birth_str = data.get('dateOfBirth')
    date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date() if date_of_birth_str else None

    new_user = User(
        username=username,
        password=hashed_password,
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        date_of_birth=date_of_birth
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(message='User created successfully'), 201


# User login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password'].encode('utf-8')

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.checkpw(password, user.password):
        return jsonify(message='Invalid credentials'), 401

    jwt_secret = os.getenv("JWT_SECRET")
    if not jwt_secret:
        return jsonify(message='JWT secret is not set'), 500

    token = jwt.encode({
        'id': user.id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, jwt_secret, algorithm='HS256')

    return jsonify(token=token, user={
        'id': user.id,
        'username': user.username,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'email': user.email
    })
