import Vue from 'vue';
import Vuex from 'vuex';
import pedidosStore from './modules/pedidosStore';
import produtosStore from './modules/produtosStore';
import categoriasStore from './modules/categoriasStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        pedidos: pedidosStore,
        produtos: produtosStore,
        categorias: categoriasStore
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