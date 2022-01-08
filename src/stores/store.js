import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: true
    },
    mutations: {
        CHANGE_DRAWER(state) {
            state.drawer = !state.drawer;
        }
    },
    actions: {
        changeDrawer(context) {
            context.commit("CHANGE_DRAWER");
        }
    }
})