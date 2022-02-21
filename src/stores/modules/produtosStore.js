import ProdutoModel from "../../models/produtoModel";
import CategoriaModel from "../../models/categoriaModel";
import SubcategoriaModel from "../../models/subcategoriaModel";

export default {
    namespaced: true,
    state: {
        produto: new ProdutoModel(),
        produtos: [],
        categoria: new CategoriaModel(),
        categorias: [],
        subcategoria: null,
        loading: {
            show: false,
            text: ""
        },
        loadingForm: false
    },
    getters: {
        titleForm(state) {
            return (state.produto?.idProduto ?? false) ? "Alterar produto" : "Cadastrar produto";
        },
        disableFieldSubcategoria(state) {
            return state.loadingForm || !(state.categoria?.idCategoria ?? false);
        },
        subcategorias(state) {
            return state.categoria?.subcategorias ?? [];
        },
        produtosEmpty(state) {
            return state.produtos.length === 0;
        }
    },
    mutations: {
        SET_PRODUTO(state, payload) {
            state.produto = payload;
        },
        SET_PRODUTOS(state, payload) {
            state.produtos = payload;
        },
        SET_CATEGORIA(state, payload) {
            state.categoria = payload;
        },
        SET_CATEGORIAS(state, payload) {
            state.categorias = payload;
        },
        SET_SUBCATEGORIA(state, payload) {
            state.subcategoria = payload;
        },
        RESET_FIELDS(state) {
            state.produto = new ProdutoModel();
            state.categoria = new CategoriaModel();
            state.subcategoria = new SubcategoriaModel();
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
        setProduto(context, payload) {
            context.commit("SET_PRODUTO", payload);
        },
        setProdutos(context, payload) {
            context.commit("SET_PRODUTOS", payload);
        },
        setCategoria(context, payload) {
            context.commit("SET_CATEGORIA", payload);
        },
        setCategorias(context, payload) {
            context.commit("SET_CATEGORIAS", payload);
        },
        setSubcategoria(context, payload) {
            context.commit("SET_SUBCATEGORIA", payload);
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