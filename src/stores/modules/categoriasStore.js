import SubcategoriaModel from "../../models/subcategoriaModel";
import CategoriaModel from "../../models/categoriaModel";

export default {
    namespaced: true,
    state: {
        categoria: new CategoriaModel(),
        categorias: [],
        subcategoria: new SubcategoriaModel(),
        subcategorias: [],
        loading: {
            show: false,
            text: ""
        },
        loadingForm: false
    },
    getters: {
        titleForm(state) {
            return (state.categoria?.idCategoria ?? false) ? "Alterar categoria" : "Cadastrar categoria";
        },
        hideDataTable(state) {
            return state.categorias.length === 0;
        }
    },
    mutations: {
        SET_CATEGORIA(state, payload) {
            state.categoria = payload;
        },
        SET_CATEGORIAS(state, payload) {
            state.categorias = payload;
        },
        SET_SUBCATEGORIA(state, payload) {
            state.subcategoria = payload;
        },
        SET_SUBCATEGORIAS(state, payload) {
            state.subcategorias = payload;
        },
        RESET_FIELDS(state) {
            state.categoria = new CategoriaModel();
            state.subcategoria = new SubcategoriaModel();
            state.subcategorias = [];
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
        setCategoria(context, payload) {
            context.commit("SET_CATEGORIA", payload);
        },
        setCategorias(context, payload) {
            context.commit("SET_CATEGORIAS", payload);
        },
        setSubcategoria(context, payload) {
            context.commit("SET_SUBCATEGORIA", payload);
        },
        setSubcategorias(context, payload) {
            context.commit("SET_SUBCATEGORIAS", payload);
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