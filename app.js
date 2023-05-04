import colors from 'colors';
import { TasksToDelete, inquirerMenu, pause, readInput, confirm, TasksToCompleteCheckList } from './helpers/inquirer.js';
import Tasks from './models/Tasks.js';
import { dbSave, dbRead } from './helpers/saveFile.js';




const main = async () => {

    let option = '';

    const tasks = new Tasks();

    const dbTasks = dbRead();

    if (dbTasks) {
        tasks.loadTasksFromArr(dbTasks);
    }

    do {
        
        option = await inquirerMenu();
        
        switch (option) {
            case '1':
                const description = await readInput('Description:');
                tasks.createTask(description);
                break;
            case '2':
                tasks.completeList();
                break;
            case '3':
                tasks.completeAndPendingTasks(true);
                break;
            case '4':
                tasks.completeAndPendingTasks(false);
                break;
            case '5':
                const ids = await TasksToCompleteCheckList(tasks.arrList);
                tasks.toggleComplete(ids);
                break;
            case '6':
                const id = await TasksToDelete(tasks.arrList);
                
                if (id !== '0') {
                    const yesOrNot = await confirm(`Are you sure?`);

                    yesOrNot && tasks.deleteTask(id);
                    yesOrNot && console.log('Deleted task')
                }
                
                break;
        }

        dbSave(tasks.arrList);

        await pause();

    } while (option !== '0');

}

main();

