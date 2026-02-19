
// server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Ye React aur Node ko aapas mein baat karne deta hai
app.use(express.json());

// Weather Route
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: "City ka naam zaroori hai!" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Data fetch karne mein error aayi", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
