<template>
    <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
            <v-card-title class="text-h7">Subcategoria</v-card-title>

            <v-card-text class="mt-4">
                <v-container class="pa-0 ma-0">
                    <validation-observer ref="formSubcategorias">
                        <v-form @submit.prevent="confirm">
                            <v-layout>
                                <v-flex>
                                    <validation-provider v-slot="{errors}" name="Descrição" rules="required">
                                        <v-text-field
                                            v-model="subcategoriaNew.descricao" :disabled="loadingForm"
                                            :error-messages="errors" label="Descrição" autofocus required outlined>
                                        </v-text-field>
                                    </validation-provider>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </validation-observer>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn class="mr-3" color="primary" :disabled="loadingForm" text @click="cancelar">
                    Cancelar
                </v-btn>
                <v-btn color="primary" :disabled="loadingForm" :loading="loadingForm" @click="confirm">
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {mapActions, mapState} from "vuex";
import SubcategoriaModel from "../../../models/subcategoriaModel";
import {sort} from "../../../utils/utils";

export default {
    name: "SubcategoriaDialog",
    components: {ValidationObserver, ValidationProvider},
    data: () => ({
        dialog: false,
        subcategoriaNew: new SubcategoriaModel()
    }),
    computed: {
        ...mapState('categorias', ['subcategoria', 'subcategorias', 'categoria', 'loadingForm'])
    },
    methods: {
        ...mapActions('categorias', ['setSubcategoria', 'setSubcategorias', 'setLoadingForm']),
        setDialog(value) {
            this.dialog = value;

            if (value) {
                this.subcategoriaNew = this.subcategoria.clone();
            } else {
                this.$refs.formSubcategorias.reset();
                this.subcategoriaNew = new SubcategoriaModel();
            }
        },
        cancelar() {
            this.setDialog(false);

            this.setSubcategoria(new SubcategoriaModel());
        },
        async confirm() {
            try {
                this.setLoadingForm(true);

                const validate = await this.$refs.formSubcategorias.validate();

                this.setSubcategoria(this.subcategoriaNew);

                if (validate) {
                    if (this.subcategoria.idSubcategoria) {
                        const subcategorias = this.subcategorias.filter(e => e.idSubcategoria !== this.subcategoria.idSubcategoria);
                        subcategorias.push(this.subcategoria);
                        this.setSubcategorias(subcategorias);
                    } else {
                        this.subcategoria.idCategoria = this.categoria.idCategoria;
                        this.subcategorias.push(this.subcategoria);
                    }

                    this.subcategorias.sort(sort);
                    this.setSubcategoria(new SubcategoriaModel());
                    this.setDialog(false);
                }
            } finally {
                this.setLoadingForm(false);
            }
        }
    }
}
</script>

<style scoped>
</style>