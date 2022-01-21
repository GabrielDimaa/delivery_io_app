<template>
    <v-dialog class="dialog-default" v-model="dialog" persistent width="60%" transition="dialog-bottom-transition">
        <template v-slot:activator="{on, attrs}">
            <slot name="activator" :attrs="attrs" :on="on"></slot>
        </template>
        <v-card>
            <v-card-title class="text-h6 primary white--text font-weight-regular" dark>
                {{ title }}
            </v-card-title>

            <v-progress-linear v-show="loading" color="var(--opacity-primary-color)"
                               background-color="var(--primary-color)" height="4" indeterminate>
            </v-progress-linear>

            <slot name="body"></slot>

            <v-card-actions>
                <v-spacer/>
                <v-btn class="mr-3" color="primary" :disabled="loading" text @click="setDialog(false)">
                    Cancelar
                </v-btn>
                <v-btn color="primary" :loading="loading" @click="clickConfirm">
                    {{textBtnConfirm}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DialogDefault",
    props: {
        title: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        clickConfirm: {
            type: Function
        },
        textBtnConfirm: {
            type: String,
            default: "Confirmar"
        }
    },
    data: () => ({
        dialog: false,
    }),
    methods: {
        setDialog(value) {
            this.dialog = value;
        }
    }
}
</script>

<style scoped>
</style>