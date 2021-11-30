import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = {
  key: "6d2e2ee6551ef63948c8003dbf03ea01",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [data, setData] = useState();
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${data}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setData('');
          console.log(result);
        });
    }
  }

  const dateSetter = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return day + " " + date + " " + month + " " + year
  }

  useEffect(() => {
    async function fetchData() {
        const request = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=6d2e2ee6551ef63948c8003dbf03ea01');
        setWeather(request)
        return request;
    }
    fetchData();
}, []);

console.log(weather);
  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app spring' : 'app') : 'app'}>
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 7)  ? 'app winter' : 'app'): 'app'}> 
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'app summer' : 'app') : 'app'}>
      <main>
        <div className="search">
          <input 
            type="text"
            className="search-box"
            placeholder="Search your desired City"
            onChange={e => setData(e.target.value)}
            value={data}
            onKeyPress={search}
          />
        </div>
        
        {(typeof weather.main != "undefined") ? (
        <div>
          
          <div className="Date-City">
            
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateSetter(new Date())}</div>
          </div>
          <div className="icon-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
              <img
                  className="weather"
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="wthr img"
                  width="100"
                  height="100"
                />
            </div>
            <div className="weather-descrip">{weather.weather[0].main}</div>
            <div>
                    <p6>High: {Math.round(weather.main.temp_max)}°c</p6>
                    <br></br>
                    <p6>Low: {Math.round(weather.main.temp_min)}°c</p6>
                </div>
                <div>
                    <p9>Humidity: </p9>
                    <p9>{weather.main.humidity}%</p9>
                </div>
          </div>
        </div>
        ) : (null)}
      </main>
    </div></div> </div>
  );
}

export default App;
