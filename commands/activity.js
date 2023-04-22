import { fetchAPI } from './../util/index.js';

let prevID = '';

const activity = (args, id, token) => {
    fetchAPI(`activity-feed`, token, id, (data) => {

        args.forEach((arg) => {
            switch (arg) {
                case '--watch':
                    if (prevID !== data[0].id) {
                        console.table(
                            [data[0]].map(({ id, date, resource, title, text, user_id }) => ({
                                ID: id,
                                Date: new Date(date).toLocaleString(),
                                Timestamp: new Date(date).getTime() / 1000,
                                Type: resource,
                                Title: title,
                                Message: text,
                                User: parseInt(user_id, 10),
                            }))
                        );
                        prevID = data[0].id;
                    }
                    break;
                default:
                    if (args.length !== 1) return;
                    console.table(
                        data.map(({ id, date, resource, title, text, user_id }) => ({
                            ID: id,
                            Date: new Date(date).toLocaleString(),
                            Timestamp: new Date(date).getTime() / 1000,
                            Type: resource,
                            Title: title,
                            Message: text,
                            User: parseInt(user_id, 10),
                        }))
                    );
                    break;
            }
        });

    });
};

export default activity;
