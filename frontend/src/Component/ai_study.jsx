import React, { useState } from 'react';
import axios from 'axios';
import './AiStudy.css'; // Add this line to import custom styles

const AiStudy = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topics: '',
    solveTime: '',
    contests: '',
    goal: '',
    currentRating: '',
    language: ''
  });

  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/userInfo/', formData);
      const cleanSuggestion = response.data.suggestion.replace(/[#*]/g, '').replace(/\n/g, '\n');
      setSuggestion(cleanSuggestion);
    } catch (err) {
      console.error(err);
      setSuggestion('Something went wrong!');
    }
    setLoading(false);
  };

  const fields = [
    { name: 'name', type: 'text', label: 'Full Name' },
    { name: 'email', type: 'email', label: 'Email Address' },
    { name: 'topics', type: 'text', label: 'Focus Topics' },
    { name: 'solveTime', type: 'number', label: 'Avg Solve Time (mins)' },
    { name: 'contests', type: 'number', label: 'Contests Attended' },
    { name: 'goal', type: 'number', label: 'Goal Rating' },
    { name: 'currentRating', type: 'number', label: 'Current Rating' },
    { name: 'language', type: 'text', label: 'Preferred Language' }
  ];

  return (
    <div className="study-container">
      <div className="study-box">
        <h1 className="study-title">
          🚀 Personalized Codeforces Study Plan
        </h1>

        <form onSubmit={handleSubmit} className="study-form">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                required
                className="form-input"
              />
            </div>
          ))}

          <div className="form-group full-width">
            <button
              type="submit"
              disabled={loading}
              className={`submit-btn ${loading ? 'disabled' : ''}`}
            >
              {loading ? (
                <span className="loading">
                  <span className="spinner" />
                  Generating...
                </span>
              ) : (
                'Generate My Study Plan'
              )}
            </button>
          </div>
        </form>

        {suggestion && (
          <div className="result-box">
            <h2 className="result-title">📌 Your Personalized Plan</h2>
            <pre className="result-text">{suggestion}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudy;
