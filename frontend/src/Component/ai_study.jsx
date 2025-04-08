import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Codeforces Study Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'topics', 'solveTime', 'contests', 'goal', 'currentRating', 'language'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {suggestion && (
        <div className="mt-6 whitespace-pre-wrap p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Suggested Plan:</h2>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AiStudy;