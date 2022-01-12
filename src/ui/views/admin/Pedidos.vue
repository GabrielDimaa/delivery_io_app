<template>
    <v-layout wrap class="pedidos">
        <v-flex class="flex-lista-pedidos" xs12 md3>
            <ListPedidos/>
        </v-flex>

        <v-flex grow class="flex-pedido pl-8" xs12 md9>
            <ResumoPedido/>
        </v-flex>
    </v-layout>
</template>

<script>
import ListPedidos from "../../components/ListPedidos";
import ResumoPedido from "../../components/ResumoPedido";

export default {
    name: "Pedidos",
    components: {ListPedidos, ResumoPedido},
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
</style>