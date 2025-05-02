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
            lng: place.center[0],
            lat: place.center[1]
        }));
    }

    showCityInfo(place) {
        console.log('\nCity Information\n'.green);
        console.log('City:', place.name);
        console.log('Lat:', place.lat);
        console.log('Lng:', place.lng);
    }

}

module.exports = Searches;