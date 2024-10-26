from flask import Blueprint, jsonify
from models import Hospital, db

hospital_bp = Blueprint('hospital', __name__)

# Hospital routes
@hospital_bp.route('/', methods=['GET'])
def get_hospitals():
    default_hospitals = [
        {"name": "City Hospital", "location": "New York", "contact": "123-456-7890"},
        {"name": "Green Valley Hospital", "location": "San Francisco", "contact": "098-765-4321"},
        {"name": "Riverfront General", "location": "Chicago", "contact": "555-123-4567"},
    ]

    for hospital in default_hospitals:
        if not Hospital.query.filter_by(name=hospital['name']).first():
            new_hospital = Hospital(**hospital)
            db.session.add(new_hospital)
    db.session.commit()

    hospitals = Hospital.query.all()
    return jsonify([{ 'name': h.name, 'location': h.location, 'contact': h.contact } for h in hospitals])
