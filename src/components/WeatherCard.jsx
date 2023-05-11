import {useState, useEffect} from 'react'
import axios from 'axios'
import geolocation from './GetLocation'


const WeatherCard = () => {
    
    


    const [infoWeather, setInfoWeather] = useState({})
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=a60cf4bafb0b0ed17a7835e28541fa7e` 
    let urlLat = '&lat='
    let urlLon = '&lon='
    let urlWeatherComplete = ''
    let urlUnits = '&units=metric'
    let urlLanguage = '&lang=sp'
    
    // funcion para obtener la localización del usuario

    geolocation.getCurrentLocation()
        .then(location => {
            urlWeatherComplete = urlWeather + urlLat + location.latitude + urlLon + location.longitude + urlUnits + urlLanguage
        })


    useEffect(() => {
        axios
            .get(urlWeatherComplete)
            .then( (resp) => {
                console.log(resp)
                setInfoWeather(resp.data)
            })
            .catch( error => console.error(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
      
    // funciones para cambiar de celsius a fahrenheit

    return (        
        <div className='card__latlon'>
            <div className='card'>
                <div>
                <h2>{Math.floor(infoWeather.main?.temp)}°C</h2>
                <div>
                {infoWeather.weather && (<img src={`https://openweathermap.org/img/wn/${infoWeather.weather[0].icon}@4x.png`} alt="img-climate" />)}
                </div>
                <h3>{infoWeather.name}</h3>
                <h3>{infoWeather.sys?.country}</h3>
                <h3>{infoWeather.weather && infoWeather.weather[0].description}</h3>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard;