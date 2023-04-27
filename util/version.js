import fs from 'fs';
import { getAbsolutePath } from 'esm-path'

const version = () => {

    const packageFile = getAbsolutePath(import.meta.url, '../package.json')
    return JSON.parse(fs.readFileSync(packageFile, 'utf-8')).version;

};

export default version;
