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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-cyan-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/60 rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 drop-shadow-md">
          ✨ Personalized Codeforces Plan Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'name', type: 'text', label: 'Full Name' },
            { name: 'email', type: 'email', label: 'Email Address' },
            { name: 'topics', type: 'text', label: 'Focus Topics' },
            { name: 'solveTime', type: 'number', label: 'Avg Solve Time (mins)' },
            { name: 'contests', type: 'number', label: 'Contests Attended' },
            { name: 'goal', type: 'number', label: 'Goal Rating' },
            { name: 'currentRating', type: 'number', label: 'Current Rating' },
            { name: 'language', type: 'text', label: 'Preferred Language' }
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm text-gray-700 font-semibold mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
              />
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full" />
                  Generating Plan...
                </span>
              ) : (
                'Generate My Study Plan 🚀'
              )}
            </button>
          </div>
        </form>

        {suggestion && (
          <div className="mt-10 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-300 shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              📌 Your Personalized Plan:
            </h2>
            <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-mono">
              {suggestion}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiStudy;
