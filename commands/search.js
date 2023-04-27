import { fetchAPI, table } from './../util/index.js';

const search = (args, id, token) => {

    const {
        query = args[args.indexOf('--term') + 1],
        type = args[args.indexOf('--type') + 1],
        size = (args.indexOf('--size') < 0) ? 50 : args[args.indexOf('--size') + 1],
    } = args;

    const actions = {
        '--term': () => {
            fetchAPI(`search?query=${query}&resource=${type}&per_page=${size}`, token, id, (data) => {
                const columns = [
                    { value: 'id', alias: 'ID', color: 'cyan' },
                    { value: 'resource', alias: 'Type'},
                    { value: 'headline', alias: 'Number', width: 30, formatter: (value) => value.replace('[', '').split(']')[0] || ''},
                    { value: 'headline', alias: 'Description', width: 30, formatter: (value) => value.replace('[', '').split(']')[1] || ''},
                    { value: 'subline', alias: 'Excerpt', width: 30, }
                ];
                const output = table(data, columns);
                console.log(data.length > 0 ? output + '\n' : '\n ❌ No results \n');
            });
        },
    };

    const argKeys = Object.keys(actions);
    args.filter(arg => argKeys.includes(arg)).forEach(arg => actions[arg]());

    const requiredArgs = ['--term'];
    if (!args.some(arg => requiredArgs.includes(arg))) {
        console.log(`Error: Missing required argument '${requiredArgs[0]}'.`);
        return;
    }
};

export default search;
