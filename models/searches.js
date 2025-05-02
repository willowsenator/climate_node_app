const axios = require('axios');

class Searches {
    history = ['Barcelona', 'San Francisco', 'Madrid'];

    constructor() {
        // TODO: Read DB if exists
    }

    get paramsMapbox() {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }



    async city(place = '') {
        console.log('City searched:', place);

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox,
        });

        const resp = await instance.get();
        return resp.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lon: place.center[0],
            lat: place.center[1]
        }));
    }

    showCityInfo(place, weather) {
        console.log('\nCity Information\n'.green);
        console.log('City:', place.name);
        console.log('Lat:', place.lat);
        console.log('Lon:', place.lon);
        console.log('Temperature:', weather.temp);
        console.log('Min temperature:', weather.temp_min);
        console.log('Max temperature:', weather.temp_max);
        console.log('Description:', weather.desc);
        console.log('Humidity:', weather.humidity);
        console.log('Wind Speed:', weather.wind);
        console.log('Feels Like:', weather.feels_like);
    }

    async weather(lat, lon) {
        try {

        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { ...this.paramsWeather, lat, lon }

        });
        const resp = await instance.get();
        const { weather, main, wind } = resp.data;
         return {
            'desc': weather[0].description,
            'humidity': main.humidity,
            'wind': wind.speed,
            'feels_like': main.feels_like,
            'temp': main.temp,
            'temp_min': main.temp_min,
            'temp_max': main.temp_max,
         }   
        } catch (error) {
            console.log('Error in weather:', error);
        }
    }

}

module.exports = Searches;