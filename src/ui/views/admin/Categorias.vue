<template>
    <v-container id="categorias" fluid class="ma-0 pa-0">
        <div class="mb-4">
            <DialogDefault ref="dialog" text-btn-confirm="Salvar" title="Cadastrar categoria"
                           :loading="loading" :click-confirm="save">
                <template v-slot:activator="{on, attrs}">
                    <v-btn class="btn" color="var(--primary-color)" v-on="on" :attrs="attrs">
                        Cadastrar categoria
                    </v-btn>
                </template>

                <template v-slot:body>
                    <v-card-text class="mt-8">
                        <v-container class="pa-0 ma-0">
                            <validation-observer ref="formCategorias">
                                <v-form @submit.prevent="save">
                                    <v-layout>
                                        <v-flex>
                                            <validation-provider v-slot="{errors}" name="Descrição" rules="required">
                                                <v-text-field
                                                    v-model="descricaoCategoria" :error-messages="errors"
                                                    label="Descrição" required outlined>
                                                </v-text-field>
                                            </validation-provider>
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </validation-observer>
                        </v-container>
                    </v-card-text>
                </template>
            </DialogDefault>
            <div style="height: 12px;"/>
        </div>

        <ListagemCategorias></ListagemCategorias>
    </v-container>
</template>

<script>
import ListagemCategorias from '../../components/Categorias/ListagemCategorias';
import DialogDefault from "../../components/DialogDefault";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '@/plugins/vee';
import {api, showSuccess, showError} from '../../../global';

export default {
    name: "Categorias",
    components: {DialogDefault, ListagemCategorias, ValidationProvider, ValidationObserver},
    data: () => ({
        descricaoCategoria: "",
        loading: false,
    }),
    methods: {
        setLoading(value) {
            this.loading = value;
        },
        resetFields() {
            this.$refs.formCategorias.reset();

            this.descricaoCategoria = "";
        },
        async save() {
            try {
                this.setLoading(true);

                const validate = await this.$refs.formCategorias.validate();

                if (validate) {
                    const data = {"descricao": this.descricaoCategoria};

                    const response = await api.post("categorias", data);

                    if (!response.data.success) {
                        showError("Houve um erro ao cadastrar categoria!");
                    }

                    this.$refs.dialog.setDialog(false);
                    this.resetFields();
                    showSuccess();
                }
            } catch (e) {
                showError(e);
            } finally {
                this.setLoading(false);
            }
        }
    }
}
</script>

<style scoped>
#categorias .btn {
    color: white;
    text-transform: none;
    font-weight: 400;
    letter-spacing: 1px;
}

#categorias h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
}
</style>