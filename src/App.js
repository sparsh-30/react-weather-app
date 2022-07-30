import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=52979b04b8844e8cebb12d6080a69fb8&units=metric`;

  const GetWeather = async (e) => {
    if(e.key==="Enter" || e.type==="click"){
      // fetch(url)
      // .then((res) => res.json())
      // .then((result) => {
      //   setWeather(result);
      //   setQuery("");
      // });
      const result=await fetch(url);
      const resultJSON=await result.json();
      setWeather(resultJSON);
      setQuery("");
    }
  };


  const Weather = async (e) => {
    setQuery(e.target.value);
  };


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? "warm" : "cold") : "cold"}>
      <div className="search-fields">
        <input className="inp" type="text" onChange={Weather} onKeyDown={GetWeather} placeholder="Enter name of the city..." />
      </div>
      {!weather.main ? ("") : (
        <div className="details-container">
          <div >
            <h1>{weather.name}, {weather.sys.country}</h1>
            <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
          </div>
          <div className="stats-container">
            <p>Humidity: {weather.main.humidity}</p>
            <p>Pressure: {weather.main.pressure}</p>
            <p>Sea Level: {weather.main.sea_level} m</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;