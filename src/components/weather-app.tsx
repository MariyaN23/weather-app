import React, {useEffect, useState} from 'react';
import s from './weather-app.module.css'
import searchIcon from '../assets/images/search.svg'
import searchLocation from '../assets/images/location.svg'

const WeatherApp = () => {
    const [city, setCity] = useState(localStorage.getItem('city') || '')
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const searchWeather = async () => {
        await fetchWeather(city)
        localStorage.setItem('city', city);
    }
    const fetchWeather = async (city: string) => {
        setError(null)
        const apiKey = 'f2e7e1827b1c56c308ec3dc5989015a1'
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            const data = await res.json()
            if (res.ok) {
                setData(data)
                setCity('')
            } else {
                setError(data.message)
                setData(null)
            }
        } catch (e: any) {
            setError(e.message)
        }
    }
    useEffect(() => {
        if (city) {
            fetchWeather(city)
        }
    }, [])
    return (
        <div className={s.window}>
            <div className={s.wrapper}>
                <div className={s.inputAndBtnWrapper}>
                    <input className={s.searchInput} value={city} onChange={(e) => setCity(e.currentTarget.value)}
                           placeholder={'Search location'}/>
                    <button onClick={searchWeather} className={s.searchButton}>
                        <img src={searchIcon} alt={'search button'}/>
                    </button>
                </div>
                {error && <div>{error}</div>}
                {data &&
                    <div className={s.resultWrapper}>
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                             alt={'weather-icon'}/>
                        <div className={s.description}>{data.weather[0].description}</div>
                        <div className={s.city}>
                            {data.name}
                            <img src={searchLocation} alt={'location'}/>
                        </div>
                        <div className={s.temperature}>{Math.round(data.main.temp)}°C</div>
                        <table className={s.resultTable}>
                            <thead>
                            <tr>
                                <td>Wind speed</td>
                                <td>Humidity</td>
                                <td>Pressure</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{data.wind.speed}</td>
                                <td>{data.main.humidity}</td>
                                <td>{data.main.pressure}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default WeatherApp;