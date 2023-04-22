const fetchAPI = async (apiUrl, token, id, callback, options = {}) => {

    const mapOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-BillomatApiKey': token,
        },
        ...options,
    };

    try {
        const response = await fetch(`https://${id}.billodev.net/api/v2/${apiUrl}`, mapOptions);
        if (response.status !== 200) {
            console.log(response.statusText);
            return;
        }
        const data = await response.json();
        return callback(data, response);
    } catch (error) {
        throw error;
    }
};

export default fetchAPI;
