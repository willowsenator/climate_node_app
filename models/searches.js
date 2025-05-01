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

    async city (place = '') {
        console.log('City searched:', place);

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox,
        });
            
        const resp = await instance.get();
        console.log(resp.data);
        return []; // TODO: Return city data
    }

}

module.exports = Searches;