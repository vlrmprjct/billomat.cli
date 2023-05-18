import { version, versionCheck } from './../util/index.js';

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
            { name: '--size <amount | 50>', description: 'amount of listed results' },
        ],
    },
    {
        name: 'resource',
        description: 'list documents by type',
        arguments: [
            { name: '--type <type>', description: 'type of document' },
            { name: '--page <int>', description: 'page of resultset' },
            { name: '--size <amount | 50>', description: 'amount of listed results' },
            { name: '--sort <sort>', description: 'column sort (same as API)' },
            { name: '--desc', description: 'reverse column order direction' },
        ],
    },
    {
        name: 'version',
        description: 'show current version',
        arguments: [
            { name: '--check', description: 'Check available package version @ npm' },
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
    console.log('Billomat CLI Version:', version() );
    console.log('');
    console.log('Usage: clib [command] [--key value]');
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
