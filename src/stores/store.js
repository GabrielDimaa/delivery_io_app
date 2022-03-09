import Vue from 'vue';
import Vuex from 'vuex';
import pedidosStore from './modules/pedidosStore';
import produtosStore from './modules/produtosStore';
import categoriasStore from './modules/categoriasStore';
import complementosStore from './modules/complementosStore';
import loginStore from './modules/loginStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        pedidos: pedidosStore,
        produtos: produtosStore,
        categorias: categoriasStore,
        complementos: complementosStore,
        login: loginStore
    },
    state: {
        drawer: true,
        showNotification: false
    },
    mutations: {
        CHANGE_DRAWER(state) {
            state.drawer = !state.drawer;
        },
        SET_SHOW_NOTIFICATION(state, payload) {
            state.showNotification = payload;

            if (payload) {
                setTimeout(() => {
                    state.showNotification = false;
                }, 8000);
            }
        }
    },
    actions: {
        changeDrawer(context) {
            context.commit("CHANGE_DRAWER");
        },
        setShowNotification(context, payload) {
            context.commit("SET_SHOW_NOTIFICATION", payload);
        }
    }
})