import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  //const apiKey = "f0f6a60f30f7b86665d1d6172fe7d9e0";
  const city = "Oshawa";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m%2Cweather_code&timezone=America%2FToronto&utm_source=chatgpt.com`
        );
        const data = await res.json();

        if (data.current) {
    setWeather({
        city: "Oshawa",
        temperature: data.current.temperature_2m,
        description: "Current weather",
        icon: data.current.weather_code
    });
      } else {
          setError("Could not fetch weather.");
        }
      } catch (err) {
        setError("API error occurred.");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-box">
      <h3>Live Weather</h3>
      {error ? (
        <p className="error-text">{error}</p>
      ) : weather ? (
        <div className="weather-content">
          <p><strong>City:</strong> {weather.city}</p>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Weather:</strong> {weather.description}</p>

        <span className="weather-icon" style={{ fontSize: "60px" }}>
        {weather.icon === 0 ? "☀️" :
        weather.icon <= 3 ? "⛅" :
        weather.icon <= 48 ? "🌫️" :
        weather.icon <= 67 ? "🌧️" :
        weather.icon <= 77 ? "❄️" :
        weather.icon <= 82 ? "🌦️" :
        weather.icon <= 86 ? "🌨️" :
        "⛈️"}
        </span>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}
