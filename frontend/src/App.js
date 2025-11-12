/**
 * MAIN APPLICATION COMPONENT
 * ==========================
 * This is the root component of our React application.
 * It manages the overall app state and decides what to show:
 * - Login screen (if not authenticated)
 * - Dashboard with floating chatbot (if authenticated)
 * 
 * Key Concepts:
 * - State: Variables that React tracks and re-renders when they change
 * - useEffect: Runs code when component mounts (like checking if user is logged in)
 * - localStorage: Browser storage that persists data even after page refresh
 */

import React, { useState, useEffect } from 'react';
import Login from './components/Login';  // Login screen component
import ChatBot from './components/ChatBot';  // Chatbot popup component
import './App.css';  // Styling for this component

function App() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  // useState creates a piece of state (data that can change)
  // Format: const [value, setValue] = useState(initialValue)
  
  // Track if user is logged in or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Store user information (username, name, etc.)
  const [user, setUser] = useState(null);
  
  // Track if chatbot window is open or closed
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ============================================
  // CHECK IF USER IS ALREADY LOGGED IN
  // ============================================
  // useEffect runs when component first loads
  // Think of it as "when the page loads, do this..."
  useEffect(() => {
    // Try to get saved login data from browser storage
    const token = localStorage.getItem('token');  // JWT token
    const storedUser = localStorage.getItem('user');  // User info (JSON string)
    
    // If both exist, user was previously logged in
    if (token && storedUser) {
      setIsAuthenticated(true);  // Mark as logged in
      setUser(JSON.parse(storedUser));  // Convert JSON string back to object
    }
  }, []); // Empty array [] means "run only once when component mounts"

  // ============================================
  // EVENT HANDLERS (Functions that respond to user actions)
  // ============================================
  
  /**
   * Called when user successfully logs in
   * Saves login data and updates state
   */
  const handleLogin = (token, userData) => {
    // Save to browser storage (persists across page refreshes)
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Update React state to show logged-in view
    setIsAuthenticated(true);
    setUser(userData);
  };

  /**
   * Called when user logs out
   * Clears all login data
   */
  const handleLogout = () => {
    // Remove from browser storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset state to logged-out view
    setIsAuthenticated(false);
    setUser(null);
    setIsChatOpen(false);  // Also close chatbot if open
  };

  /**
   * Toggle chatbot window open/closed
   */
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);  // Flip the boolean value
  };

  // ============================================
  // RENDER (What to show on screen)
  // ============================================
  return (
    <div className="App">
      {/* Conditional rendering: Show different content based on authentication */}
      
      {!isAuthenticated ? (
        // ❌ NOT LOGGED IN: Show login screen
        <Login onLogin={handleLogin} />
      ) : (
        // ✅ LOGGED IN: Show dashboard and chatbot
        <>
          {/* Main content area after login */}
          <div className="dashboard-content">
            <div className="welcome-section">
              <h1>Welcome, {user.name}! 👋</h1>
              <p>You're successfully logged in. Click the robot icon to start chatting!</p>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          
          {/* Floating chatbot (robot button + popup window) */}
          <ChatBot 
            user={user}  // Pass user data to chatbot
            onLogout={handleLogout}  // Pass logout function
            isOpen={isChatOpen}  // Pass open/closed state
            onToggle={toggleChat}  // Pass toggle function
          />
        </>
      )}
    </div>
  );
}

export default App;
