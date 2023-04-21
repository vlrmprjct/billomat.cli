import fetch from 'node-fetch';
import config from './config.js';
import polling from './polling.js';

let prevId = '';

const test = (args) => {
    console.log(new Date().toLocaleString())
}

const feed = (args, id, token) => {

    process.stdout.write('Loading...\r');

    fetch(`https://${id}.billodev.net/api/v2/activity-feed`, {
        headers: {
            'X-BillomatApiKey': token,
        }
    })
        .then(response => response.json())
        .then(data => {
            const { id, date, resource, title, text, user_id } = data[0];
            if (prevId !== id) {
                console.table({
                    ID: id,
                    Date: new Date(date).toLocaleString(),
                    Type: resource,
                    Title: title,
                    Message: text,
                    User: parseInt(user_id, 10),
                });
                prevId = id;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

const routing = ({ args, command, id, settings, token }) => {

    const watch = (args.indexOf('--watch'));

    const routes = {
        init: () => config(settings),
        feed: () => (watch > 0) ? polling(() => feed(args, id, token), args[watch + 1]) : feed(args, id, token),
        test: () => (watch > 0) ? polling(() => test(args), args[watch + 1]) : test(args),
    };

    return routes[command];
};

export default routing;
