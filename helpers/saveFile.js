import fs from 'fs';

const path = './db/data.json';

const dbSave = (data) => {
    
    fs.writeFileSync(path, JSON.stringify(data));
}

const dbRead = () => {

    if (!fs.existsSync(path)) {
        return null;
    }

    const info = fs.readFileSync(path, { encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}

export { dbSave, dbRead };