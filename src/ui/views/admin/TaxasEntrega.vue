<template>
    <v-container id="taxas-entrega" fluid class="ma-0 pa-0">
        <div class="mb-4">
            <DialogDefault ref="dialog" text-btn-confirm="Salvar" :title="titleForm"
                           :loading="loadingForm" :click-confirm="save">
                <template v-slot:activator="{on, attrs}">
                    <v-btn class="btn" color="var(--primary-color)" @click="resetFields"  v-on="on" :attrs="attrs">
                        Cadastrar
                    </v-btn>
                </template>

                <template v-slot:body>
                    <v-card-text class="mt-8">
                        <v-container class="pa-0 ma-0">
                            <validation-observer ref="formTaxasEntrega">
                                <v-form @submit.prevent="save">
                                    <v-container class="pa-0 ma-0">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="8">
                                                <validation-provider v-slot="{errors}" name="Descrição" rules="required">
                                                    <v-text-field
                                                        v-model="taxaEntrega.descricao" :disabled="loadingForm"
                                                        :error-messages="errors" label="Descrição" required outlined>
                                                    </v-text-field>
                                                </validation-provider>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <validation-provider v-slot="{errors}" name="Valor" rules="required">
                                                    <v-text-field
                                                        v-model="taxaEntrega.valor" :disabled="loadingForm" prefix="R$"
                                                        :error-messages="errors" label="Valor" required outlined
                                                        v-money="{}" id="valor">
                                                    </v-text-field>
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
            <div style="height: 12px;"/>
        </div>

        <LoadingDefault :loading="loading" :message="textLoading"/>
    </v-container>
</template>

<script>
import {showError, showSuccess} from "../../../global";
import {extractNumber, sort} from "../../../utils/utils";
import '@/plugins/vee';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import DialogDefault from "../../components/shared/DialogDefault";
import LoadingDefault from "../../components/shared/LoadingDefault";
import {api} from "../../../services/api";

export default {
    name: "TaxasEntrega",
    components: {LoadingDefault, DialogDefault, ValidationProvider, ValidationObserver},
    data: () => ({
        taxaEntrega: {
            "id_taxa_entrega": null,
            "descricao": null,
            "valor": null
        },
        taxasEntrega: [],
        loading: false,
        textLoading: "",
        loadingForm: false
    }),
    computed: {
        titleForm() {
            if (this.taxaEntrega.id_taxa_entrega) return "Alterar taxa de entrega";
            else return "Cadastrar taxa de entrega";
        },
        hideDataTable() {
            return this.taxasEntrega.length === 0;
        },
    },
    methods: {
        setLoading(value, msg) {
            if (!value) {
                this.textLoading = "";
            } else {
                this.textLoading = msg;
            }

            this.loading = value;
        },
        setLoadingForm(value) {
            this.loadingForm = value;
        },
        resetFields() {
            if (this.$refs.formTaxasEntrega) this.$refs.formTaxasEntrega.reset();

            const fieldValor = document.getElementById("valor");
            if (fieldValor != null) fieldValor.value = "";

            this.taxaEntrega = {
                "id_taxa_entrega": null,
                "descricao": null,
                "valor": null
            }
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formTaxasEntrega.validate();

                if (validate) {
                    const postPut = this.taxaEntrega.id_taxa_entrega ? 'put' : 'post';
                    const id = this.taxaEntrega.id_taxa_entrega ? `/${this.taxaEntrega.id_taxa_entrega}` : "";

                    const data = {
                        "id_taxa_entrega": this.taxaEntrega.id_taxa_entrega,
                        "descricao": this.taxaEntrega.descricao,
                        "valor": parseFloat(extractNumber(this.taxaEntrega.valor))
                    };

                    const response = await api[postPut](`taxas_entrega${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const taxaEntregaResponse = response.data.data;

                    if (this.taxaEntrega.id_taxa_entrega) {
                        const taxasEntregaFilter = this.taxasEntrega.filter(e => e.id_taxa_entrega !== taxaEntregaResponse.id_taxa_entrega);
                        taxasEntregaFilter.push(taxaEntregaResponse);
                        this.taxasEntrega = taxasEntregaFilter;
                    } else {
                        this.taxasEntrega.push(taxaEntregaResponse)
                    }

                    this.taxasEntrega.sort(sort);
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
        async remove() {

        }
    },
    async created() {
        try {
            this.setLoading(true, "Buscando taxas de entrega...");

            const response = await api.get("taxas_entrega");

            if (response.data.success) {
                this.taxasEntrega = response.data.data.list;
                this.taxasEntrega.sort(sort);
            }
        } finally {
            this.setLoading(false);
        }
    }
}
</script>

<style scoped>
.btn {
    color: white;
    text-transform: none;
    font-weight: 400;
    letter-spacing: 1px;
}
</style>