<template>
    <div class="background ma-0 pa-0">
        <v-card class="card rounded-xl" max-width="500" width="400">
            <h1 id="title">Olá, seja bem-vindo!</h1>

            <validation-observer style="width: 100%" ref="formLogin">
                <v-form style="width: 100%" @submit.prevent="fazerLogin">
                    <validation-provider v-slot="{errors}" name="Usuário" rules="required">
                        <v-text-field
                            dense label="Usuário" required outlined
                            v-model="login.email" :disabled="loading" :error-messages="errors">
                        </v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{errors}" name="Senha" rules="required">
                        <v-text-field
                            dense label="Senha" type="password" required outlined
                            v-model="login.password" :disabled="loading" :error-messages="errors">
                        </v-text-field>
                    </validation-provider>
                </v-form>
            </validation-observer>

            <div id="loading">
                <v-progress-linear v-show="loading" color="var(--opacity-primary-color)"
                       background-color="var(--primary-color)" height="4" indeterminate>
                </v-progress-linear>
            </div>

            <v-btn id="btn-entrar" @click="fazerLogin" :loading="loading" :disabled="loading">Entrar</v-btn>
        </v-card>
    </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {mapActions, mapState} from "vuex";
import {showError} from "../../../global";
import api from "../../../services/api";
import LocalStorageService from "../../../services/localStorageService";

export default {
    name: "Login",
    components: {ValidationProvider, ValidationObserver},
    computed: {
        ...mapState('login', ['login', 'loading']),
    },
    methods: {
        ...mapActions('login', ['setLoading', 'resetFields']),
        async fazerLogin() {
            try {
                this.setLoading(true);

                const validate = await this.$refs.formLogin.validate();

                if (validate) {
                    const response = await api.post("auth/login", this.login.toJson());

                    if (!response.data.access_token) {
                        showError("Não foi possível realizar login!");
                    }

                    LocalStorageService.setAccessToken(response.data.access_token);
                    this.resetFields();

                    await this.$router.replace("/admin/pedidos");
                }
            } catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        }
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

#loading {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 20px;
    padding-bottom: 4px;
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
}
</style>