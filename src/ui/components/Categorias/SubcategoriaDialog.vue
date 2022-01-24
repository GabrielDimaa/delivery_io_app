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
                                            v-model="subcategoria.descricao" :disabled="loading"
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
                <v-btn class="mr-3" color="primary" :disabled="loading" text @click="clickCancel">
                    Cancelar
                </v-btn>
                <v-btn color="primary" :disabled="loading" :loading="loading" @click="clickConfirm(subcategoria)">
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';

export default {
    name: "SubcategoriaDialog",
    components: {ValidationObserver, ValidationProvider},
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        clickConfirm: {
            type: Function,
            required: true
        },
        clickCancel: {
            type: Function,
            required: true
        },
        subcategoria: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        dialog: false,
    }),
    methods: {
        setDialog(value) {
            this.dialog = value;

            //Se fechar o dialog limpa os campos.
            if (!value) {
                this.$refs.formSubcategorias.reset();
            }
        }
    }
}
</script>

<style scoped>
</style>