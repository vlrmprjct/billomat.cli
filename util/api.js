import fetch from 'node-fetch';
import { loaderStart, loaderStop } from './loader.js';

const API_URL = process.env.NODE_ENV === 'development' ? 'billodev' : 'billomat';

const fetchAPI = async (apiUrl, token, id, callback, options = {}) => {

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
        const response = await fetch(`https://${id}.${API_URL}.net/api/v2/${apiUrl}`, mapOptions);

        if (response.status !== 200) {
            loaderStop(loaderInterval);
            console.log(response.statusText);
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
