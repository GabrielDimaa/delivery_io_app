<template>
    <v-app>
        <AppBar/>
        <Drawer/>

        <v-main id="main">
            <Content/>
            <Notification/>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from "./templates/AppBar";
import Drawer from "./templates/Drawer";
import Content from "./templates/Content";
import Notification from "./components/shared/Notification";
import PedidoModel from "../models/pedidoModel";
import {mapActions, mapState} from "vuex";

export default {
    name: "App",
    components: {Content, Drawer, AppBar, Notification},
    computed: {
        ...mapState('pedidos', ['pedidos'])
    },
    methods: {
        ...mapActions(["setShowNotification"]),
        handleListen(event) {
            const pedidoModel = PedidoModel.fromJson(event.pedido);
            this.setShowNotification(true);

            if (pedidoModel && pedidoModel.idPedido !== null) {
                const existePedidoNaLista = this.pedidos.some(e => e.idPedido === pedidoModel.idPedido);

                if (!existePedidoNaLista) {
                    this.pedidos.unshift(pedidoModel);
                }
            }
        }
    },
    mounted() {
        window.Echo.channel('pedido')
            .listen('.Pedido', (event) => {
                this.handleListen(event);
            });
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import '../assets/css/style.css';
@import '../assets/css/toasted.css';

#main {
    background: var(--background-color);
}
</style>