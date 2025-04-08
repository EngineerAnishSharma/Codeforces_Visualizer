// models/UserInfo.js
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema(
    {   
        name: { type: String, required: true },
        email: { type: String, required: true },
        topics: { type: String, required: false },
        solveTime: { type: Number, required: false },
        contests: { type: Number, required: false },
        goal: { type: Number, required: false },
        currentRating: { type: Number, required: false },
        language: { type: String, required: false },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('UserInfo', userInfoSchema);
