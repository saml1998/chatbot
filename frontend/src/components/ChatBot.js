/**
 * CHATBOT COMPONENT
 * =================
 * This component creates a floating chatbot with two parts:
 * 1. Robot button in bottom-right corner (always visible when logged in)
 * 2. Popup chat window (shows when button is clicked)
 * 
 * Features:
 * - Send messages to backend and receive responses
 * - Auto-scroll to latest message
 * - Loading indicator while waiting for response
 * - Error handling with auto-logout on authentication errors
 * 
 * Key Concepts:
 * - useRef: Create a reference to DOM element (for scrolling)
 * - Array spread operator [...prev, newItem]: Add item to array immutably
 * - Conditional rendering: Show/hide elements based on state
 */

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

// Get API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function ChatBot({ user, onLogout, isOpen, onToggle }) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  /**
   * Messages array - stores all chat messages
   * Each message object has: type, text, timestamp
   * - type: 'user' or 'bot'
   * - text: the message content
   * - timestamp: ISO format timestamp
   */
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `Hello ${user.name}! I'm your chatbot assistant. How can I help you today?`,
      timestamp: new Date().toISOString()
    }
  ]);
  
  // Store the current input message (what user is typing)
  const [inputMessage, setInputMessage] = useState('');
  
  // Track if we're waiting for bot response
  const [loading, setLoading] = useState(false);
  
  /**
   * useRef creates a reference to a DOM element
   * We use this to scroll to the bottom of messages automatically
   * Think of it as a "pointer" to an element in the HTML
   */
  const messagesEndRef = useRef(null);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
  /**
   * Scrolls the messages container to the bottom
   * Called whenever new messages are added
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // The ? is optional chaining - only calls scrollIntoView if element exists
  };

  /**
   * Auto-scroll effect
   * Runs every time the messages array changes
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);  // Dependency array - run when 'messages' changes

  // ============================================
  // SEND MESSAGE FUNCTION
  // ============================================
  /**
   * Handles sending a message to the chatbot
   * 
   * Steps:
   * 1. Add user's message to chat immediately
   * 2. Clear input field
   * 3. Send message to backend API
   * 4. Add bot's response to chat
   * 5. Handle any errors
   */
  const sendMessage = async (e) => {
    e.preventDefault();  // Prevent form submission/page reload
    
    // Don't send empty messages
    if (!inputMessage.trim()) return;

    // Create user message object
    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };

    // Add user message to chat
    // ...prev means "copy all previous messages"
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input field
    setInputMessage('');
    
    // Show loading indicator
    setLoading(true);

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('token');
      
      // Send POST request to chatbot API
      const response = await axios.post(
        `${API_URL}/api/chat`,
        { message: inputMessage },  // Request body
        {
          headers: {
            'Authorization': `Bearer ${token}`  // Include token for authentication
          }
        }
      );

      // Create bot message object from response
      const botMessage = {
        type: 'bot',
        text: response.data.response,
        timestamp: response.data.timestamp
      };

      // Add bot message to chat
      setMessages(prev => [...prev, botMessage]);
      
    } catch (err) {
      // Error occurred - show error message
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // If error is 401 (unauthorized), token expired - logout user
      if (err.response?.status === 401) {
        setTimeout(() => onLogout(), 2000);  // Wait 2 seconds then logout
      }
    } finally {
      // Always hide loading indicator (whether success or error)
      setLoading(false);
    }
  };

  /**
   * Format timestamp to readable time
   * Input: "2025-11-12T10:30:00.000Z"
   * Output: "10:30 AM"
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // ============================================
  // RENDER (What to show on screen)
  // ============================================
  return (
    <>
      {/* ============================================ */}
      {/* FLOATING ROBOT BUTTON */}
      {/* ============================================ */}
      {/* This button is always visible in the bottom-right corner */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}  // Add 'active' class when open
        onClick={onToggle}  // Toggle chat window on click
        aria-label="Toggle chatbot"  // Accessibility label for screen readers
      >
        {/* Show different icon based on open/closed state */}
        {isOpen ? (
          <span className="close-icon">✕</span>  // X icon when open
        ) : (
          <span className="robot-icon">🤖</span>  // Robot emoji when closed
        )}
      </button>

      {/* ============================================ */}
      {/* CHATBOT POPUP WINDOW */}
      {/* ============================================ */}
      {/* Only render this section if isOpen is true */}
      {isOpen && (
        <div className="chatbot-window">
          
          {/* HEADER - Shows robot avatar, title, and minimize button */}
          <div className="chatbot-header">
            <div className="header-info">
              <span className="robot-avatar">🤖</span>
              <div>
                <h3>ChatBot Assistant</h3>
                <p className="status">Online</p>  {/* Shows green dot via CSS */}
              </div>
            </div>
            {/* Minimize button - same as clicking robot button */}
            <button className="minimize-btn" onClick={onToggle} aria-label="Minimize">
              −
            </button>
          </div>

          {/* MESSAGES AREA - Scrollable list of chat messages */}
          <div className="messages-container">
            {/* Loop through all messages and render each one */}
            {messages.map((message, index) => (
              <div
                key={index}  // Unique key for React list rendering
                className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>  {/* Message text */}
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            
            {/* TYPING INDICATOR - Shows when waiting for bot response */}
            {loading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    {/* Three animated dots */}
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible div at bottom - used for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM - Text box and send button */}
          <form className="input-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}  // Controlled by React state
              onChange={(e) => setInputMessage(e.target.value)}  // Update state on every keystroke
              placeholder="Type your message..."
              disabled={loading}  // Disable while waiting for response
              className="message-input"
            />
            <button 
              type="submit" 
              disabled={loading || !inputMessage.trim()}  // Disable if loading or empty message
              className="send-button"
            >
              ➤  {/* Arrow icon */}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;
