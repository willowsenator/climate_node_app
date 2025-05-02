const { readInput, pause, inquireMenu, listPlaces } = require("./helper/inquirer");
const Searches = require("./models/searches");
require('dotenv').config();

const main = async () => {
    let opt = '';
    const searches = new Searches();
    do {


        opt = await inquireMenu();
        switch (opt) {
            case 1:
                // Show Cities
                const term = await readInput('City: ');
                const places = await searches.city(term);
                const id = await listPlaces(places);
                
                searches.showCityInfo(places.find(p => p.id === id));

                break;

            case 2:
                // Show history                    
                break;
        }

        console.log({ opt });
        await pause();
    } while (opt !== 0);
}

main()