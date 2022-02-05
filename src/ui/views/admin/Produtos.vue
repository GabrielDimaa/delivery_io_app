<template>
    <v-container id="produtos" fluid class="ma-0 pa-0">
        <DialogDefault ref="dialog" text-btn-confirm="Salvar" :title="titleForm"
                       :loading="loadingForm" :click-confirm="save">
            <template v-slot:activator="{on, attrs}">
                <v-btn class="btn" color="var(--primary-color)" @click="resetFields" v-on="on" :attrs="attrs">
                    Cadastrar
                </v-btn>
            </template>

            <template v-slot:body>
                <v-card-text class="mt-8">
                    <v-container class="pa-0 ma-0">
                        <validation-observer ref="formProdutos">
                            <v-form @submit.prevent="save">
                                <v-container class="pa-0 ma-0">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="9" class="pb-0">
                                            <validation-provider v-slot="{errors}" name="Descrição" rules="required">
                                                <v-text-field
                                                    v-model="produto.descricao" :disabled="loadingForm"
                                                    :error-messages="errors" label="Descrição" outlined>
                                                </v-text-field>
                                            </validation-provider>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="3" class="pb-0">
                                            <validation-provider v-slot="{errors}" name="Preço">
                                                <v-text-field
                                                    v-model="produto.preco" :disabled="loadingForm"
                                                    :error-messages="errors" label="Preço" outlined
                                                    prefix="R$" v-money="{}" id="preco">
                                                </v-text-field>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12" sm="6" md="6" class="pb-0 pt-0">
                                            <validation-provider v-slot="{errors}" name="Categoria" rules="required">
                                                <v-select v-model="categoria" :disabled="loadingForm"
                                                      :items="categorias" return-object :error-messages="errors"
                                                      label="Categoria" item-text="descricao" item-value="id_categoria"
                                                      required outlined no-data-text="Nenhuma categoria">
                                                </v-select>
                                            </validation-provider>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="6" class="pb-0 pt-0">
                                            <validation-provider v-slot="{errors}" name="Subcategoria" rules="required">
                                                <v-select
                                                    v-model="subcategoria" :disabled="disableFieldSubcategoria"
                                                    :items="subcategorias" return-object :error-messages="errors"
                                                    label="Subcategoria" item-text="descricao" item-value="id_subcategoria"
                                                    required outlined no-data-text="Nenhuma subcategoria">
                                                </v-select>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12" class="pb-0 pt-0">
                                            <validation-provider v-slot="{errors}" name="Sobre" rules="max:250">
                                                <v-textarea
                                                    v-model="produto.sobre" :disabled="loadingForm"
                                                    :error-messages="errors" label="Sobre" outlined rows="3" no-resize>
                                                </v-textarea>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </validation-observer>
                    </v-container>
                </v-card-text>
            </template>
        </DialogDefault>

        <LoadingDefault :loading="loading.show" :message="loading.text"/>
    </v-container>
</template>

<script>
import {api, showError, showSuccess} from "../../../global";
import {extractNumber, sort} from "../../../utils/utils";
import LoadingDefault from "../../components/shared/LoadingDefault";
import DialogDefault from "../../components/shared/DialogDefault";
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
    name: "Produtos",
    components: {LoadingDefault, DialogDefault, ValidationObserver, ValidationProvider},
    data: () => ({
        produto: {
            id_produto: null,
            descricao: null,
            id_categoria: null,
            id_subcategoria: null,
            preco: null,
            sobre: null
        },
        produtos: [],
        categorias: [],
        //categoria e subcategoria devem ser null, pq senão não será validado no form v-select
        categoria: null,
        subcategoria: null,
        loading: {
            show: false,
            text: ""
        },
        loadingForm: false
    }),
    computed: {
        titleForm() {
            return this.produto.id_produto ? "Alterar produto" : "Cadastrar produto";
        },
        disableFieldSubcategoria() {
            return this.loadingForm || !(this.categoria?.id_categoria ?? false);
        },
        subcategorias() {
            return this.categoria?.subcategorias ?? [];
        }
    },
    methods: {
        setLoading(show, msg = "") {
            this.loading.show = show;
            this.loading.text = show ? msg : "";
        },
        setLoadingForm(value) {
            this.loadingForm = value;
        },
        resetFields() {
            if (this.$refs.formProdutos) this.$refs.formProdutos.reset();

            const fieldPreco = document.getElementById("preco");
            if (fieldPreco != null) fieldPreco.value = "";

            this.produto = {
                id_produto: null,
                descricao: null,
                id_categoria: null,
                id_subcategoria: null,
                preco: null,
                sobre: null
            };

            this.categoria = null;
            this.subcategoria = null;
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formProdutos.validate();

                if (extractNumber(this.produto.preco) <= 0) showError("Preço do produto deve ser maior que zero!");

                if (validate) {
                    const postPut = this.produto.id_produto ? 'put' : 'post';
                    const id = this.produto.id_produto ? `/${this.produto.id_produto}` : "";

                    this.produto.id_categoria = this.categoria.id_categoria;
                    this.produto.id_subcategoria = this.subcategoria.id_subcategoria;

                    const data = {...this.produto};
                    data.preco = extractNumber(data.preco);

                    const response = await api[postPut](`produtos${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const produtoResponse = response.data.data;

                    if (this.produto.id_produto) {
                        const produtosFilter = this.produtos.filter(e => e.id_produto !== produtoResponse.id_produto);
                        produtosFilter.push(produtoResponse);
                        this.produtos = produtosFilter;
                    } else {
                        this.produtos.push(produtoResponse)
                    }

                    this.produtos.sort(sort);
                    this.$refs.dialog.setDialog(false);
                    this.resetFields();
                    showSuccess();
                }
            } catch (err) {
                showError(err);
            } finally {
                this.setLoadingForm(false);
            }
        },
    },
    async created() {
        try {
            this.setLoading(true, "Buscando produtos...");

            const responseProd = await api.get("produtos");
            const responseCat = await api.get("categorias");

            if (responseProd.data.success) {
                this.produtos = responseProd.data.data.list;
                this.produtos.sort(sort);
            }

            if (responseCat.data.success) {
                this.categorias = responseCat.data.data.list;
                this.categorias.sort(sort);
            }
        } finally {
            this.setLoading(false);
        }
    }
}
</script>

<style scoped>
#produtos .btn {
    color: white;
    text-transform: none;
    font-weight: 400;
    letter-spacing: 1px;
}
</style>