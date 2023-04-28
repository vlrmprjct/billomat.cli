import { fetchAPI, table } from './../util/index.js';

const resource = (args, id, token) => {

    const {
        query = args[args.indexOf('--term') + 1],
        type = args[args.indexOf('--type') + 1],
        size = args[args.indexOf('--size') + 1],
    } = args;

    console.log(args);

    fetchAPI(type, token, id, (data) => {

        const columns2 = [data[0]].map((x, i) => {
            console.log(x)
        })

        columns2;

        const columns = {
            articles: [
                { value: 'id', alias: 'ID', color: 'cyan' },
                { value: 'date', alias: 'Date', formatter: (value) => new Date(value).toLocaleString() },
                { value: 'date', alias: 'Timestamp', formatter: (value) => new Date(value).getTime() / 1000, width: 12 },
                { value: 'user_id', alias: 'User', formatter: (value) => value || 'SYS', color: 'yellow' },
                { value: 'resource', alias: 'Type' },
                { value: 'title', alias: 'Title', width: 30 },
                { value: 'text', alias: 'Message', width: 50 },
            ],
            clients: [
                { value: 'id', alias: 'ID', color: 'red' },
                { value: 'date', alias: 'Date', formatter: (value) => new Date(value).toLocaleString() },
                { value: 'date', alias: 'Timestamp', formatter: (value) => new Date(value).getTime() / 1000, width: 12 },
                { value: 'user_id', alias: 'User', formatter: (value) => value || 'SYS', color: 'yellow' },
                { value: 'resource', alias: 'Type' },
                { value: 'title', alias: 'Title', width: 30 },
                { value: 'text', alias: 'Message', width: 50 },
            ]
        };

        const output = table(data, columns[type]);
        console.log(data.length > 0 ? output + '\n' : '\n ❌ No results \n');

        console.log('Count: ', data.length + '\n');

    });
};

export default resource;
