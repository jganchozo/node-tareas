require('colors');

const mostrarMenu = () => {
    return new Promise((resolve, reject) => {

        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione una opcion'.green);
        console.log('=========================\n'.green);

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Seleccione una opcion: `, (response) => {
            resolve(response);
            readline.close();
        });

    });
}

const pause = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nSeleccione ${'ENTER'.green} para continuar\n`, (response) => {
            readline.close();
            resolve();
        });

    });
}

module.exports = {
    mostrarMenu,
    pause
}