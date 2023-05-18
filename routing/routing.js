import { polling, version, versionCheck } from './../util/index.js';
import { activity, config, help, resource, search, test } from './../commands/index.js';

const routing = ({ args, command, id, settings, token }) => {

    const watch = (args.indexOf('--watch'));
    const versioncheck = (args.indexOf('--check'));

    const routes = {
        init: () => config(settings),
        activity: () => (watch > 0) ? polling(() => activity(args, id, token), args[watch + 1]) : activity(args, id, token),
        help: () => help(),
        resource: () => resource(args, id, token),
        test: () => (watch > 0) ? polling(() => test(args), args[watch + 1]) : test(args),
        search: () => search(args, id, token),
        version: () => (versioncheck > 0) ? console.log('Available Remote Version:', versionCheck()) : console.log(version()),
    };

    return routes[command] || help();
};

export default routing;
