export default {
    namespaced: true,
    state: {
        pedidoSelected: null,
        pedidos: [],
        loading: {
            show: false,
            text: ""
        }
    },
    getters: {
        pedidosEmpty(state) {
            return state.pedidos.length === 0;
        },
        itensPedido(state) {
            return state.pedidoSelected?.itens ?? [];
        }
    },
    mutations: {
        SET_PEDIDO_SELECTED(state, payload) {
            state.pedidoSelected = payload;
        },
        SET_PEDIDOS(state, payload) {
            state.pedidos = payload;
        },
        SET_LOADING(state, payload) {
            state.loading.show = payload.show;
            state.loading.text = payload.show ? payload.text : "";
        },
        RESET_FIELDS(state) {
            state.pedidoSelected = null;
            state.pedidos = [];
        }
    },
    actions: {
        setPedidoSelected(context, payload) {
            context.commit("SET_PEDIDO_SELECTED", payload);
        },
        setPedidos(context, payload) {
            context.commit("SET_PEDIDOS", payload);
        },
        setLoading(context, payload) {
            context.commit("SET_LOADING", payload);
        },
        resetFields(context) {
            context.commit("RESET_FIELDS");
        }
    }
};