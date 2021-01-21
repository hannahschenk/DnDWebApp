import constants from "./constants";
const axios = require('axios');

module.exports = {
    getRaces: () => {
        return axios.get(constants.RACES_URL);
    },
    getClasses: () => {
        return axios.get(constants.CLASSES_URL);
    },
    getMoreInfo:(endPoint) => {
        return axios.get(constants.API_BASE_URL + endPoint);
    },
    getStartingEquipment:(chosenClass) => {
        return axios.get(constants.API_BASE_URL + '/starting-equipment/'+ chosenClass);
    },
}