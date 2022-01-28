import axios from 'axios';
import Vue from 'vue';

const api = axios.create({
    baseURL: "http://localhost:8000/api/"
});

function showSuccess(msg) {
    Vue.toasted.global.showSuccess(msg);
}

function showError(error) {
    if (typeof error == "string") {
        Vue.toasted.global.showError(error);
    } else if (error.response && error.response.data && error.response.data.error) {
        Vue.toasted.global.showError(error.response.data.error);
    } else {
        Vue.toasted.global.showError();
    }
}

export {api, showSuccess, showError};