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
import AppBar from "../../templates/AppBar";
import Drawer from "../../templates/Drawer";
import Content from "../../templates/Content";
import Notification from "../../components/shared/Notification";
import {mapActions, mapState} from "vuex";
import PedidoModel from "../../../models/pedidoModel";

export default {
    name: "Admin",
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
#main {
    background: var(--background-color);
}
</style>