<template>
    <v-container id="categorias" fluid class="ma-0 pa-0">
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

                            <div class="flex container-subcategorias">
                                <v-btn :disabled="loadingForm" @click.stop="openDialogSubcategoria(null)"
                                       text class="btn-add-subcategoria">
                                    <v-icon color="var(--secondary-color)" size="22" left>mdi-plus-circle</v-icon>
                                    Adicionar subcategoria
                                </v-btn>

                                <div v-for="sub in subcategorias" :key="sub.id_subcategoria" class="subcategorias">
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

        <ListagemCategorias v-if="!hideDataTable" :onClickUpdate="(e) => clickUpdateCategoria(e)" :onClickDelete="(e) => clickDeleteCategoria(e)" :data-table="categorias"/>
        <span v-else>Nenhuma categoria cadastrada.</span>

        <LoadingDefault :loading="loading" :message="textLoading"/>
        <ConfirmDialog ref="confirmDialog"/>
        <SubcategoriaDialog :loading="loadingForm" :subcategoria="subcategoria" ref="subcategoriaDialog"
                            :click-confirm="clickConfirmSubcategoria" :click-cancel="clickCancelSubcategoria"/>
    </v-container>
</template>

<script>
import '@/plugins/vee';
import {api, showSuccess, showError} from '../../../global';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import ListagemCategorias from '../../components/Categorias/ListagemCategorias';
import DialogDefault from "../../components/shared/DialogDefault";
import LoadingDefault from "../../components/shared/LoadingDefault";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import SubcategoriaDialog from "../../components/Categorias/SubcategoriaDialog";

export default {
    name: "Categorias",
    components: {
        SubcategoriaDialog,
        ConfirmDialog,
        LoadingDefault,
        DialogDefault,
        ListagemCategorias,
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        categoria: {},
        subcategoria: {"descricao":  ""},
        subcategoriaSelected: {},
        categorias: [],
        subcategorias: [],
        loading: false,
        textLoading: "",
        loadingForm: false,
    }),
    computed: {
        hideDataTable() {
            return this.categorias.length === 0;
        },
        titleForm() {
            if (this.categoria.id_categoria) return "Alterar categoria";
            else return "Cadastrar categoria";
        }
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
            if (this.$refs.formCategorias) this.$refs.formCategorias.reset();
            this.categoria = {};
            this.subcategorias = [];
        },
        resetSubcategoria() {
            this.subcategoria = {"descricao":  ""};
            this.subcategoriaSelected = {};
        },
        adicionarSubcategoriaNaLista(subcategoria) {
            this.subcategorias.push({
                "id_subcategoria": null,
                "id_categoria": subcategoria.id_categoria,
                "descricao": subcategoria.descricao,
                "deleted": false,
            });
        },
        sort(a, b) {
            return (a.descricao > b.descricao) ? 1 : ((b.descricao > a.descricao) ? -1 : 0);
        },
        async save() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formCategorias.validate();

                if (validate) {
                    const postPut = this.categoria.id_categoria ? 'put' : 'post';
                    const id = this.categoria.id_categoria ? `/${this.categoria.id_categoria}` : "";

                    const data = {
                        "id_categoria": this.categoria.id_categoria,
                        "descricao": this.categoria.descricao,
                        "subcategorias": this.subcategorias
                    };

                    const response = await api[postPut](`categorias${id}`, data);

                    if (!response.data.success) {
                        showError("Houve um erro ao concluir a operação!");
                    }

                    const categoriaResponse = response.data.data;

                    if (this.categoria.id_categoria) {
                        const categoriasFilter = this.categorias.filter(e => e.id_categoria !== categoriaResponse.id_categoria);
                        categoriasFilter.push(categoriaResponse);
                        this.categorias = categoriasFilter;
                    } else {
                        this.categorias.unshift(categoriaResponse)
                    }

                    this.categorias.sort(this.sort);
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
            try {
                this.setLoading(true, "Excluindo categoria...");

                const response = await api.delete(`categorias/${this.categoria.id_categoria}`);

                if (!response.data.success) {
                    showError("Houve um erro ao remover a categoria!");
                }

                this.categorias = this.categorias.filter(e => e.id_categoria !== this.categoria.id_categoria);
                this.resetFields();
                showSuccess();
            }  catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
        clickUpdateCategoria(categoria) {
            this.resetFields();

            this.categoria = {...categoria};
            categoria.subcategorias.forEach(e => {
                const sub = {...e};
                this.$set(sub, "deleted", false)
                this.subcategorias.push(sub);
            });

            this.$refs.dialog.setDialog(true);
        },
        async clickDeleteCategoria(categoria) {
            const confirm = await this.$refs.confirmDialog.showDialog("Excluir", "Deseja excluir a categoria?");

            if (confirm) {
                this.categoria = categoria;
                await this.remove();
            }
        },
        openDialogSubcategoria(subcategoria) {
            if (subcategoria !== null) {
                this.subcategoria = {...subcategoria};
                this.subcategoriaSelected = subcategoria;
            }
            this.$refs.subcategoriaDialog.setDialog(true);
        },
        async clickConfirmSubcategoria(subcategoria) {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.subcategoriaDialog.$refs.formSubcategorias.validate();

                if (validate) {
                    if (subcategoria.id_subcategoria !== undefined) {
                        this.subcategoriaSelected.descricao = subcategoria.descricao;
                    } else {
                        subcategoria.id_categoria = this.categoria.id_categoria;
                        this.adicionarSubcategoriaNaLista(subcategoria);
                    }

                    this.$refs.subcategoriaDialog.setDialog(false);
                    this.resetSubcategoria();
                }
            } finally {
                this.setLoadingForm(false);
            }
        },
        clickCancelSubcategoria() {
            this.$refs.subcategoriaDialog.setDialog(false);
            this.resetSubcategoria();
        },
        deleteSubcategoria(subcategoria) {
            subcategoria.deleted = true;
        },
    },
    async created() {
        try {
            this.setLoading(true, "Buscando categorias...");

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

.container-subcategorias {
    display: flex;
    flex-direction: column;
}

.subcategorias {
    display: flex;
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
</style>