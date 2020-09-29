import config from '../config';

const getRestaraunts = () => {
    return fetch(config.apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': config.apiKey
        }
    }).then(res => res.json().then((result) => {
        return result;
    }));
};

export default {
    getRestaraunts
}