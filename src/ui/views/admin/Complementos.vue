<template>
    <v-container id="complementos" fluid class="ma-0 pa-0">
        <div class="d-flex justify-space-between">
            <SearchField/>

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
                            <validation-observer ref="formComplementos">
                                <v-form @submit.prevent="save">
                                    <v-container class="pa-0 ma-0">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="9" class="pb-0">
                                                <validation-provider v-slot="{errors}" name="Descrição" rules="required">
                                                    <v-text-field
                                                        v-model="complemento.descricao" :disabled="loadingForm"
                                                        :error-messages="errors" label="Descrição" outlined>
                                                    </v-text-field>
                                                </validation-provider>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="3" class="pb-0">
                                                <validation-provider v-slot="{errors}" name="Preço">
                                                    <vuetify-money
                                                        v-model="complemento.preco" :disabled="loadingForm"
                                                        :error-messages="errors" label="Preço" outlined
                                                        :options="options" placeholder="0,00" required/>
                                                </validation-provider>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" class="pb-0 pt-0">
                                                <validation-provider v-slot="{errors}" name="Categoria" rules="required">
                                                    <v-select v-model="categoria" :disabled="loadingForm"
                                                              :items="categorias" return-object :error-messages="errors"
                                                              label="Categoria" item-text="descricao"
                                                              item-value="idCategoria"
                                                              required outlined no-data-text="Nenhuma categoria">
                                                    </v-select>
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
        </div>

        <div v-if="!filteredListEmpty">
            <v-card class="pa-5 mb-4" v-for="categoria in filteredList" :key="categoria.descricao" >
                <h3 class="categoria-item mb-2">{{categoria.descricao}}</h3>

                <div v-for="(complemento, index) in categoria.complementos" :key="complemento.idComplemento">
                    <div class="d-flex justify-space-between align-center">
                        <span class="complemento-item">{{ complemento.descricao }}</span>

                        <div>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="clickUpdateComplemento(complemento)" v-bind="attrs" v-on="on"
                                           class="flex-grow-0" color="var(--primary-color)">
                                        <v-icon size="20">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar complemento</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon @click="remove(complemento)" v-bind="attrs" v-on="on"
                                           class="flex-grow-0" color="var(--error-color)">
                                        <v-icon size="20">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Remover complemento</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <v-divider v-if="(index + 1) !== categoria.complementos.length" class="mt-2 mb-2"></v-divider>
                </div>
            </v-card>
        </div>

        <NenhumDadoEncontrado v-else text="Nenhum complemento encontrado."/>

        <LoadingDefault :loading="loading.show" :message="loading.text"/>
        <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </v-container>
</template>

<script>
import DialogDefault from "../../components/shared/DialogDefault";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import LoadingDefault from "../../components/shared/LoadingDefault";
import NenhumDadoEncontrado from "../../components/shared/NenhumDadoEncontrado";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {mapActions, mapGetters, mapState} from "vuex";
import {api} from "../../../services/api";
import {extractNumber, sort} from "../../../utils/utils";
import {showError, showSuccess} from "../../../global";
import CategoriaModel from "../../../models/categoriaModel";
import SearchField from "../../components/shared/SearchField";

export default {
    name: "Complementos",
    components: {
        SearchField,
        DialogDefault,
        ConfirmDialog,
        NenhumDadoEncontrado,
        LoadingDefault,
        ValidationObserver,
        ValidationProvider
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
        ...mapState(['search']),
        ...mapState('complementos', ['loading', 'loadingForm', 'complemento', 'categoriasComplementos', 'categorias']),
        ...mapGetters('complementos', ['titleForm', 'complementosEmpty']),
        categoria: {
            get() {
                return this.$store.state.complementos.categoria;
            },
            set(value) {
                this.$store.commit("complementos/SET_CATEGORIA", value);
            }
        },
        filteredList() {
            const filterList = [];

            this.categoriasComplementos.map(it => {
                const complementosList = it.complementos.filter(e => e.descricao.toLowerCase().includes(this.search.toLowerCase()));

                if (complementosList.length > 0) {
                    it = it.clone();
                    it.complementos = complementosList;

                    filterList.push(it);
                }
            });

            return filterList;
        },
        filteredListEmpty() {
            return this.filteredList.length === 0;
        },
    },
    methods: {
        ...mapActions('complementos', [
            'setLoading',
            'setLoadingForm',
            'setComplemento',
            'setCategoriasComplementos',
            'setCategoria',
            'setCategorias',
            'resetFields'
        ]),
        _resetFields() {
            if (this.$refs.formComplementos) this.$refs.formComplementos.reset();

            const fieldPreco = document.getElementById("preco");
            if (fieldPreco != null) fieldPreco.value = "";

            this.resetFields();
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formComplementos.validate();

                if (extractNumber(this.complemento.preco) <= 0) return showError("Preço do complemento deve ser maior que zero!");

                if (validate) {
                    const postPut = this.complemento.idComplemento ? 'put' : 'post';
                    const id = this.complemento.idComplemento ? `/${this.complemento.idComplemento}` : "";

                    this.complemento.idCategoria = this.categoria.idCategoria;
                    const data = this.complemento.toJson();

                    const response = await api[postPut](`complementos${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    await this.carregarComplementos();

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
        async remove(complemento) {
            try {
                const confirm = await this.$refs.confirmDialog.showDialog("Excluir", "Deseja excluir o complemento?");

                if (confirm) {
                    this.setLoading({show: true, text: "Excluindo complemento..."});

                    const response = await api.delete(`complementos/${complemento.idComplemento}`);

                    if (!response.data.success) {
                        showError("Houve um erro ao excluir o complemento!");
                    }

                    await this.carregarComplementos();
                    this.resetFields();
                    showSuccess();
                }
            } catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
        clickUpdateComplemento(complemento) {
            this._resetFields();

            this.setComplemento(complemento.clone());
            this.setCategoria(this.categorias.find(it => it.idCategoria === complemento.idCategoria));

            this.$refs.dialog.setDialog(true);
        },
        async carregarComplementos() {
            const response = await api.get("complementos/categorias_complementos");

            if (response.data.success) {
                let categoriasComplementos = response.data.data.list;
                categoriasComplementos = categoriasComplementos.map(it => CategoriaModel.fromJson(it));
                this.setCategoriasComplementos(categoriasComplementos.sort(sort));
            }
        }
    },
    async created() {
        try {
            this._resetFields();
            this.setLoading({show: true, text: "Buscando complementos..."});

            await this.carregarComplementos();

            const responseCategorias = await api.get("categorias");

            if (responseCategorias.data.success) {
                let categorias = responseCategorias.data.data.list;
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
#complementos .btn {
    color: white;
    text-transform: none;
    font-weight: 500;
    letter-spacing: 1px;
}

#complementos .categoria-item {
    font-size: 16px;
    font-weight: 500;
}

#complementos .complemento-item {
    font-size: 14px;
    font-weight: 400;
    color: grey;
}
</style>