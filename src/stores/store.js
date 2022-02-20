import Vue from 'vue';
import Vuex from 'vuex';
import pedidosStore from './modules/pedidosStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        pedidos: pedidosStore
    },
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