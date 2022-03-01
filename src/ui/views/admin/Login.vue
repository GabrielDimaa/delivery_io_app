<template>
    <div class="background ma-0 pa-0">
        <v-card class="d-flex flex-column align-center justify-center pa-10">
            <v-img src="@/assets/img/logo.png" max-width="180"/>

            <v-card-title>LOGIN</v-card-title>

            <v-text-field
                 label="Descrição" outlined>
            </v-text-field>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style scoped>
.background {
    background: var(--primary-color);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>