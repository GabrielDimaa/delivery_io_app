<template>
    <v-container id="categorias" fluid class="ma-0 pa-0">
        <div class="mb-4">
            <DialogDefault ref="dialog" text-btn-confirm="Salvar" :title="titleForm"
                           :loading="loadingForm" :click-confirm="save">
                <template v-slot:activator="{on, attrs}">
                    <v-btn class="btn" color="var(--primary-color)" @click="_resetFields"  v-on="on" :attrs="attrs">
                        Cadastrar
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
                                                    v-model="categoria.descricao" :disabled="loadingForm"
                                                    :error-messages="errors" label="Descrição" autofocus required outlined>
                                                </v-text-field>
                                            </validation-provider>
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </validation-observer>

                            <div class="d-flex flex-column">
                                <v-btn :disabled="loadingForm" @click.stop="openDialogSubcategoria(null)"
                                       text class="btn-add-subcategoria">
                                    <v-icon color="var(--secondary-color)" size="22" left>mdi-plus-circle</v-icon>
                                    Adicionar subcategoria
                                </v-btn>

                                <div v-for="sub in subcategorias" :key="sub.id_subcategoria" class="d-flex">
                                    <div v-if="!sub.deleted" class="subcategoria-dialog">
                                        <a @click.prevent="openDialogSubcategoria(sub)" href="#" v-ripple class="subcategoria">
                                            {{sub.descricao}}
                                        </a>
                                        <v-tooltip top left>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn @click="deleteSubcategoria(sub)" elevation="0" class="subcategoria-btn"
                                                       color="transparent" fab small :bind="attrs" v-on="on">
                                                    <v-icon color="var(--error-color)" size="22">
                                                        mdi-minus-circle-outline
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            Excluir
                                        </v-tooltip>
                                    </div>
                                </div>
                            </div>
                        </v-container>
                    </v-card-text>
                </template>
            </DialogDefault>
            <div style="height: 12px;"/>
        </div>

        <v-expansion-panels :value="[0]" multiple accordion>
            <v-expansion-panel v-for="cat in categorias" :key="cat.idCategoria">
                <v-expansion-panel-header ripple>
                    <label class="categoria-item">{{cat.descricao}}</label>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <p class="subcategoria-item" v-for="sub in cat.subcategorias" :key="sub.idSubcategoria">
                                {{ sub.descricao }}
                            </p>
                        </div>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon @click="clickUpdateCategoria(cat)" v-bind="attrs" v-on="on"  class="flex-grow-0" color="var(--primary-color)">
                                    <v-icon size="20">mdi-pencil-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar categoria</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon @click="clickDeleteCategoria(cat)" v-bind="attrs" v-on="on"  class="flex-grow-0" color="var(--error-color)">
                                    <v-icon size="20">mdi-delete-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Remover categoria</span>
                        </v-tooltip>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <LoadingDefault :loading="loading.show" :message="loading.text"/>
        <ConfirmDialog ref="confirmDialog"/>
        <SubcategoriaDialog ref="subcategoriaDialog"/>
    </v-container>
</template>

<script>
import '@/plugins/vee';
import {showSuccess, showError} from '../../../global';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {sort} from "../../../utils/utils";
import DialogDefault from "../../components/shared/DialogDefault";
import LoadingDefault from "../../components/shared/LoadingDefault";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import SubcategoriaDialog from "../../components/Categorias/SubcategoriaDialog";
import {mapActions, mapGetters, mapState} from "vuex";
import CategoriaModel from "../../../models/categoriaModel";
import api from "../../../services/api";

export default {
    name: "Categorias",
    components: {
        SubcategoriaDialog,
        ConfirmDialog,
        LoadingDefault,
        DialogDefault,
        ValidationProvider,
        ValidationObserver,
    },
    computed: {
        ...mapState('categorias', ['categoria', 'categorias', 'subcategoria', 'subcategorias', 'loading', 'loadingForm']),
        ...mapGetters('categorias', ['titleForm', 'hideDataTable']),
    },
    methods: {
        ...mapActions('categorias', [
            'setCategoria',
            'setCategorias',
            'setSubcategoria',
            'setSubcategorias',
            'resetFields',
            'setLoading',
            'setLoadingForm'
        ]),
        _resetFields() {
            if (this.$refs.formCategorias) this.$refs.formCategorias.reset();
            this.resetFields();
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formCategorias.validate();

                if (validate) {
                    const postPut = this.categoria.idCategoria ? 'put' : 'post';
                    const id = this.categoria.idCategoria ? `/${this.categoria.idCategoria}` : "";

                    this.categoria.subcategorias = this.subcategorias;

                    const data = this.categoria.toJson();

                    const response = await api[postPut](`categorias${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const categoriaModelResponse = CategoriaModel.fromJson(response.data.data);

                    if (this.categoria.idCategoria) {
                        const categoriasFilter = this.categorias.filter(e => e.idCategoria !== categoriaModelResponse.idCategoria);
                        categoriasFilter.push(categoriaModelResponse);
                        this.setCategorias(categoriasFilter);
                    } else {
                        this.categorias.unshift(categoriaModelResponse)
                    }

                    this.categorias.sort(sort);
                    this.$refs.dialog.setDialog(false);
                    this._resetFields();
                    showSuccess();
                }
            } catch (err) {
                showError(err);
            } finally {
                this.setLoadingForm(false);
            }
        },
        async remove(categoria) {
            try {
                this.setLoading({show: true, text: "Excluindo categoria..."});

                const response = await api.delete(`categorias/${categoria.idCategoria}`);

                if (!response.data.success) {
                    showError("Houve um erro ao excluir a categoria!");
                }

                const categorias = this.categorias.filter(e => e.idCategoria !== categoria.idCategoria);
                this.setCategorias(categorias);
                this.resetFields();
                showSuccess();
            }  catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
        clickUpdateCategoria(categoria) {
            this._resetFields();

            this.setCategoria(categoria.clone());
            this.setSubcategorias(this.categoria.subcategorias);

            this.$refs.dialog.setDialog(true);
        },
        async clickDeleteCategoria(categoria) {
            const confirm = await this.$refs.confirmDialog.showDialog("Excluir", "Deseja excluir a categoria?");

            if (confirm) {
                await this.remove(categoria);
            }
        },
        openDialogSubcategoria(subcategoria) {
            if (subcategoria !== null) {
                this.setSubcategoria(subcategoria);
            }
            this.$refs.subcategoriaDialog.setDialog(true);
        },
        deleteSubcategoria(subcategoria) {
            subcategoria.deleted = true;
        },
    },
    async created() {
        try {
            this.setLoading({show: true, text: "Buscando categorias..."});

            const response = await api.get("categorias");

            if (response.data.success) {
                let categorias = response.data.data.list;
                categorias = categorias.map(it => CategoriaModel.fromJson(it));
                categorias.sort(sort);
                this.setCategorias(categorias);
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

.subcategoria-dialog {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.subcategoria {
    flex-grow: 1;
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 400;
    padding: 8px 0;
}

.subcategoria:hover {
    background-color: var(--opacity-grey-color);
    border-radius: 6px;
    padding: 8px 0;
}

.subcategoria-btn {
    flex-grow: 0;
}

.btn-add-subcategoria {
    text-transform: none;
    font-size: 14px;
    letter-spacing: 0;
    font-weight: 600;
}

.categoria-item {
    font-size: 16px;
    font-weight: 500;
}

.subcategoria-item {
    font-size: 14px;
    font-weight: 400;
    color: grey;
}
</style>