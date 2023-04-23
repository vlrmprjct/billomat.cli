import fs from 'fs';

const version = () => {

    const packageFile = new URL('./../package.json', import.meta.url).pathname;
    return JSON.parse(fs.readFileSync(packageFile, 'utf-8')).version;

};

export default version;
