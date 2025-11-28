import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';
import './App.css';

function App() {
  const [city, setCity] = useState('Toronto');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Toronto');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.cityInput.value;
    if (searchInput) {
      setCity(searchInput);
      fetchWeather(searchInput);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          name="cityInput" 
          placeholder="Enter city (e.g., London)" 
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Loading & Error States */}
      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error-message">{error}</p>}

      {/* Weather Display Component */}
      {weatherData && <Weather weatherData={weatherData} />}
    </div>
  );
}

export default App;