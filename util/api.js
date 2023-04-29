import fetch from 'node-fetch';
import { colorize, loaderStart, loaderStop } from './index.js';

const API_URL = process.env.NODE_ENV === 'development' ? 'billodev' : 'billomat';

const fetchAPI = async (endpoint, token, id, callback, options = {}) => {

    const loaderInterval = loaderStart();

    const mapOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-BillomatApiKey': token,
        },
        ...options,
    };

    try {
        const response = await fetch(`https://${id}.${API_URL}.net/api/v2/${endpoint}`, mapOptions);

        if (response.status !== 200) {
            loaderStop(loaderInterval);
            console.log(colorize(`\n ${response.status} : ${response.statusText} \n`, 'red'));
            return;
        }

        const data = await response.json();
        loaderStop(loaderInterval);

        return callback(data, response);
    } catch (error) {
        throw error;
    }
};

export default fetchAPI;
