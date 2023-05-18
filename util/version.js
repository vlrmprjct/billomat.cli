import fs from 'fs';
import { execSync } from 'child_process';
import { getAbsolutePath } from 'esm-path'

const versionCheck = () => {
    const packageFile = getAbsolutePath(import.meta.url, '../package.json');
    const packageName = JSON.parse(fs.readFileSync(packageFile, 'utf-8')).name;
    const cmd = `npm view ${packageName} version`;
    return execSync(cmd, { encoding: 'utf8' }).trim();
}

const version = () => {
    const packageFile = getAbsolutePath(import.meta.url, '../package.json');
    return JSON.parse(fs.readFileSync(packageFile, 'utf-8')).version;
};

export { version, versionCheck };
