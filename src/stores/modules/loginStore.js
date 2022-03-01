import ProdutoModel from "../../models/LoginModel";

export default {
    namespaced: true,
    state: {
        login: new LoginModel(),
        loading: {
            show: false,
            text: ""
        }
    },
    mutations: {
        SET_LOGIN(state, payload) {
            state.login = payload;
        },
        RESET_FIELDS(state) {
            state.login = new LoginModel();
        },
        SET_LOADING(state, payload) {
            state.loading.show = (payload?.show ?? false);
            state.loading.text = payload.show ? payload.text : "";
        }
    },
    actions: {
        setLogin(context, payload) {
            context.commit("SET_LOGIN", payload);
        },
        resetFields(context) {
            context.commit("RESET_FIELDS");
        },
        setLoading(context, payload) {
            context.commit("SET_LOADING", payload);
        }
    }
};