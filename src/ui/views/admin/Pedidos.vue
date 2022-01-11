<template>
    <v-layout wrap class="pedidos">
        <v-flex class="flex-lista-pedidos" xs12 md3>
            <ListPedidos/>
        </v-flex>

        <v-flex grow class="flex-pedido pl-8" xs12 md9>
            <v-card id="card-pedido" elevation="2">
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import ListPedidos from "../../components/ListPedidos";
export default {
    name: "Pedidos",
    components: {ListPedidos},
    data: () => ({
        testes: Array(10),
    })
}
</script>

<style scoped>
.pedidos,
.pedidos .flex-lista-pedidos,
.pedidos .flex-pedido {
    height: 100%;
}

.pedidos .flex-pedido #card-pedido {
    border-radius: 16px;
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2));
}
</style>