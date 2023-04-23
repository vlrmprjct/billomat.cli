import { polling } from './../util/index.js';
import { activity, config, help, search, test } from './../commands/index.js';

const routing = ({ args, command, id, settings, token }) => {

    const watch = (args.indexOf('--watch'));

    const routes = {
        init: () => config(settings),
        activity: () => (watch > 0) ? polling(() => activity(args, id, token), args[watch + 1]) : activity(args, id, token),
        help: () => help(),
        test: () => (watch > 0) ? polling(() => test(args), args[watch + 1]) : test(args),
        search: () => search(args, id, token),
    };

    return routes[command];
};

export default routing;
