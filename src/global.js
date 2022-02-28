import Vue from 'vue';

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

export {showSuccess, showError};