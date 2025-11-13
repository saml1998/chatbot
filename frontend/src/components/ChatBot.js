import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function ChatBot({ user, onLogout, isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `Hello ${user.name}! I'm your chatbot assistant. How can I help you today?`,
      timestamp: new Date().toISOString()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${API_URL}/api/chat`,
        { message: inputMessage },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const botMessage = {
        type: 'bot',
        text: response.data.response,
        timestamp: response.data.timestamp
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (err) {
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      if (err.response?.status === 401) {
        setTimeout(() => onLogout(), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={onToggle}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <span className="chat-icon">💬</span>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-info">
              <div>
                <h3>Chat Assistant</h3>
                <p className="status">Online</p>
              </div>
            </div>
            <button className="minimize-btn" onClick={onToggle} aria-label="Minimize">
              −
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className="input-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="message-input"
            />
            <button 
              type="submit" 
              disabled={loading || !inputMessage.trim()}
              className="send-button"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;
