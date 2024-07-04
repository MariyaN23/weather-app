import React, {useState} from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState('')
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const fetchWeather = async () => {
        setError(null)
        const apiKey = 'f2e7e1827b1c56c308ec3dc5989015a1'
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            const data = await res.json()
            if (res.ok) {
                setData(data)
                setCity('')
            }
            else {
                setError(data.message)
                setData(null)
            }
        } catch (e: any) {
            setError(e.message)
        }
    }
    return (
        <div className="App">
            <h1>Weather App</h1>
            <input value={city} onChange={(e) => setCity(e.currentTarget.value)} placeholder={'Enter city name'}/>
            <button onClick={fetchWeather}>Get weather</button>
            {error && <div>{error}</div>}
            {data &&
                <div>
                    <div>{data.name}</div>
                    <div>{Math.round(data.main.temp)}°C</div>
                    <div>{data.weather[0].description}</div>
                    <div>{`Wind Speed: ${data.wind.speed} m/s`}</div>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
                </div>
            }
        </div>
    );
}

export default App;