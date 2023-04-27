import { fetchAPI, table } from './../util/index.js';

let prevID = '';

const activity = (args, id, token) => {
    fetchAPI(`activity-feed`, token, id, (data) => {

        const columns = [
            { value: 'id', alias: 'ID', color: 'cyan' },
            { value: 'date', alias: 'Date', formatter: (value) => new Date(value).toLocaleString() },
            { value: 'date', alias: 'Timestamp', formatter: (value) => new Date(value).getTime() / 1000, width: 12 },
            { value: 'user_id', alias: 'User', formatter: (value) => value || 'SYS', color: 'yellow' },
            { value: 'resource', alias: 'Type' },
            { value: 'title', alias: 'Title', width: 30 },
            { value: 'text', alias: 'Message', width: 50 },
        ];

        args.forEach((arg) => {
            switch (arg) {
                case '--watch':
                    if (prevID !== data[0].id) {
                        const output = table([data[0]], columns);
                        console.log(data.length > 0 ? output + '\n' : '\n ❌ No results \n');
                        prevID = data[0].id;
                    }
                    break;
                default:
                    if (args.length !== 1) return;
                    const output = table(data, columns);
                    console.log(data.length > 0 ? output + '\n' : '\n ❌ No results \n');
                    break;
            }
        });

    });
};

export default activity;
