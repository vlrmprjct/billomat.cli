import cliSpinners from 'cli-spinners';

const loaderStart = (text = 'Loading ...') => {
    const spinner = cliSpinners['dots'];
    const { frames } = spinner;
    let i = 0;
    const interval = setInterval(() => {
        process.stdout.write('\r\x1b[K');
        process.stdout.write(frames[i = ++i % frames.length] + ' ' + text);
    }, spinner.interval);
    return interval;
};

const loaderStop = (interval) => {
    process.stdout.write('\r\x1b[K');
    clearInterval(interval);
};

export { loaderStart, loaderStop };