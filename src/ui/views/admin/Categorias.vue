<template>
    <v-container id="categorias" fluid class="ma-0 pa-0">
        <div class="mb-4">
            <DialogDefault ref="dialog" text-btn-confirm="Salvar" title="Cadastrar categoria"
                           :loading="loadingForm" :click-confirm="save">
                <template v-slot:activator="{on, attrs}">
                    <v-btn class="btn" color="var(--primary-color)" @click="resetFields"  v-on="on" :attrs="attrs">
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
                                                    v-model="categoria.descricao" :error-messages="errors"
                                                    label="Descrição" required outlined>
                                                </v-text-field>
                                            </validation-provider>
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </validation-observer>

                            <div class="subcategorias">
                                <v-btn :loading="loadingForm" :disabled="loadingForm" text class="btn-add-subcategoria">
                                    <v-icon color="var(--secondary-color)" size="22" left>mdi-plus-circle</v-icon>
                                    Adicionar subcategoria
                                </v-btn>

                                <a href="#" v-ripple @click.prevent class="subcategoria">
                                    <div class="subcategoria-dialog" v-for="sub in categoria.subcategorias" :key="sub.id_subcategoria">
                                        {{sub.descricao}}
                                        <v-tooltip top left>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn elevation="0" color="transparent" fab small :bind="attrs" v-on="on">
                                                    <v-icon color="var(--error-color)" size="22">
                                                        mdi-minus-circle-outline
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            Remover
                                        </v-tooltip>
                                    </div>
                                </a>
                            </div>
                        </v-container>
                    </v-card-text>
                </template>
            </DialogDefault>
            <div style="height: 12px;"/>
        </div>

        <LoadingDefault :loading="loading" :message="'Buscando categorias...'"></LoadingDefault>
        <ListagemCategorias v-if="!hideDataTable" :onClickUpdate="(e) => onClickUpdate(e)" :onClickDelete="(e) => onClickDelete(e)" :data-table="categorias"/>
    </v-container>
</template>

<script>
import ListagemCategorias from '../../components/Categorias/ListagemCategorias';
import DialogDefault from "../../components/DialogDefault";
import LoadingDefault from "../../components/LoadingDefault";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '@/plugins/vee';
import {api, showSuccess, showError} from '../../../global';

export default {
    name: "Categorias",
    components: {LoadingDefault, DialogDefault, ListagemCategorias, ValidationProvider, ValidationObserver},
    data: () => ({
        categoria: {},
        categorias: [],
        dialog: false,
        loading: false,
        loadingForm: false
    }),
    computed: {
        hideDataTable() {
            return this.categorias.length === 0;
        }
    },
    methods: {
        setLoading(value) {
            this.loading = value;
        },
        setLoadingForm(value) {
            this.loadingForm = value;
        },
        resetFields() {
            if (this.$refs.formCategorias) this.$refs.formCategorias.reset();
            this.categoria = {};
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formCategorias.validate();

                if (validate) {
                    const postPut = this.categoria.id_categoria ? 'put' : 'post';
                    const id = this.categoria.id_categoria ? `/${this.categoria.id_categoria}` : "";

                    const data = {"descricao": this.categoria.descricao};

                    const response = await api[postPut](`categorias${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const categoriaResponse = response.data.data;

                    if (this.categoria.id_categoria) {
                        const categoriaFilter = this.categorias.filter(e => e.id_categoria === categoriaResponse.id_categoria);

                        console.log(categoriaFilter);
                        categoriaFilter.add(categoriaResponse);
                        console.log(categoriaFilter);
                        this.categorias = categoriaFilter;
                    } else {
                        this.categorias.unshift(categoriaResponse)
                    }

                    this.categorias.sort(this.sort);
                    this.$refs.dialog.setDialog(false);
                    this.resetFields();
                    showSuccess();
                }
            } catch (e) {
                showError(e);
            } finally {
                this.setLoadingForm(false);
            }
        },
        onClickUpdate(categoria) {
            console.log(categoria);
            this.categoria = categoria;
            this.$refs.dialog.setDialog(true);
        },
        onClickDelete(categoria) {
            console.log(categoria);
        },
        sort(a, b) {
            return (a.descricao > b.descricao) ? 1 : ((b.descricao > a.descricao) ? -1 : 0);
        }
    },
    async created() {
        try {
            this.setLoading(true);

            const response = await api.get("categorias");

            if (response.data.success) {
                this.categorias = response.data.data.list;
                this.categorias.sort(this.sort);
            }
        } finally {
            this.setLoading(false);
        }
    },
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

.subcategorias {
    display: flex;
    flex-direction: column;
}

.subcategoria {
    text-decoration: none;
}

.subcategoria:hover {
    background-color: var(--opacity-grey-color);
}

.subcategoria-dialog {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--dark-color);
    font-weight: 400;
    padding: 4px 0;
}

.btn-add-subcategoria {
    text-transform: none;
    font-size: 14px;
    letter-spacing: 0;
    font-weight: 600;
}
</style>