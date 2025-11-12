/**
 * LOGIN COMPONENT
 * ===============
 * This component displays the login screen and handles user authentication.
 * 
 * How it works:
 * 1. User enters username and password
 * 2. Form is submitted to backend API
 * 3. If successful, receives JWT token and user data
 * 4. Calls onLogin function (passed from parent) to update app state
 * 
 * Key Concepts:
 * - Controlled Components: Input values are controlled by React state
 * - Async/Await: Modern way to handle promises (API calls)
 * - Error Handling: Shows friendly error messages if login fails
 */

import React, { useState } from 'react';
import axios from 'axios';  // HTTP client for making API requests
import './Login.css';

// Get API URL from environment variable, or use default
// This allows different URLs for development vs production
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Login({ onLogin }) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Store username input value
  const [username, setUsername] = useState('');
  
  // Store password input value
  const [password, setPassword] = useState('');
  
  // Store error message (if login fails)
  const [error, setError] = useState('');
  
  // Track if login request is in progress
  const [loading, setLoading] = useState(false);

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  /**
   * Handles form submission when user clicks "Login"
   * 
   * Steps:
   * 1. Prevent default form submission (which would reload page)
   * 2. Clear any previous errors
   * 3. Show loading state
   * 4. Send login request to backend
   * 5. If successful, call onLogin callback
   * 6. If failed, show error message
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    setError('');  // Clear previous errors
    setLoading(true);  // Show loading state

    try {
      // Send POST request to backend login endpoint
      // axios.post(url, data, config)
      const response = await axios.post(`${API_URL}/api/login`, {
        username,  // Send username from state
        password   // Send password from state
      });

      // Check if we received a token (login successful)
      if (response.data.token) {
        // Call the onLogin function passed from parent component (App.js)
        // This will update the app state and show the dashboard
        onLogin(response.data.token, response.data.user);
      }
    } catch (err) {
      // Login failed - show error message
      // Try to get error message from server, or use generic message
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      // Always reset loading state (whether success or failure)
      setLoading(false);
    }
  };

  // ============================================
  // RENDER (What to show on screen)
  // ============================================
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to access your chatbot</p>
        
        {/* Form element - calls handleSubmit when user presses Enter or clicks Login */}
        <form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}  // Controlled by React state
              onChange={(e) => setUsername(e.target.value)}  // Update state on every keystroke
              placeholder="Enter your username"
              required  // HTML5 validation - cannot submit empty
              disabled={loading}  // Disable while loading
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"  // Hides characters as user types
              id="password"
              value={password}  // Controlled by React state
              onChange={(e) => setPassword(e.target.value)}  // Update state on every keystroke
              placeholder="Enter your password"
              required  // HTML5 validation - cannot submit empty
              disabled={loading}  // Disable while loading
            />
          </div>

          {/* Error Message (only shows if there's an error) */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {/* Show different text based on loading state */}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: <code>admin</code> | Password: <code>admin123</code></p>
          <p>Username: <code>user</code> | Password: <code>user123</code></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
