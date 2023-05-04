
import { v4 as uuidv4 } from 'uuid';


class Task {

    id = '';
    description = '';
    completeIn = null;
    
    constructor(description, ) {
        this.id = uuidv4();
        this.description = description;
        this.completeIn = null;
    }
}

export default Task;