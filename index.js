const {readInput, pause, inquireMenu } = require("./helper/inquirer");
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
                const city = await readInput('City: ');
                await searches.city(city);
               // Show results
               console.log("\nInformation of the city");
               console.log("City:", city);
               console.log("Lat:", 0);
               console.log("Lng:", 0);
               console.log("Temperature:", 0);
               console.log("Min:", 0);
               console.log("Max:", 0);
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