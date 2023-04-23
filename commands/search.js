import { fetchAPI } from './../util/index.js';

const search = (args, id, token) => {

    const query = args[args.indexOf('--term') + 1];

    const actions = {
        '--term': () => {

            const filterIndex = args.indexOf('--type');
            const filter = filterIndex !== -1 ? args[filterIndex + 1] : null;

            fetchAPI(`search?query=${query}`, token, id, (data) => {
                const filteredData = data.filter(obj => obj.resource === filter);
                console.table(
                    (filteredData.length ? filteredData : data).map(({ id, resource, headline, subline }) => ({
                        ID: id,
                        Resource: resource,
                        Headline: headline,
                        Subline: subline,
                    }))
                );
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
