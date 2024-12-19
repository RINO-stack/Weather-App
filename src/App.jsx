import React, { useState } from "react";
import './styles.css';

React

function App() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to give weather data of this place.");
    }
  };

  const handleSearch = () => {
    if (place) {
      fetchWeather();
    } else {
      alert("Please enter a city name");
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weather && (
        <div className="weather-container">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} kph</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;

