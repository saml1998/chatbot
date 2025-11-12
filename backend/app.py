"""
Full-Stack Chatbot Application - Backend API
============================================
This is the Flask backend server that handles:
1. User authentication (login)
2. JWT token generation and verification
3. Chatbot message processing

Technologies used:
- Flask: Python web framework for building APIs
- Flask-CORS: Allows frontend (React) to communicate with backend
- PyJWT: Creates and verifies JSON Web Tokens for secure authentication
"""

# Import required libraries
from flask import Flask, request, jsonify  # Flask framework and utilities
from flask_cors import CORS  # Enable Cross-Origin Resource Sharing (allows React to call our API)
from datetime import datetime, timedelta  # Work with dates and times
import jwt  # JSON Web Token for secure authentication
import os  # Access environment variables
from functools import wraps  # Helper for creating decorators

# Initialize Flask application
app = Flask(__name__)

# Enable CORS - This allows our React frontend (running on port 3000) 
# to make requests to this backend (running on port 5001)
CORS(app)

# ============================================
# CONFIGURATION
# ============================================

# SECRET_KEY is used to sign JWT tokens. Keep this secret in production!
# It tries to get the key from environment variable first, otherwise uses default
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

# ============================================
# USER DATABASE (In-Memory)
# ============================================
# NOTE: This is a simple dictionary for demo purposes.
# In a real application, use a proper database like PostgreSQL, MongoDB, etc.
# and NEVER store passwords in plain text - use hashing (bcrypt, argon2, etc.)

users = {
    'admin': {
        'password': 'admin123',  # ⚠️ WARNING: Never store plain text passwords in production!
        'name': 'Admin User'
    },
    'user': {
        'password': 'user123',
        'name': 'Test User'
    }
}

# ============================================
# AUTHENTICATION DECORATOR
# ============================================
# This is a "decorator" - a function that wraps other functions
# It checks if the user has a valid JWT token before allowing access to protected routes

def token_required(f):
    """
    Decorator function to protect routes that require authentication.
    
    How it works:
    1. Extracts the JWT token from the request header
    2. Verifies the token is valid and not expired
    3. If valid, allows the request to proceed
    4. If invalid, returns an error
    
    Usage: Add @token_required above any route that needs authentication
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        # Get the Authorization header from the request
        # Format expected: "Bearer <token>"
        token = request.headers.get('Authorization')
        
        # Check if token was provided
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Remove "Bearer " prefix if present
            if token.startswith('Bearer '):
                token = token[7:]  # Skip first 7 characters ("Bearer ")
            
            # Decode and verify the token
            # This checks if the token is valid and not expired
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            
            # Extract username from the token
            current_user = data['username']
        except:
            # Token is invalid, expired, or tampered with
            return jsonify({'message': 'Token is invalid!'}), 401
        
        # Token is valid! Pass the username to the protected function
        return f(current_user, *args, **kwargs)
    
    return decorated

# ============================================
# API ENDPOINTS
# ============================================

# LOGIN ENDPOINT
# Route: POST /api/login
# Purpose: Authenticate users and provide JWT tokens
@app.route('/api/login', methods=['POST'])
def login():
    """
    Handles user login requests.
    
    Expected Request Body (JSON):
    {
        "username": "admin",
        "password": "admin123"
    }
    
    Success Response (200):
    {
        "message": "Login successful",
        "token": "<jwt-token>",
        "user": {
            "username": "admin",
            "name": "Admin User"
        }
    }
    
    Error Responses:
    - 400: Missing username or password
    - 401: Invalid credentials
    """
    # Get JSON data from request body
    data = request.get_json()
    
    # Validate that username and password are provided
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password'}), 400
    
    # Extract credentials
    username = data['username']
    password = data['password']
    
    # Check if username exists AND password matches
    if username in users and users[username]['password'] == password:
        # ✅ Login successful! Generate a JWT token
        
        # Create token payload (data stored in the token)
        token_payload = {
            'username': username,
            'name': users[username]['name'],
            'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
        }
        
        # Generate the JWT token
        token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')
        
        # Return success response with token and user info
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'username': username,
                'name': users[username]['name']
            }
        }), 200
    
    # ❌ Login failed - invalid credentials
    return jsonify({'message': 'Invalid username or password'}), 401

# CHATBOT ENDPOINT
# Route: POST /api/chat
# Purpose: Process user messages and return bot responses
# Protected: Requires valid JWT token (user must be logged in)
@app.route('/api/chat', methods=['POST'])
@token_required  # This decorator ensures user is authenticated
def chat(current_user):
    """
    Handles chatbot conversation.
    
    Expected Request Body (JSON):
    {
        "message": "Hello, how are you?"
    }
    
    Success Response (200):
    {
        "response": "Hello! I'm doing great!",
        "timestamp": "2025-11-12T10:30:00.123456"
    }
    
    How it works:
    1. Receives user's message
    2. Converts to lowercase for easier keyword matching
    3. Checks for keywords and generates appropriate response
    4. Returns response with timestamp
    
    Note: This is a RULE-BASED chatbot (keyword matching).
    To make it AI-powered, integrate with OpenAI, Gemini, or similar APIs.
    """
    # Get JSON data from request
    data = request.get_json()
    
    # Validate that a message was provided
    if not data or not data.get('message'):
        return jsonify({'message': 'No message provided'}), 400
    
    # Convert message to lowercase for easier comparison
    user_message = data['message'].lower()
    
    # ============================================
    # CHATBOT LOGIC - Keyword Matching
    # ============================================
    # This is a simple rule-based system. Each 'if' checks for keywords
    # and returns a pre-programmed response.
    
    # Greeting responses
    if 'hello' in user_message or 'hi' in user_message:
        bot_response = f"Hello {current_user}! How can I help you today?"
    
    # Wellbeing check
    elif 'how are you' in user_message:
        bot_response = "I'm doing great! Thanks for asking. How can I assist you?"
    
    # Farewell responses
    elif 'bye' in user_message or 'goodbye' in user_message:
        bot_response = "Goodbye! Have a great day!"
    
    # Help request
    elif 'help' in user_message:
        bot_response = "I'm here to help! You can ask me questions or just chat with me."
    
    # Weather query (not implemented - placeholder)
    elif 'weather' in user_message:
        bot_response = "I'm sorry, I don't have access to weather data yet, but it's probably nice wherever you are!"
    
    # Time query
    elif 'time' in user_message:
        current_time = datetime.now().strftime('%I:%M %p')  # Format: 10:30 AM
        bot_response = f"The current time is {current_time}"
    
    # Date query
    elif 'date' in user_message:
        current_date = datetime.now().strftime('%B %d, %Y')  # Format: November 12, 2025
        bot_response = f"Today's date is {current_date}"
    
    # Bot identity
    elif 'name' in user_message:
        bot_response = "I'm ChatBot, your friendly AI assistant!"
    
    # Default response for unrecognized messages
    else:
        bot_response = "That's interesting! Tell me more, or ask me something else."
    
    # Return the bot's response with a timestamp
    return jsonify({
        'response': bot_response,
        'timestamp': datetime.now().isoformat()  # ISO format timestamp
    }), 200

# TOKEN VERIFICATION ENDPOINT
# Route: GET /api/verify
# Purpose: Check if a JWT token is still valid
# Protected: Requires valid JWT token
@app.route('/api/verify', methods=['GET'])
@token_required
def verify_token(current_user):
    """
    Verifies if the provided JWT token is valid.
    Useful for checking if a user's session is still active.
    
    Success Response (200):
    {
        "message": "Token is valid",
        "user": "admin"
    }
    """
    return jsonify({
        'message': 'Token is valid',
        'user': current_user
    }), 200

# HEALTH CHECK ENDPOINT
# Route: GET /api/health
# Purpose: Quick check to see if the server is running
# Public: No authentication required
@app.route('/api/health', methods=['GET'])
def health():
    """
    Simple health check endpoint.
    Returns 200 OK if the server is running properly.
    
    Success Response (200):
    {
        "status": "healthy"
    }
    """
    return jsonify({'status': 'healthy'}), 200

# ============================================
# START THE SERVER
# ============================================
if __name__ == '__main__':
    """
    This runs the Flask development server.
    
    Parameters:
    - debug=True: Enables debug mode (auto-reload on code changes, detailed errors)
    - port=5001: Server listens on port 5001 (accessible at http://localhost:5001)
    
    ⚠️ WARNING: NEVER use debug=True in production!
    For production, use a production WSGI server like Gunicorn or uWSGI.
    """
    app.run(debug=True, port=5001)
