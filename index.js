const { pause, inquireMenu } = require("./helper/inquirer")

const main = async () => {
    let opt = '';
    do {
        opt = await inquireMenu();
        console.log({ opt });
        await pause();
    } while (opt !== 0);
}

main()