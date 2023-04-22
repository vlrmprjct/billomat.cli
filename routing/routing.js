import { polling } from './../util/index.js';
import { activity, config, test } from './../commands/index.js';

const routing = ({ args, command, id, settings, token }) => {

    const watch = (args.indexOf('--watch'));

    const routes = {
        init: () => config(settings),
        activity: () => (watch > 0) ? polling(() => activity(args, id, token), args[watch + 1]) : activity(args, id, token),
        test: () => (watch > 0) ? polling(() => test(args), args[watch + 1]) : test(args),
    };

    return routes[command];
};

export default routing;