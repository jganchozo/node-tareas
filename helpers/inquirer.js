import inquirer from 'inquirer';
//const colors = require('colors');
import colors from 'colors';


const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} Complete tasks list`
            },
            {
                value: '4',
                name: `${'4.'.green} Pending tasks list`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            },
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('========================='.green);
    console.log('  Select an option'.white);
    console.log('=========================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {

    const enter = [
        {
            type: 'input',
            name: 'enter',      
            message: `Seleccione ${'ENTER'.green} para continuar`
        }
    ];

    console.log('\n')
    await inquirer.prompt(enter);
}

const readInput = async (message) => {

    const questions =[
        {
            type: 'input',
            name: 'description',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Please insert a value'
                }
                
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(questions);
    return description;

}

const TasksToDelete = async (tasks = []) => {

    const choices = tasks.map(({ id, description }, index) => {

        const idx = `${index + 1}.`.green;

        return {
            value: id,
            name: `${idx} ${description}`
        }
    });

    choices.unshift({
        value: '0',
        name:  `${'0.'.green} Cancelar`
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ];

    //console.log('\n');
    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirm = async (message) => {
    
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const TasksToCompleteCheckList = async (tasks = []) => {

    const choices = tasks.map(({ id, description, completeIn }, index) => {

        const idx = `${index + 1}.`.green;

        return {
            value: id,
            name: `${idx} ${description}`,
            checked: completeIn ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];

    //console.log('\n');
    const {ids} = await inquirer.prompt(questions);
    return ids;
}

export {
    inquirerMenu,
    pause,
    readInput,
    TasksToDelete,
    confirm,
    TasksToCompleteCheckList
}