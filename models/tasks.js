import Task from "./task.js";
import colors from 'colors';

class Tasks {

    _taskslist = {};

    get arrList() {
        
        const list = [];

        Object.keys(this._taskslist).map(key => {
            const task = this._taskslist[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._taskslist = {};
    }
    
    deleteTask(id = ''){

        if (this._taskslist[id]) {
            delete this._taskslist[id];
        }
    }

    loadTasksFromArr(tasks = []){

        tasks.map(task => {
            this._taskslist[task.id] = task;
        });

    }

    createTask(description = '') {

        const task = new Task(description);
        this._taskslist[task.id] = task;
    }

    completeList(){
        console.log('\n');
        this.arrList.map((item, index) => {
            const idx = `${index + 1}.`;
            const { description, completeIn } = item;
            console.log(`${colors.green(idx)} ${description} :: ${completeIn !== null ? 'Completed'.green : 'Pending'.red}`);
        });
    }

    completeAndPendingTasks(complete = true) {

        console.log('\n');

        this.arrList
            .filter(t => complete ? t.completeIn : !t.completeIn)
            .map((item, index) => {

                const idx = `${index + 1}.`.green;
                const { description, completeIn } = item;
                const estado = (completeIn)
                    ? completeIn.toString().green
                    : 'Pending'.red;
                
                console.log(`${idx} ${description} :: ${estado}`);

            });

    }

    toggleComplete(ids = []){

        ids.map(id => {

            const task = this._taskslist[id];
            if (!task.completeIn) {
                task.completeIn = new Date().toISOString();
            }
        });

        this.arrList.map(({ id }) => {
            if (!ids.includes(id)) {
                const task = this._taskslist[id];
                task.completeIn = null;
            }
        });
    }

}

export default Tasks;