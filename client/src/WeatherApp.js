import React, { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError(""); 
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "City nahi mili 🔍");
        setWeather(null);
      }
    } catch (err) {
      setError("Server se connect nahi ho paya! 🌐");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Mausam Update 🌦️</h1>
        
        <div className="flex gap-2 mb-6">
          <input 
            className="flex-1 p-4 border-2 border-blue-100 rounded-2xl focus:outline-none focus:border-blue-500"
            type="text" 
            placeholder="City ka naam..." 
            value={city}
            onChange={(e) => setCity(e.target.value)} 
          />
          <button 
            className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700"
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 font-semibold mb-4 bg-red-50 p-2 rounded-lg">{error}</p>}

        {weather && (
          <div className="mt-6 p-6 bg-blue-50 rounded-3xl">
            <h2 className="text-2xl font-bold text-gray-800">{weather.name} 📍</h2>
            <p className="text-6xl font-black text-blue-600 my-4">{Math.round(weather.main.temp)}°C</p>
            <p className="text-xl text-gray-600 capitalize font-medium">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
