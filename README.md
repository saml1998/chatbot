# 🤖 Full-Stack Chatbot Application

### **A Complete Beginner's Guide to Building Your Own Chatbot**

A modern, beautiful chatbot application with user authentication and a floating chat interface. Perfect for learning full-stack development!

---

## 📸 What You'll Build

**Login Screen:**

- Beautiful gradient background with purple/blue colors
- Clean white login card with form validation
- Demo credentials displayed for easy testing

**After Login - Dashboard:**

- Welcome message with your name
- Clean, modern interface
- Floating robot button (🤖) in bottom-right corner

**Chatbot Interface:**

- Click the robot button to open chat
- Popup chat window (400x600px)
- Real-time messaging with typing indicators
- Auto-scroll to latest messages
- Animated robot avatar that pulses
- "Online" status with blinking green dot
- Smooth animations throughout

---

## 🎯 What is This Project?

This is a **full-stack web application** with two main parts:

1. **Frontend (React)** - The visual interface users see and interact with
2. **Backend (Python Flask)** - The server that handles login and chatbot logic

**Think of it like:**

- Frontend = The restaurant (beautiful dining area where customers sit)
- Backend = The kitchen (where the actual cooking/processing happens)
- API = The waiter (carries requests and responses between them)

---

## 🛠️ Technologies Used

### Frontend (User Interface)

- **React** - JavaScript library for building user interfaces
- **Axios** - Makes HTTP requests to backend API
- **CSS3** - Modern styling with gradients and animations

### Backend (Server)

- **Python 3.x** - Programming language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Allows frontend and backend to communicate
- **PyJWT** - Creates secure login tokens
- **python-dotenv** - Manages environment variables

---

## 📁 Project Structure Explained

```
fullstack-chatbot-app/
│
├── backend/                    # Server-side code (Python)
│   ├── app.py                 # Main Flask application
│   │                          # Contains: Login API, Chatbot API, JWT auth
│   ├── requirements.txt       # List of Python packages needed
│   └── .env                   # Configuration (API keys, secrets)
│
├── frontend/                   # Client-side code (React)
│   ├── public/
│   │   └── index.html        # Base HTML file
│   │
│   ├── src/
│   │   ├── components/        # Reusable UI pieces
│   │   │   ├── Login.js      # Login form component
│   │   │   ├── Login.css     # Login styling
│   │   │   ├── ChatBot.js    # Floating chatbot component
│   │   │   └── ChatBot.css   # Chatbot styling
│   │   │
│   │   ├── App.js            # Main app (decides what to show)
│   │   ├── App.css           # Main app styling
│   │   ├── index.js          # Entry point (starts React)
│   │   └── index.css         # Global styles
│   │
│   ├── package.json          # Node.js dependencies
│   └── .env                  # Frontend configuration
│
├── README.md                  # This file!
└── .gitignore                # Files to exclude from Git
```

---

## 🚀 Complete Setup Guide (Step-by-Step)

### **Prerequisites** (Software You Need First)

Before starting, install these on your computer:

1. **Python 3.8 or higher**

   - Check: `python3 --version`
   - Download from: https://www.python.org/downloads/

2. **Node.js 14 or higher** (includes npm)

   - Check: `node --version` and `npm --version`
   - Download from: https://nodejs.org/
   - On macOS with Homebrew: `brew install node`

3. **A Code Editor** (recommended: VS Code)

   - Download from: https://code.visualstudio.com/

4. **Terminal/Command Prompt**
   - macOS/Linux: Built-in Terminal
   - Windows: Command Prompt or PowerShell

---

### **Part 1: Backend Setup** (Python/Flask Server)

#### Step 1: Navigate to Backend Folder

Open your terminal and navigate to the backend directory:

```bash
cd fullstack-chatbot-app/backend
```

#### Step 2: Create Virtual Environment (Recommended)

A virtual environment keeps your Python packages isolated for this project.

**On macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**

```cmd
python -m venv venv
venv\Scripts\activate
```

You'll see `(venv)` appear at the start of your terminal prompt when activated.

#### Step 3: Install Python Dependencies

This installs Flask, Flask-CORS, PyJWT, and other required packages:

```bash
pip install -r requirements.txt
```

**What's being installed:**

- `Flask==3.0.0` - Web framework
- `Flask-CORS==4.0.0` - Enables API access from React
- `PyJWT==2.8.0` - JWT token generation/verification
- `python-dotenv==1.0.0` - Environment variable management

#### Step 4: Configure Environment Variables (Optional)

The `.env` file contains configuration. For now, default values work fine.

**To change the secret key (recommended for production):**

Edit `backend/.env`:

```
SECRET_KEY=your-super-secret-key-here
FLASK_ENV=development
FLASK_APP=app.py
```

#### Step 5: Start the Backend Server

```bash
python3 app.py
```

**You should see:**

```
* Serving Flask app 'app'
* Debug mode: on
* Running on http://127.0.0.1:5001
* Debugger is active!
```

✅ **Backend is now running!** Leave this terminal window open.

**What just happened?**

- Flask server started on port 5001
- It's now listening for API requests
- You can test it: Open browser to `http://localhost:5001/api/health`
- Should see: `{"status":"healthy"}`

---

### **Part 2: Frontend Setup** (React Application)

Open a **NEW terminal window/tab** (keep backend running).

#### Step 1: Navigate to Frontend Folder

```bash
cd fullstack-chatbot-app/frontend
```

#### Step 2: Install Node Dependencies

This installs React, Axios, and all frontend libraries:

```bash
npm install
```

**What's being installed:**

- `react` & `react-dom` - React framework
- `react-scripts` - Development scripts
- `axios` - HTTP client for API calls

This may take 1-2 minutes. You'll see a progress bar.

#### Step 3: Configure Environment Variables

The `.env` file tells React where the backend is:

**Check `frontend/.env`:**

```
REACT_APP_API_URL=http://localhost:5001
```

This should already be set correctly. The `REACT_APP_` prefix is required for React environment variables.

#### Step 4: Start the Frontend Development Server

```bash
npm start
```

**You should see:**

```
Compiled successfully!

You can now view chatbot-frontend in the browser.

  Local:            http://localhost:3000
```

✅ **Frontend is now running!** Your browser will automatically open.

**What just happened?**

- React development server started on port 3000
- Code is compiled and optimized
- Browser opened to `http://localhost:3000`
- Hot-reload enabled (changes appear immediately)

---

## 🎮 How to Use the Application

### **1. Login**

When you first open `http://localhost:3000`, you'll see the login screen.

**Demo Accounts (Already Set Up):**

| Username | Password   | Role       |
| -------- | ---------- | ---------- |
| `admin`  | `admin123` | Admin User |
| `user`   | `user123`  | Test User  |

**Steps:**

1. Enter username: `admin`
2. Enter password: `admin123`
3. Click "Login" button
4. You'll be redirected to the dashboard

**Behind the scenes:**

- Frontend sends POST request to `http://localhost:5001/api/login`
- Backend checks username/password
- If valid, backend creates JWT token
- Token is saved in browser's localStorage
- Frontend shows dashboard

### **2. Interact with Dashboard**

After login, you'll see:

- Welcome message with your name
- Logout button
- Floating robot button (🤖) in bottom-right corner

### **3. Chat with the Bot**

**To open chatbot:**

1. Click the 🤖 robot button in bottom-right corner
2. Chat window pops up (400x600px)
3. Type a message in the input box
4. Press Enter or click the ➤ send button

**Try These Messages:**

- "Hello" or "Hi" - Gets greeting
- "How are you?" - Bot responds about its status
- "What time is it?" - Gets current time
- "What's the date?" - Gets current date
- "What's your name?" - Bot introduces itself
- "Help" - Gets help message
- "Bye" - Gets farewell message
- Anything else - Gets default response

**Behind the scenes:**

1. Message sent to `http://localhost:5001/api/chat`
2. Backend checks JWT token (ensures you're logged in)
3. Backend analyzes message for keywords
4. Backend returns appropriate response
5. Frontend displays response in chat

### **4. Close Chat**

Click the:

- **✕** button in chat header, OR
- **🤖** button again

Chat window closes but robot button stays visible.

### **5. Logout**

Click the "Logout" button in:

- Dashboard (top area), OR
- Chat will auto-logout if your token expires (after 24 hours)

**Behind the scenes:**

- JWT token is removed from localStorage
- React state is reset
- You're redirected to login screen

---

## 🏗️ How It Works (Architecture)

### **Request Flow Example: Sending a Chat Message**

```
User types "Hello" and clicks Send
         ↓
React captures the message
         ↓
Axios sends POST to http://localhost:5001/api/chat
(includes JWT token in Authorization header)
         ↓
Flask receives request at /api/chat endpoint
         ↓
@token_required decorator verifies JWT token
         ↓
Chat function analyzes message
(checks for "hello" keyword)
         ↓
Returns JSON response: {"response": "Hello admin!", "timestamp": "..."}
         ↓
Axios receives response
         ↓
React adds bot message to messages array
         ↓
Component re-renders with new message
         ↓
Auto-scrolls to bottom
```

### **Key Concepts Explained**

**JWT (JSON Web Token):**

- Think of it as a "ticket" proving you logged in
- Created by backend when you login successfully
- Stored in browser's localStorage
- Sent with every API request
- Expires after 24 hours

**React State:**

- Variables that React "watches"
- When they change, React re-renders the component
- Examples: `isAuthenticated`, `user`, `messages`

**API Endpoints:**

- URLs that the backend exposes
- Frontend makes requests to these URLs
- Like a menu at a restaurant - you order from specific items

**CORS (Cross-Origin Resource Sharing):**

- Security feature that blocks requests between different ports
- Frontend (port 3000) and Backend (port 5001) are different origins
- Flask-CORS allows them to communicate

---

## 🎨 Customization Guide

### **Add More Users**

Edit `backend/app.py`, find the `users` dictionary:

```python
users = {
    'admin': {
        'password': 'admin123',
        'name': 'Admin User'
    },
    'yourname': {
        'password': 'yourpassword',
        'name': 'Your Full Name'
    }
}
```

Restart backend server to apply changes.

### **Add More Chatbot Responses**

Edit `backend/app.py`, find the `chat()` function:

```python
# Add your custom response
elif 'weather' in user_message:
    bot_response = "It's sunny today!"
elif 'joke' in user_message:
    bot_response = "Why did the programmer quit? Because they didn't get arrays!"
```

### **Change Colors**

Edit `frontend/src/App.css` and `ChatBot.css`:

```css
/* Change gradient background */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);

/* Example: Blue to green gradient */
background: linear-gradient(135deg, #667eea 0%, #48bb78 100%);
```

### **Change Robot Icon**

Edit `frontend/src/components/ChatBot.js`:

```jsx
// Replace 🤖 with any emoji
<span className="robot-icon">🐶</span>  // Dog
<span className="robot-icon">👾</span>  // Space invader
<span className="robot-icon">💬</span>  // Chat bubble
```

---

## 🔒 Security Considerations

### **⚠️ Important for Production**

This project is designed for learning. If deploying to production:

1. **Change the SECRET_KEY**

   - In `backend/.env`, use a strong, random key
   - Generate one: `python3 -c "import secrets; print(secrets.token_hex(32))"`

2. **Hash Passwords**

   - Never store plain text passwords!
   - Use bcrypt or argon2
   - Example:

   ```python
   from werkzeug.security import generate_password_hash, check_password_hash

   # Store
   hashed = generate_password_hash('password123')

   # Verify
   check_password_hash(hashed, 'password123')  # True
   ```

3. **Use a Real Database**

   - Replace in-memory `users` dictionary
   - Use PostgreSQL, MongoDB, or MySQL
   - Store users, messages, chat history

4. **Enable HTTPS**

   - Use SSL certificates
   - Never send passwords over HTTP

5. **Add Rate Limiting**

   - Prevent brute-force attacks
   - Use Flask-Limiter

6. **Validate All Inputs**

   - Sanitize user messages
   - Prevent SQL injection, XSS attacks

7. **Use Production Server**
   - Don't use Flask's built-in server
   - Use Gunicorn or uWSGI
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```

---

## 🚀 Making It an AI Chatbot

Currently, the chatbot uses **keyword matching** (if message contains "hello", respond with greeting).

To make it **AI-powered**, integrate with:

### **Option 1: OpenAI GPT (ChatGPT)**

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI(api_key='your-api-key')

@app.route('/api/chat', methods=['POST'])
@token_required
def chat(current_user):
    data = request.get_json()
    user_message = data['message']

    # Send to ChatGPT
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ]
    )

    bot_response = response.choices[0].message.content

    return jsonify({
        'response': bot_response,
        'timestamp': datetime.now().isoformat()
    })
```

### **Option 2: Google Gemini API (Free Tier Available)**

```bash
pip install google-generativeai
```

```python
import google.generativeai as genai

genai.configure(api_key='your-api-key')
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/chat', methods=['POST'])
@token_required
def chat(current_user):
    data = request.get_json()
    user_message = data['message']

    response = model.generate_content(user_message)
    bot_response = response.text

    return jsonify({
        'response': bot_response,
        'timestamp': datetime.now().isoformat()
    })
```

### **Option 3: Ollama (Run AI Models Locally - Free!)**

Download Ollama: https://ollama.com/

```bash
# Install Ollama models
ollama pull llama2

# In Python
pip install ollama

import ollama

@app.route('/api/chat', methods=['POST'])
@token_required
def chat(current_user):
    data = request.get_json()
    user_message = data['message']

    response = ollama.chat(model='llama2', messages=[
        {'role': 'user', 'content': user_message}
    ])

    bot_response = response['message']['content']

    return jsonify({
        'response': bot_response,
        'timestamp': datetime.now().isoformat()
    })
```

---

## 🐛 Troubleshooting

### **Problem: Port 5001 already in use**

**Error:**

```
Address already in use
Port 5001 is in use by another program
```

**Solution:**

```bash
# Find and kill process using port 5001
lsof -ti:5001 | xargs kill -9

# Or change port in backend/app.py:
app.run(debug=True, port=5002)

# And update frontend/.env:
REACT_APP_API_URL=http://localhost:5002
```

### **Problem: npm not found**

**Error:**

```
zsh: command not found: npm
```

**Solution:**

```bash
# Install Node.js (includes npm)

# On macOS with Homebrew:
brew install node

# On Windows: Download from https://nodejs.org/

# On Linux:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### **Problem: Module not found (Python)**

**Error:**

```
ModuleNotFoundError: No module named 'flask'
```

**Solution:**

```bash
# Make sure you're in backend directory
cd backend

# Activate virtual environment (if using one)
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Install requirements
pip install -r requirements.txt
```

### **Problem: CORS Error in Browser Console**

**Error:**

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

- Ensure Flask-CORS is installed: `pip install flask-cors`
- Check that `CORS(app)` is in `backend/app.py`
- Verify backend is running on port 5001
- Check `frontend/.env` has correct URL

### **Problem: Login Not Working**

**Checklist:**

1. Is backend server running? (Check terminal for Flask output)
2. Is it running on port 5001? (Check URL in backend terminal)
3. Is frontend pointing to correct URL? (Check `frontend/.env`)
4. Are you using correct credentials? (`admin` / `admin123`)
5. Open browser DevTools (F12) → Network tab → Check API calls

### **Problem: Changes Not Appearing**

**For Backend Changes:**

- Flask auto-reloads in debug mode
- If not, stop server (Ctrl+C) and restart: `python3 app.py`

**For Frontend Changes:**

- React hot-reloads automatically
- If not working, stop (Ctrl+C) and restart: `npm start`
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### **Problem: Token Expired**

**Error in chat:**

```
Token is invalid!
```

**Solution:**

- Logout and login again
- Token expires after 24 hours
- Change expiry in `backend/app.py`:

```python
'exp': datetime.utcnow() + timedelta(hours=48)  # 48 hours
```

---

## 📚 Learning Resources

### **To Learn More:**

**React:**

- Official Tutorial: https://react.dev/learn
- React Docs: https://react.dev/reference/react

**Flask:**

- Official Tutorial: https://flask.palletsprojects.com/tutorial/
- Flask Quickstart: https://flask.palletsprojects.com/quickstart/

**JavaScript/ES6:**

- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript.info: https://javascript.info/

**Python:**

- Official Tutorial: https://docs.python.org/3/tutorial/
- Real Python: https://realpython.com/

**JWT Authentication:**

- JWT.io: https://jwt.io/introduction
- Auth0 Docs: https://auth0.com/docs/secure/tokens/json-web-tokens

---

## 📝 Understanding the Code

### **Backend Highlights (backend/app.py)**

**1. User Authentication:**

```python
# When user logs in
token = jwt.encode({
    'username': username,
    'exp': datetime.utcnow() + timedelta(hours=24)
}, app.config['SECRET_KEY'], algorithm='HS256')
```

Creates a JWT token that expires in 24 hours.

**2. Token Verification:**

```python
@token_required  # Decorator that checks token
def chat(current_user):
    # This function only runs if token is valid
```

**3. Chatbot Logic:**

```python
if 'hello' in user_message:
    bot_response = f"Hello {current_user}!"
```

Simple keyword matching - can be replaced with AI!

### **Frontend Highlights**

**1. State Management (App.js):**

```jsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState(null);
```

Tracks if user is logged in and their info.

**2. Making API Calls (Login.js):**

```jsx
const response = await axios.post(`${API_URL}/api/login`, {
  username,
  password,
});
```

Sends login request to backend.

**3. Conditional Rendering (App.js):**

```jsx
{
  !isAuthenticated ? (
    <Login /> // Show if not logged in
  ) : (
    <ChatBot /> // Show if logged in
  );
}
```

**4. Floating Robot Button (ChatBot.js):**

```jsx
<button className="chatbot-toggle" onClick={onToggle}>
  {isOpen ? <span>✕</span> : <span>🤖</span>}
</button>
```

---

## 🎓 Next Steps & Improvements

Once you're comfortable with this project, try:

### **Beginner Level:**

1. Add more chatbot responses
2. Change colors and styling
3. Add more user accounts
4. Modify the welcome message

### **Intermediate Level:**

1. Add password reset functionality
2. Store chat history in database
3. Add user registration (sign up)
4. Add file upload feature
5. Create user profiles
6. Add email notifications

### **Advanced Level:**

1. Integrate with OpenAI/Gemini for AI responses
2. Add voice input/output
3. Multi-language support
4. Real-time chat with WebSockets
5. Deploy to production (Heroku, AWS, Google Cloud)
6. Add analytics dashboard
7. Implement admin panel
8. Add rate limiting and security features

---

## 🤝 Contributing

This is a learning project! Feel free to:

- Fork the repository
- Make improvements
- Submit pull requests
- Share with others learning full-stack development

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🆘 Need Help?

If you encounter issues:

1. **Check this README** - Most common issues are covered
2. **Read the code comments** - All files have detailed explanations
3. **Check browser DevTools** - F12 → Console tab for errors
4. **Check terminal output** - Both frontend and backend show errors
5. **Google the error message** - Most errors have solutions online

---

## 🎉 Congratulations!

If you've made it this far and have the app running, you've successfully built a full-stack web application!

**You now understand:**

- ✅ How frontend and backend communicate
- ✅ How authentication works with JWT
- ✅ How to make API requests
- ✅ How to build React components
- ✅ How to create a Flask API
- ✅ How to manage state in React
- ✅ How to style modern web applications

**Keep building and learning!** 🚀

---

**Made with ❤️ for learning full-stack development**
