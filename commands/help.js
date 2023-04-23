import { version } from './../util/index.js';

const commands = [
    {
        name: 'init',
        description: 'initialize cli',
        arguments: [],
    },
    {
        name: 'activity',
        description: 'show activity feed',
        arguments: [
            { name: '--watch', description: 'polls the activity feed, default 15sec' },
            { name: '--watch <interval>', description: 'set poll interval in milliseconds' },
        ],
    },
    {
        name: 'search',
        description: 'search across documents',
        arguments: [
            { name: '--term <term*>', description: 'required*, provided search term' },
            { name: '--type <type>', description: 'type of document' },
        ],
    },
    {
        name: 'help',
        description: 'this command',
        arguments: [],
    },
];

const help = () => {
    console.log('');
    console.log('Billomat CLI Version:', version());
    console.log('');
    console.log('Usage: billcli [command] [--arguments [term]]');
    console.log('');
    console.log('Commands:');
    console.log('');
    commands.forEach(command => {
        const cmd = `  ${command.name}`.padEnd(34, ' ');
        console.log(`${cmd}${command.description}`);
        command.arguments.forEach(arg => {
            console.log(`    ${arg.name.padEnd(30, ' ')}${arg.description}`);
        });
        console.log('');
    });
};

export default help;
