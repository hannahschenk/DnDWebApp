import constants from "./constants";
const axios = require('axios');

module.exports = {
    getRaces: () => {
        return axios.get(constants.RACES_URL);
    },
    getMoreInfo:(endPoint) => {
        return axios.get(constants.API_BASE_URL + endPoint);
    }
}