const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`
            },
            {
                value: 2,
                name: `${'2.'.green} History`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    }
]

const inquireMenu = async () => {
    console.clear();

    console.log('=========================='.white);
    console.log('   Select an option'.white);
    console.log('==========================\n'.white);

    const prompt = inquirer.createPromptModule();
    const { option } = await prompt(questions);
    return option;
}

const pause = async () => {
    const prompt = inquirer.createPromptModule();
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.blue} to continue`
        }
    ]
    console.log('\n');
    await prompt(question);
}

const readInput = async (message) => {
    const prompt = inquirer.createPromptModule();
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ]
    const { desc } = await prompt(question);
    return desc;
}

const confirm = async (message) => {
    const prompt = inquirer.createPromptModule();
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await prompt(question);
    return ok;
}

const listPlaces = async (places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a place:',
            choices
        }
    ]
    const prompt = inquirer.createPromptModule();

    const { id } = await prompt(questions);
    return id;
}

const showCheckList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: (task.completedDate) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]
    const prompt = inquirer.createPromptModule();
    const { ids } = await prompt(question);
    return ids;
}

module.exports = {
    inquireMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showCheckList
}