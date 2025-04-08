const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./models/config');
const userRoutes = require('./routes/user');
const userInfoRoutes = require('./routes/userInfo'); // Assuming you have this route file

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/userInfo', userInfoRoutes); // Route for user info

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
