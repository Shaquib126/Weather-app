
// client/src/WeatherApp.js
import React, { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError(""); // Purani error clear karna
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "City nahi mili");
        setWeather(null);
      }
    } catch (err) {
      setError("Server se connect nahi ho paya!");
    }
  };

  return (
    // Tailwind classes added here
    <div className="max-w-md mx-auto mt-16 p-8 bg-blue-50 rounded-2xl shadow-xl text-center font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mausam Update 🌦️</h1>
      
      <div className="flex justify-center items-center mb-6">
        <input 
          className="p-3 w-2/3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" 
          placeholder="Enter City..." 
          value={city}
          onChange={(e) => setCity(e.target.value)} 
        />
        <button 
          className="p-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition duration-300"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Weather Info */}
      {weather && (
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">{weather.name} ka Mausam</h2>
          <p className="text-4xl font-bold text-blue-600 my-3">{weather.main.temp} °C</p>
          <p className="text-lg text-gray-600 capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
