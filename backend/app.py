from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import jwt
import os
from functools import wraps

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

users = {
    'admin': {
        'password': 'admin123',
        'name': 'Admin User'
    },
    'user': {
        'password': 'user123',
        'name': 'Test User'
    }
}

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['username']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password'}), 400
    
    username = data['username']
    password = data['password']
    
    if username in users and users[username]['password'] == password:
        token_payload = {
            'username': username,
            'name': users[username]['name'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }
        
        token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'username': username,
                'name': users[username]['name']
            }
        }), 200
    
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/chat', methods=['POST'])
@token_required
def chat(current_user):
    data = request.get_json()
    
    if not data or not data.get('message'):
        return jsonify({'message': 'No message provided'}), 400
    
    user_message = data['message'].lower()
    
    if 'hello' in user_message or 'hi' in user_message:
        bot_response = f"Hello {current_user}! How can I help you today?"
    elif 'how are you' in user_message:
        bot_response = "I'm doing great! Thanks for asking. How can I assist you?"
    elif 'bye' in user_message or 'goodbye' in user_message:
        bot_response = "Goodbye! Have a great day!"
    elif 'help' in user_message:
        bot_response = "I'm here to help! You can ask me questions or just chat with me."
    elif 'weather' in user_message:
        bot_response = "I'm sorry, I don't have access to weather data yet, but it's probably nice wherever you are!"
    elif 'time' in user_message:
        current_time = datetime.now().strftime('%I:%M %p')
        bot_response = f"The current time is {current_time}"
    elif 'date' in user_message:
        current_date = datetime.now().strftime('%B %d, %Y')
        bot_response = f"Today's date is {current_date}"
    elif 'name' in user_message:
        bot_response = "I'm ChatBot, your friendly AI assistant!"
    else:
        bot_response = "That's interesting! Tell me more, or ask me something else."
    
    return jsonify({
        'response': bot_response,
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/verify', methods=['GET'])
@token_required
def verify_token(current_user):
    return jsonify({
        'message': 'Token is valid',
        'user': current_user
    }), 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
