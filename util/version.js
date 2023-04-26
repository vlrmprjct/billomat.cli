import fs from 'fs';
import path from 'path';

const version = () => {

    const packageFile = path.join(process.cwd(), './package.json');
    return JSON.parse(fs.readFileSync(packageFile, 'utf-8')).version;

};

export default version;
