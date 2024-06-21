"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("Lahore");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const API_KEY = "677eae3328bf82544874631c4caa49cc";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-container bg-black text-white">
      <div className="box">
        <h1 className="weather-title">Weather App</h1>

        <form onSubmit={handleSubmit}>
          <div className="search-inp">
            <input
              type="text"
              placeholder="Lahore"
              value={city}
              onChange={handleChange}
              className="weather-input"
            />
          </div>

          <button type="submit" className="weather-button font-bold">
            Get Weather
          </button>
        </form>
        {error && <div className="weather-info">{error}</div>}
        {weatherData && (
          <div className="weather-info">
            <h2 className=" font-extrabold text-2xl text-blue-600">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="font-semibold">
              Temperature :{" "}
              <span
                className="temp-color"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {weatherData.main.temp}°C
              </span>
            </p>
            <p className="font-semibold">
              Weather : <strong>{weatherData.weather[0].main}</strong>
            </p>
            <p className="font-semibold">
              Humidity : <span>{weatherData.main.humidity}%</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
