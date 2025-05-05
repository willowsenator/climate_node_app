const fs = require('fs');

const axios = require('axios');

class Searches {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
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

    get capitalizedHistory() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            return words.join(' ');
        });   
    }
            

    addHistory(place = '') {
        if (this.history.includes(place.toLowerCase())) {
            return;
        }

        this.history = this.history.splice(0, 4);
        this.history.unshift(place.toLowerCase());

        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        }

        const dir = this.dbPath.substring(0, this.dbPath.lastIndexOf('/'));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        }
        // Read the file
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.history = data.history;
        this.history = this.history.map(place => place.toLowerCase());
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
        console.clear();
        console.log('\nCity Information\n'.green);
        console.log('City:', place.name.green);
        console.log('Lat:', place.lat);
        console.log('Lon:', place.lon);
        console.log('Temperature:', weather.temp);
        console.log('Min temperature:', weather.temp_min);
        console.log('Max temperature:', weather.temp_max);
        console.log('Description:', weather.desc.green);
        console.log('Humidity:', weather.humidity);
        console.log('Wind Speed:', weather.wind);
        console.log('Pressure:', weather.pressure);
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
            'pressure': main.pressure,
         }   
        } catch (error) {
            console.log('Error in weather:', error);
        }
    }

}

module.exports = Searches;