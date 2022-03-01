<template>
    <div class="background ma-0 pa-0">
        <v-card class="card rounded-xl" max-width="500" width="400">
            <h1 id="title">Olá, seja bem-vindo!</h1>

            <validation-observer style="width: 100%" ref="formLogin">
                <v-form style="width: 100%" @submit.prevent="login">
                    <validation-provider v-slot="{errors}" name="Usuário" rules="required">
                        <v-text-field dense label="Usuário" required outlined :error-messages="errors">
                        </v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{errors}" name="Senha" rules="required">
                        <v-text-field dense label="Senha" type="password" required outlined :error-messages="errors">
                        </v-text-field>
                    </validation-provider>
                </v-form>
            </validation-observer>

            <v-btn id="btn-entrar" @click="login">Entrar</v-btn>
        </v-card>
    </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
    name: "Login",
    components: {ValidationProvider, ValidationObserver},
    methods: {
        async login() {}
    }
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

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 60px;
    border-radius: 50px;
}

#title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
}

#btn-entrar {
    height: 50px;
    width: 100%;
    background: var(--primary-color);
    text-transform: none;
    letter-spacing: 1px;
    font-size: 16px;
    font-weight: 500;
    color: var(--background-color);
    margin-top: 20px;
}
</style>