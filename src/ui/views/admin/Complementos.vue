<template>
    <v-container id="complementos" fluid class="ma-0 pa-0">
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

        <div v-if="!complementosEmpty">
            lista
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
import api from "../../../services/api";
import ComplementoModel from "../../../models/complementoModel";
import {extractNumber} from "../../../utils/utils";
import {showError, showSuccess} from "../../../global";
import CategoriaModel from "../../../models/categoriaModel";

export default {
    name: "Complementos",
    components: {
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
        ...mapState('complementos', ['loading', 'loadingForm', 'complemento', 'complementos', 'categoria', 'categorias']),
        ...mapGetters('complementos', ['titleForm', 'complementosEmpty'])
    },
    methods: {
        ...mapActions('complementos', [
            'setLoading',
            'setLoadingForm',
            'setComplemento',
            'setComplementos',
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

                    const data = this.complemento.toJson();

                    const response = await api[postPut](`complementos${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const complementoResponseModel = ComplementoModel.fromJson(response.data.data);

                    if (this.complemento.idComplemento) {
                        const complementosFilter = this.complementos.filter(e => e.idComplemento !== complementoResponseModel.idComplemento);
                        complementosFilter.push(complementoResponseModel);
                        this.setComplementos(complementosFilter);
                    } else {
                        this.complementos.push(complementoResponseModel)
                    }

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

                    this.setComplementos(this.complementos.filter(e => e.idComplemento !== complemento.idComplemento));
                    this.resetFields();
                    showSuccess();
                }
            } catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
    },
    async created() {
        try {
            this._resetFields();
            this.setLoading(true, "Buscando complementos...");

            const responseComplementos = await api.get("complementos");

            if (responseComplementos.data.success) {
                let complementos = responseComplementos.data.data.list;
                complementos = complementos.map(it => ComplementoModel.fromJson(it));
                this.setComplementos(complementos);
            }

            const responseCategorias = await api.get("categorias");

            if (responseCategorias.data.success) {
                let categorias = responseCategorias.data.data.list;
                categorias = categorias.map(it => CategoriaModel.fromJson(it));
                this.setCategorias(categorias);
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
</style>