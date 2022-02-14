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
                                                <vuetify-money
                                                    v-model="produto.preco" :disabled="loadingForm"
                                                    :error-messages="errors" label="Preço" outlined
                                                    :options="options" placeholder="0,00" required/>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12" sm="6" md="6" class="pb-0 pt-0">
                                            <validation-provider v-slot="{errors}" name="Categoria" rules="required">
                                                <v-select v-model="categoria" :disabled="loadingForm"
                                                          :items="categorias" return-object :error-messages="errors"
                                                          label="Categoria" item-text="descricao"
                                                          item-value="id_categoria"
                                                          required outlined no-data-text="Nenhuma categoria">
                                                </v-select>
                                            </validation-provider>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="6" class="pb-0 pt-0">
                                            <validation-provider v-slot="{errors}" name="Subcategoria" rules="required">
                                                <v-select
                                                    v-model="subcategoria" :disabled="disableFieldSubcategoria"
                                                    :items="subcategorias" return-object :error-messages="errors"
                                                    label="Subcategoria" item-text="descricao"
                                                    item-value="id_subcategoria"
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

        <v-card v-for="prod in produtos" :key="prod.idProduto" width="260" class="card-produto mt-8 pa-4"
                elevation="2">
            <v-img src="@/assets/img/hamburguer.png" height="128" contain/>

            <h4 class="mt-4">{{ prod.descricao }}</h4>
            <div class="preco">
                {{ prod.categoria.descricao }} - {{ prod.subcategoria.descricao }}
                <br>
                <span class="preco">{{ toMoney(prod.preco) }}</span>
            </div>

            <div class="d-flex flex-row-reverse">
                <v-btn icon color="yellow" @click="openDialogUpdate(prod)">
                    <v-icon size="20">mdi-pencil</v-icon>
                </v-btn>

                <v-btn icon color="red" @click="remove(prod)">
                    <v-icon size="20">mdi-delete</v-icon>
                </v-btn>
            </div>
        </v-card>

        <LoadingDefault :loading="loading.show" :message="loading.text"/>
        <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </v-container>
</template>

<script>
import {api, showError, showSuccess} from "../../../global";
import {extractNumber, sort, toMoney} from "../../../utils/utils";
import LoadingDefault from "../../components/shared/LoadingDefault";
import DialogDefault from "../../components/shared/DialogDefault";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import ProdutoModel from "../../../models/produtoModel";

export default {
    name: "Produtos",
    components: {
        LoadingDefault,
        DialogDefault,
        ConfirmDialog,
        ValidationObserver,
        ValidationProvider,
    },
    data: () => ({
        produto: new ProdutoModel(),
        produtos: [],
        categorias: [],
        //categoria e subcategoria devem ser null, pq senão não será validado no form v-select
        categoria: null,
        subcategoria: null,
        loading: {
            show: false,
            text: ""
        },
        loadingForm: false,
        options: {
            locale: "pt-BR",
            prefix: "R$",
            suffix: "",
            length: 11,
            precision: 2
        }
    }),
    computed: {
        titleForm() {
            return this.produto.idProduto ? "Alterar produto" : "Cadastrar produto";
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
        toMoney(value) {
            return toMoney(value, true);
        },
        resetFields() {
            if (this.$refs.formProdutos) this.$refs.formProdutos.reset();

            const fieldPreco = document.getElementById("preco");
            if (fieldPreco != null) fieldPreco.value = "";

            this.categoria = null;
            this.subcategoria = null;
            this.produto = new ProdutoModel();
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formProdutos.validate();

                if (extractNumber(this.produto.preco) <= 0) return showError("Preço do produto deve ser maior que zero!");

                if (validate) {
                    const postPut = this.produto.idProduto ? 'put' : 'post';
                    const id = this.produto.idProduto ? `/${this.produto.idProduto}` : "";

                    this.produto.id_categoria = this.categoria.id_categoria;
                    this.produto.id_subcategoria = this.subcategoria.id_subcategoria;

                    const data = this.produto.toJson();
                    data.preco = extractNumber(data.preco);

                    const response = await api[postPut](`produtos${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const produtoResponse = ProdutoModel.fromJson(response.data.data);

                    if (this.produto.idProduto) {
                        const produtosFilter = this.produtos.filter(e => e.idProduto !== produtoResponse.idProduto);
                        this.produto = produtoResponse.toJson();
                        produtosFilter.push(this.produto);
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
        async remove(produto) {
            try {
                const confirm = await this.$refs.confirmDialog.showDialog("Excluir", "Deseja excluir o produto?");

                if (confirm) {
                    this.setLoading(true, "Excluindo produto...");

                    const response = await api.delete(`produtos/${produto.idProduto}`);

                    if (!response.data.success) {
                        showError("Houve um erro ao excluir o produto!");
                    }

                    this.produtos = this.produtos.filter(e => e.idProduto !== produto.idProduto);
                    this.resetFields();
                    showSuccess();
                }
            } catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
        openDialogUpdate(produto) {
            this.resetFields();

            this.produto = produto.clone();
            //Adiciona casas decimais pq senão o campo preço fica incorreto.
            //se o preço for 750, ficaria 7,50, com o toFixed() fica 750,00.
            this.produto.preco = parseFloat(this.produto.preco).toFixed(2);

            this.categoria = this.categorias.filter(e => e.id_categoria === produto.idCategoria)[0];
            this.subcategoria = this.categoria.subcategorias.filter(e => e.id_subcategoria === produto.id_subcategoria)[0];

            console.log(this.produto);
            this.$refs.dialog.setDialog(true);
        }
    },
    async created() {
        try {
            this.setLoading(true, "Buscando produtos...");

            const responseProd = await api.get("produtos");
            const responseCat = await api.get("categorias");

            if (responseProd.data.success) {
                const produtos = responseProd.data.data.list;
                produtos.forEach(it => this.produtos.push(ProdutoModel.fromJson(it)));
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

#produtos .card-produto {
    border-radius: 12px;
}

.card-produto .preco {
    color: var(--grey-color);
    font-size: 14px;
}
</style>