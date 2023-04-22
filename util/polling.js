const polling = (callback, interval = 15000) => {

    if (interval < 3000) {
        console.error('Interval cannot be lower than 3000ms');
        return;
    }

    console.log('Polling started, press CTRL+C to stop.');

    const pollInterval = setInterval(() => {
        callback();
    }, interval);


    process.on('SIGINT', () => {
        clearInterval(pollInterval);
        console.log('\nPolling stopped.');
    });
};

export default polling;
