<template>
    <v-dialog v-model="show" max-width="400" transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="text-h6 primary white--text font-weight-regular" dark>
                {{title}}
            </v-card-title>

            <v-card-text class="mt-8 confirm-dialog-message">
                {{message}}
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn class="mr-3" color="primary" text @click.native="setCancelar">
                    Cancelar
                </v-btn>
                <v-btn color="primary" @click.native="setConfirmar">
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ConfirmDialog",
    data: () => ({
        show: false,
        title: "",
        message: "",
        resolve: null,
        reject: null
    }),
    methods: {
        showDialog(title, message) {
            this.show = true;
            this.title = title;
            this.message = message;

            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        setConfirmar() {
            this.resolve(true);
            this.show = false;
        },
        setCancelar() {
            this.resolve(false);
            this.show = false;
        }
    }
}
</script>

<style scoped>
.confirm-dialog-message {
    font-size: 15px !important;
    color: var(--dark-color) !important;
}
</style>