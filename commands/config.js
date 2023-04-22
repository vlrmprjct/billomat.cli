import fs from 'fs';
import { promisify } from 'util';
import prompt from 'prompt-sync'
import { colorize } from './../util/index.js';

const config = (settingsFile) => {

    const writeFile = promisify(fs.writeFile);
    const promptSync = prompt();

    (async () => {

        console.log('');
        const token = promptSync(colorize('Enter your API Key: '));
        const id = promptSync(colorize('Enter your Billomat ID: '));
        const data = { id, token };

        try {
            await writeFile(settingsFile, JSON.stringify(data));
            console.log('');
            console.log(colorize('Settings saved', 'brightGreen'));
            process.exit(1);
        } catch (error) {
            console.log('');
            console.error(colorize('Error saving settings', 'brightRed'));
            process.exit(1);
        }
    })();
}

export default config;

