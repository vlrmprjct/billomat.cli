const argValue = (args, argName, defaultValue) => {
    const argIndex = args.findIndex((arg) => arg === argName);
    if (argIndex !== -1 && argIndex < args.length - 1) {
        return args[argIndex + 1];
    }
    return defaultValue || null;
};

const argRequired = (args, required = []) => {
    if (!required.every(arg => args.includes(arg))) {
        console.log(`\n Error, missing one or more required arguments: ${required.join(', ')}. \n`);
        return false;
    }
    return true;
};

export { argValue, argRequired };
