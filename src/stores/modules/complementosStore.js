import ComplementoModel from "../../models/complementoModel";
import CategoriaModel from "../../models/categoriaModel";

export default {
    namespaced: true,
    state: {
        complemento: new ComplementoModel(),
        complementos: [],
        categoria: new CategoriaModel(),
        categorias: [],
        loading: {
            show: false,
            text: ""
        },
        loadingForm: false
    },
    getters: {
        titleForm(state) {
            return (state.produto?.idProduto ?? false) ? "Alterar complemento" : "Cadastrar complemento";
        },
        complementosEmpty(state) {
            return state.complementos.length === 0;
        }
    },
    mutations: {
        SET_COMPLEMENTO(state, payload) {
            state.complemento = payload;
        },
        SET_COMPLEMENTOS(state, payload) {
            state.complementos = payload;
        },
        SET_CATEGORIA(state, payload) {
            state.categoria = payload;
        },
        SET_CATEGORIAS(state, payload) {
            state.categorias = payload;
        },
        RESET_FIELDS(state) {
            state.complemento = new ComplementoModel();
        },
        SET_LOADING(state, payload) {
            state.loading.show = (payload?.show ?? false);
            state.loading.text = payload.show ? payload.text : "";
        },
        SET_LOADING_FORM(state, payload) {
            state.loadingForm = payload;
        }
    },
    actions: {
        setComplemento(context, payload) {
            context.commit("SET_COMPLEMENTO", payload);
        },
        setComplementos(context, payload) {
            context.commit("SET_COMPLEMENTOS", payload);
        },
        setCategoria(context, payload) {
            context.commit("SET_CATEGORIA", payload);
        },
        setCategorias(context, payload) {
            context.commit("SET_CATEGORIAS", payload);
        },
        resetFields(context) {
            context.commit("RESET_FIELDS");
        },
        setLoading(context, payload) {
            context.commit("SET_LOADING", payload);
        },
        setLoadingForm(context, payload) {
            context.commit("SET_LOADING_FORM", payload);
        }
    }
};