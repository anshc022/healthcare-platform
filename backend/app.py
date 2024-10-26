from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from models import db  # Import db here for initialization
from routes import routes_bp
from auth import auth_bp
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# SQLite configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///healthcare.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db with app
db.init_app(app)

# Create the database
with app.app_context():
    db.create_all()

# Register routes
app.register_blueprint(auth_bp, url_prefix='/api/auth')  # All auth routes will be prefixed with /api/auth
app.register_blueprint(routes_bp, url_prefix='/api')  # All other routes will be prefixed with /api



@app.route('/')
def home():
    return "API is running..."

if __name__ == '__main__':
    app.run(port=int(os.getenv("PORT", 5000)))
