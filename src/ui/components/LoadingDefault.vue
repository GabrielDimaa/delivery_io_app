<template>
    <v-dialog v-model="loading" persistent width="200" transition="dialog-bottom-transition">
        <v-card height="200" class="container-loading pt-4">
            <v-progress-circular size="66" color="var(--primary-color)" indeterminate
                                 background-color="var(--opacity-primary-color)">
            </v-progress-circular>

            <div class="spacer"></div>

            <p class="message">{{ message }}</p>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "LoadingDefault",
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: "Carregando..."
        },
    }
}
</script>

<style scoped>
.container-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.spacer {
    max-height: 26px;
    height: 26px;
}

.message {
    font-weight: 500;
}
</style>