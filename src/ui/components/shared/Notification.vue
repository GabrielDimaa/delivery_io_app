<template>
    <a href="#" @click.prevent="hideNotification" v-ripple v-if="showNotification" id="notification-bottom">
        <v-icon :size="22" color="white" class="mr-2">mdi-bell-outline</v-icon>
        Você recebeu um novo pedido
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
        hideNotification() {
            if (this.$router.currentRoute.name !== "Pedidos")
                this.$router.replace("/pedidos");

            this.setShowNotification(false);
        }
    }
}
</script>

<style scoped>
#notification-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background: var(--primary-color);
    color: var(--background-color);
    font-weight: 600;
    text-decoration: none;
}
</style>