import { fetchAPI, table } from './../util/index.js';

const columns = {
    articles: [
        { value: 'id', alias: 'ID', color: 'cyan' },
        { value: 'article_number', alias: 'Number', color: 'cyan' },
        { value: 'title', alias: 'Title', width: 30 },
        { value: 'description', alias: 'Description', width: 50 },
        { value: 'turnover', alias: 'Turnover', align: 'right', color: 'yellow', formatter: (value) => value.toFixed(2) },
        { value: 'archived', alias: 'Archive', align: 'center', color: 'magenta', formatter: (value) => value ? '■' : '' },
        { value: 'updated', alias: 'Changed', formatter: (value) => new Date(value).toLocaleString() },
    ],
    clients: [
        { value: 'id', alias: 'ID', color: 'cyan' },
    ]
};

const resource = (args, id, token) => {

    const {
        order = args[args.indexOf('--order') + 1],
        type = args[args.indexOf('--type') + 1],
        size = args[args.indexOf('--size') + 1],
    } = args;

    fetchAPI(`${type}?order_by=${order}&per_page=${size}`, token, id, (data) => {

        const output = table(data, columns[type]);
        console.log(data.length > 0 ? output + '\n' : '\n ❌ No results \n');

        console.log('Count: ', data.length + '\n');

    });
};

export default resource;
