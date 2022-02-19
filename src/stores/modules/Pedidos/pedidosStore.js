import StatusPedido from "../../../enums/statusPedido";
import TipoEntrega from "../../../enums/tipoEntrega";

export default {
    namespaced: true,
    state: {
        pedidoSelected: null,
        pedidos: [],
        filtroPedidos: null,
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
        proximoStatus(state) {
            switch (state.pedidoSelected.status) {
                case StatusPedido.EmAberto:
                    return StatusPedido.Aceito;
                case StatusPedido.Aceito:
                    if (state.pedidoSelected.tipoEntrega === TipoEntrega.Entrega)
                        return StatusPedido.EmRotaDeEntrega
                    else
                        return StatusPedido.ProntoParaRetirada;
                case StatusPedido.EmRotaDeEntrega:
                case StatusPedido.ProntoParaRetirada:
                    return StatusPedido.Finalizado;
                default:
                    return null;
            }
        },
        descricaoAcaoProximoStatus(state, getter) {
            switch (getter.proximoStatus) {
                case StatusPedido.Aceito:
                    return "Aceitar";
                case StatusPedido.EmRotaDeEntrega:
                    return "Sair para entrega";
                case StatusPedido.ProntoParaRetirada:
                    return "Pronto para retirada";
                case StatusPedido.Finalizado:
                    return "Finalizar";
                default:
                    return null;
            }
        },
        hideButtonCancelar(state) {
            return state.pedidoSelected.status === StatusPedido.Finalizado || state.pedidoSelected.status === StatusPedido.Cancelado;
        }
    },
    mutations: {
        SET_PEDIDO_SELECTED(state, payload) {
            state.pedidoSelected = payload;
        },
        SET_PEDIDOS(state, payload) {
            state.pedidos = payload;
        },
        SET_FILTRO_PEDIDOS(state, payload) {
            state.filtroPedidos = payload;
        },
        SET_LOADING(state, payload) {
            state.loading.show = payload.show;
            state.loading.text = payload.show ? payload.text : "";
        },
        RESET_FIELDS(state) {
            state.pedidoSelected = null;
            state.pedidos = [];
            state.filtroPedidos = null;
        }
    },
    actions: {
        setPedidoSelected(context, payload) {
            context.commit("SET_PEDIDO_SELECTED", payload);
        },
        setPedidos(context, payload) {
            context.commit("SET_PEDIDOS", payload);
        },
        setFiltroPedidos(context, payload) {
            context.commit("SET_FILTRO_PEDIDOS", payload);
        },
        setLoading(context, payload) {
            context.commit("SET_LOADING", payload);
        },
        resetFields(context) {
            context.commit("RESET_FIELDS");
        }
    }
};