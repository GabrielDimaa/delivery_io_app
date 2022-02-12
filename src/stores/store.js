import Vue from 'vue';
import Vuex from 'vuex';
import pedidos_store from './modules/Pedidos/pedidos_store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        pedidos: pedidos_store
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