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
        },
        enderecoClienteDisplay(state) {
            const p = state.pedidoSelected;
            return `${p.rua}, ${p.numero}, ${p.bairro}, ${p.complemento != null ? p.complemento + ", " : ""}${p.cidade}`;
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
        }
    }
};