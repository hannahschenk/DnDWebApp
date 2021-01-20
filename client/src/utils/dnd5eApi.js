import constants from "./constants";
const axios = require('axios');

module.exports = {
    getRaces: () => {
        return axios.get(constants.RACES_URL);
    },
    getClasses: () => {
        return axios.get(constants.CLASSES_URL);
    },
    getBackgrounds: () => {
        return axios.get(constants.BACKGROUNDS_URL);
    },
    getLanguages: () => {
        return axios.get(constants.LANGUAGES_URL);
    },
    getMoreInfo: (endPoint) => {
        return axios.get(constants.API_BASE_URL + endPoint);
    },
}