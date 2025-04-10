import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function HomePage() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Single User",
      description: "Visualize stats and activity of a single Codeforces user.",
      path: "/single-user",
      color: "linear-gradient(135deg, #6EE7B7, #3B82F6)"
    },
    {
      title: "Compare",
      description: "Compare performance between multiple users side by side.",
      path: "/compare",
      color: "linear-gradient(135deg, #FDE68A, #F59E0B)"
    },
    {
      title: "AI Study",
      description: "Get AI-powered insights and study strategies for improvement.",
      path: "/ai-study",
      color: "linear-gradient(135deg, #FCA5A5, #EC4899)"
    },
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Codeforces Visualizer</h1>
        <p className="home-subtitle">Select an option to explore insights</p>

        <div className="card-grid">
          {options.map((option, index) => (
            <div
              key={index}
              className="option-card"
              style={{ background: option.color }}
              onClick={() => navigate(option.path)}
            >
              <h2>{option.title}</h2>
              <p className="card-description">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="wave-container">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="wave-svg"
        //   style={{ height: "12rem" }}
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.67,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
}
