import React from 'react';
import './App.css';

const Weather = ({ weatherData }) => {
  const { name, main, weather, sys, wind } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
  const date = new Date().toDateString();

return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}</h2>
        <p>{date}</p>
      </div>
      
      <div className="weather-icon-container">
        <img src={iconUrl} alt={weather[0].description} />
        <p className="weather-description">{weather[0].description}</p>
      </div>
      
      <h1 className="temperature">{Math.round(main.temp)}°</h1>
      
      <div className="details">
        <div>
          <span>{Math.round(main.feels_like)}°</span>
          <small>Feels Like</small>
        </div>
        <div>
          <span>{main.humidity}%</span>
          <small>Humidity</small>
        </div>
        <div>
          <span>{wind.speed}</span>
          <small>Wind (m/s)</small>
        </div>
      </div>
    </div>
  );
};

export default Weather;