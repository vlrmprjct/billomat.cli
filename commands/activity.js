import { fetchAPI} from './../util/index.js';

let prevId = '';

const activity = (args, id, token) => {

    fetchAPI(`activity-feed`, token, id, (data) => {

        args.forEach((arg) => {
            switch (arg) {
                case '--watch':
                    if (prevId !== data[0].id) {
                        console.table({
                            ID: data[0].id,
                            Date: new Date(data[0].date).toLocaleString(),
                            Type: data[0].resource,
                            Title: data[0].title,
                            Message: data[0].text,
                            User: parseInt(data[0].user_id, 10),
                        });
                        prevId = data[0].id;
                    }
                    break;
                default:
                    if (args.length !== 1) return;
                    data.map(({ id, date, resource, title, text, user_id }) => {
                        console.table({
                            ID: id,
                            Date: new Date(date).toLocaleString(),
                            Type: resource,
                            Title: title,
                            Message: text,
                            User: parseInt(user_id, 10),
                        });
                    });
                    break;
            }
        });

    });
};

export default activity;
