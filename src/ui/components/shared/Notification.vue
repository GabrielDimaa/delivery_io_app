<template>
    <a href="" @click.prevent="toPedidos" v-ripple v-if="showNotification" id="notification-bottom">
        <v-snackbar :timeout="8000" color="var(--primary-color)" v-model="showNotification" >
            Você recebeu um novo pedido
            <template v-slot:action="{ attrs }">
                <v-btn color="transparent" elevation="0" @click="hideNotification" v-bind="attrs">
                    <v-icon color="var(--background-color)">mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </a>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "Notification",
    computed: {
        ...mapState(['showNotification'])
    },
    methods: {
        ...mapActions(['setShowNotification']),
        toPedidos() {
            if (this.$router.currentRoute.name !== "Pedidos")
                this.$router.replace("/admin/pedidos");

            this.hideNotification();
        },
        hideNotification() {
            this.setShowNotification(false);
        }
    }
}
</script>

<style scoped>
#notification-bottom {
    text-decoration: none;
}
</style>