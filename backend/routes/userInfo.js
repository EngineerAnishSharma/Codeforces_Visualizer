const express = require('express');
const router = express.Router();
const UserInfo = require('../models/UserInfo');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const {
    name,
    email,
    topics,
    solveTime,
    contests,
    goal,
    currentRating,
    language
  } = req.body;

  try {
    // 1. Save user info to DB
    const user = new UserInfo({
      name,
      email,
      topics,
      solveTime,
      contests,
      goal,
      currentRating,
      language
    });

    await user.save();

    // 2. Gemini Prompt
    const prompt = `
      A Codeforces user has the following profile:
      - Name: ${name}
      - Current Rating: ${currentRating}
      - Goal Rating: ${goal}
      - Topics: ${topics}
      - Average Solve Time: ${solveTime} mins
      - Contests Attended: ${contests}
      - Preferred Language: ${language}

      Suggest a personalized plan to help this user reach their goal rating.
    `;

    // 3. Get Gemini Response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const suggestion = result.response.text();

    // 4. Send back result
    res.status(201).json({ suggestion });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
