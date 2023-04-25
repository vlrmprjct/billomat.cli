
import Table from 'tty-table';
import { fetchAPI } from './../util/index.js';

const options = {
    borderStyle: "solid",
    borderColor: "gray",
    compact: false,
    paddingBottom: 0,
    headerAlign: "center",
    headerColor: "green",
    align: "left",
    color: "white",
    width: "100%"
}

const search = (args, id, token) => {

    const query = args[args.indexOf('--term') + 1];
    const type = args[args.indexOf('--type') + 1];
    const size = (args.indexOf('--size') < 0) ? 50 : args[args.indexOf('--size') + 1];

    const actions = {
        '--term': () => {
            fetchAPI(`search?query=${query}&resource=${type}&per_page=${size}`, token, id, (data) => {
                console.table(
                    data.map(({ id, resource, headline, subline }) => ({
                        ID: id,
                        Type: resource,
                        Headline: headline,
                        Subline: subline,
                    }))
                );

                const t1 = Table(Object.keys(data[0]).map(key => ({ value: key })), data, options).render();
                console.log(t1)

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
