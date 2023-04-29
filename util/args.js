const argValue = (args, argName, defaultValue) => {
    const argIndex = args.findIndex((arg) => arg === argName);
    if (argIndex !== -1 && argIndex < args.length - 1) {
        return args[argIndex + 1];
    }
    return defaultValue || null;
};

const argRequired = (args, required = [], allowedValues = {}) =>
    required.reduce((isValid, arg) => {
        const hasArg = args.includes(arg);
        const invalidValues = allowedValues[arg]
            ? args.includes(arg) && !allowedValues[arg].includes(args[args.indexOf(arg) + 1])
            : false;

        if (!hasArg) {
            console.log(`\nError: Missing required argument '${arg}'\n`);
            return false;
        }

        if (invalidValues) {
            console.log(`\nError: Invalid value for argument '${arg}'\n`);
            return false;
        }

        return isValid;
    }, true);

export { argValue, argRequired };
