import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';
import cropsData from '../data/crops.json';

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // public demo key - replace with yours
const DEFAULT_CITY = 'Pālam';

export default function UserHome() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [searchCity, setSearchCity] = useState(DEFAULT_CITY);
  const [loading, setLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');
  const navigate = useNavigate();

  const loadWeatherByCity = async (location, errorMessage) => {
    setLoading(true);
    setWeatherError('');
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`);
      setWeather(res.data);
      setCity(res.data.name);
      setSearchCity(res.data.name);
    } catch {
      setWeatherError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${API_KEY}&units=metric`);
          setWeather(res.data);
          setCity(res.data.name);
          setSearchCity(res.data.name);
        } catch {
          await loadWeatherByCity(DEFAULT_CITY, 'Weather data is unavailable. Try searching for a city.');
        } finally {
          setLoading(false);
        }
      }, () => loadWeatherByCity(DEFAULT_CITY, 'Weather data is unavailable. Try searching for a city.'), { timeout: 5000, maximumAge: 300000 });
    } else {
      loadWeatherByCity(DEFAULT_CITY, 'Weather data is unavailable. Try searching for a city.');
    }
  }, []);

  const searchWeather = async () => {
    if (!searchCity.trim()) return;
    await loadWeatherByCity(searchCity.trim(), 'City not found. Check the spelling and try again.');
  };

  return (
    <div className="user-home">
      <UserNavbar />
      {/* Weather */}
      <div className="weather-section">
        <h2>Weather Forecast</h2>
        {city && <p style={{color:'#555'}}>Current Location: {city}</p>}
        <div className="weather-search">
          <input value={searchCity} onChange={e=>setSearchCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&searchWeather()} placeholder={city||'Enter city name'} />
          <button onClick={searchWeather}>Search</button>
        </div>
        {loading && <p style={{color:'#666'}}>Detecting location...</p>}
        {weather && (
          <div className="weather-card">
            <div className="weather-card-header">
              <h3>{weather.name}, {weather.sys.country}</h3>
              <div className="weather-desc">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" style={{width:40,height:40}} />
                {weather.weather[0].description.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}
              </div>
            </div>
            <div className="weather-grid">
              <div className="weather-item"><div className="label">Temperature</div><div className="value">{weather.main.temp}°C</div></div>
              <div className="weather-item"><div className="label">Humidity</div><div className="value">{weather.main.humidity}%</div></div>
              <div className="weather-item"><div className="label">Wind Speed</div><div className="value">{weather.wind.speed} m/s</div></div>
              <div className="weather-item"><div className="label">Pressure</div><div className="value">{weather.main.pressure} hPa</div></div>
            </div>
          </div>
        )}
        {weatherError && <p role="alert" style={{color:'#b91c1c',marginTop:20}}>{weatherError}</p>}
        {!weather && !loading && !weatherError && <p style={{color:'#888',marginTop:20}}>Enter a city to see weather data</p>}
      </div>

      {/* Agricultural Info */}
      <div className="agri-info-section">
        <h2>Agricultural Information</h2>
        <div className="crops-grid">
          {cropsData.map(crop => (
            <div className="crop-card" key={crop.id} onClick={()=>navigate(`/crop-info/${crop.id}`)}>
              <img src={crop.imageUrl} alt={crop.name} onError={e=>{e.target.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'}} />
              <div className="crop-card-body">
                <h4>{crop.name}</h4>
                <button className="btn-learn">Learn More ›</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
