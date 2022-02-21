<template>
    <v-container id="produtos" fluid class="ma-0 pa-0">
        <DialogDefault ref="dialog" text-btn-confirm="Salvar" :title="titleForm"
                       :loading="loadingForm" :click-confirm="save">
            <template v-slot:activator="{on, attrs}">
                <v-btn class="btn" color="var(--primary-color)" @click="_resetFields" v-on="on" :attrs="attrs">
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
                                                          item-value="idCategoria"
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
                                                    item-value="idSubcategoria"
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

        <div v-if="!produtosEmpty">
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
        </div>
        <NenhumDadoEncontrado v-else text="Nenhum produto encontrado."/>

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
import CategoriaModel from "../../../models/categoriaModel";
import {mapActions, mapGetters, mapState} from "vuex";
import NenhumDadoEncontrado from "../../components/shared/NenhumDadoEncontrado";

export default {
    name: "Produtos",
    components: {
        NenhumDadoEncontrado,
        LoadingDefault,
        DialogDefault,
        ConfirmDialog,
        ValidationObserver,
        ValidationProvider,
    },
    data: () => ({
        options: {
            locale: "pt-BR",
            prefix: "R$",
            suffix: "",
            length: 11,
            precision: 2
        }
    }),
    computed: {
        ...mapState('produtos', ['produto', 'produtos', 'categorias', 'loading', 'loadingForm']),
        ...mapGetters('produtos', ['subcategorias', 'titleForm', 'disableFieldSubcategoria', 'produtosEmpty']),
        categoria: {
            get() {
                return this.$store.state.produtos.categoria;
            },
            set(value) {
                this.$store.commit("produtos/SET_CATEGORIA", value);
            }
        },
        subcategoria: {
            get() {
                return this.$store.state.produtos.subcategoria;
            },
            set(value) {
                this.$store.commit("produtos/SET_SUBCATEGORIA", value);
            }
        }
    },
    methods: {
        ...mapActions('produtos', [
            'setProduto',
            'setProdutos',
            'setCategoria',
            'setCategorias',
            'setSubcategoria',
            'resetFields',
            'setLoading',
            'setLoadingForm'
        ]),
        toMoney(value) {
            return toMoney(value, true);
        },
        _resetFields() {
            if (this.$refs.formProdutos) this.$refs.formProdutos.reset();

            const fieldPreco = document.getElementById("preco");
            if (fieldPreco != null) fieldPreco.value = "";

            this.resetFields();
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formProdutos.validate();

                if (extractNumber(this.produto.preco) <= 0) return showError("Preço do produto deve ser maior que zero!");

                if (validate) {
                    const postPut = this.produto.idProduto ? 'put' : 'post';
                    const id = this.produto.idProduto ? `/${this.produto.idProduto}` : "";

                    this.produto.idCategoria = this.categoria.idCategoria;
                    this.produto.idSubcategoria = this.subcategoria.idSubcategoria;

                    const data = this.produto.toJson();

                    const response = await api[postPut](`produtos${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const produtoResponseModel = ProdutoModel.fromJson(response.data.data);

                    if (this.produto.idProduto) {
                        const produtosFilter = this.produtos.filter(e => e.idProduto !== produtoResponseModel.idProduto);
                        produtosFilter.push(produtoResponseModel);
                        this.setProdutos(produtosFilter);
                    } else {
                        this.produtos.push(produtoResponseModel)
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
                    this.setLoading({show: true, text: "Excluindo produto..."});

                    const response = await api.delete(`produtos/${produto.idProduto}`);

                    if (!response.data.success) {
                        showError("Houve um erro ao excluir o produto!");
                    }

                    this.setProdutos(this.produtos.filter(e => e.idProduto !== produto.idProduto));
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
            this._resetFields();

            const produtoClone = produto.clone();
            //Adiciona casas decimais pq senão o campo preço fica incorreto.
            //se o preço for 750, ficaria 7,50, com o toFixed() fica 750,00.
            produtoClone.preco = parseFloat(produtoClone.preco).toFixed(2);
            this.setProduto(produtoClone);

            this.setCategoria(this.categorias.filter(e => e.idCategoria === produto.idCategoria)[0]);
            this.setSubcategoria(this.categoria.subcategorias.filter(e => e.idSubcategoria === produto.idSubcategoria)[0]);

            this.$refs.dialog.setDialog(true);
        }
    },
    async created() {
        try {
            this._resetFields();
            this.setLoading({show: true, text: "Buscando produtos..."});

            const responseProd = await api.get("produtos");
            const responseCat = await api.get("categorias");

            if (responseProd.data.success) {
                let produtos = responseProd.data.data.list;
                produtos = produtos.map(it => ProdutoModel.fromJson(it));
                this.setProdutos(produtos.sort(sort));
            }

            if (responseCat.data.success) {
                let categorias = responseCat.data.data.list;
                categorias = categorias.map(it => CategoriaModel.fromJson(it));
                this.setCategorias(categorias.sort(sort));
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