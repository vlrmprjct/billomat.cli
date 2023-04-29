import {
    argValue,
    argRequired,
    fetchAPI,
    table,
} from './../util/index.js';

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
        { value: 'client_number', alias: 'Number', color: 'cyan' },
        { value: 'name', alias: 'Name', formatter: (value) => value.replace(/\\|\n|\r/g, ' ')},
        { value: 'email', alias: 'Email' },
        { value: 'turnover', alias: 'Turnover', align: 'right', color: 'yellow', formatter: (value) => value.toFixed(2) },
        { value: 'archived', alias: 'Archive', align: 'center', color: 'magenta', formatter: (value) => value ? '■' : '' },
        { value: 'updated', alias: 'Changed', formatter: (value) => new Date(value).toLocaleString() },
    ],
    suppliers: [
        { value: 'id', alias: 'ID', color: 'cyan' },
        { value: 'client_number', alias: 'Number', color: 'cyan' },
        { value: 'name', alias: 'Name', formatter: (value) => value.replace(/\\|\n|\r/g, ' ')},
        { value: 'email', alias: 'Email' },
        { value: 'updated', alias: 'Changed', formatter: (value) => new Date(value).toLocaleString() },
    ]
};

const resource = (args, id, token) => {

    const {
        order = argValue(args, '--sort', 'id'),
        page = argValue(args, '--page', '1'),
        type = argValue(args, '--type'),
        size = argValue(args, '--size', '100'),
    } = args;

    if (!argRequired(args, ['--type'], { '--type': ['articles', 'clients', 'suppliers'] })) return;

    fetchAPI(`${type}?order_by=${order}&per_page=${size}&page=${page}`, token, id, (data) => {

        const result = data.length > 0 ? table(data, columns[type]) + '\n' : '\n ❌ No results \n';
        console.log(result);

    });
};

export default resource;
