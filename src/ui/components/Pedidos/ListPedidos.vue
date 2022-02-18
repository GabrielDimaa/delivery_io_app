<template>
    <div class="container-pedidos">
        <div class="lista-pedidos">
            <div v-for="pedido in pedidos" :key="pedido.idPedido">
                <v-card class="card-pedido-resumido mt-2" elevation="2" @click="selectPedido(pedido)" ripple>
                    <div class="d-flex card-body">
                        <div class="card-barra" :class="{'card-selected': cardSelected(pedido)}"></div>

                        <div class="card-content">
                            <div class="d-flex justify-space-between align-center">
                                <span class="codigo-pedido">#{{ pedido.codigoPedido }}</span>
                                <TileStatusPedido :status="pedido.status" small/>
                            </div>

                            <div class="d-flex justify-space-between align-center mt-1">
                                <div>
                                    <v-icon class="mr-1" size="16" color="#FF3D00">mdi-clock-outline</v-icon>
                                    <small class="hora-pedido">{{ pedido.horarioPedidoDisplay }}</small>
                                </div>

                                <div class="valor-total">{{ toMoney(pedido.valorTotal) }}</div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {toMoney} from "../../../utils/utils";
import TileStatusPedido from "./TileStatusPedido";

export default {
    name: "ListPedidos",
    components: {TileStatusPedido},
    computed: {
        ...mapState('pedidos', ['pedidoSelected', 'pedidos', 'loading']),
    },
    methods: {
        ...mapActions('pedidos', ['setPedidoSelected']),
        selectPedido(pedido) {
            this.setPedidoSelected(pedido);
        },
        toMoney(value) {
            return toMoney(value, true);
        },
        cardSelected(pedido) {
            if (this.pedidoSelected.idPedido === pedido.idPedido)
                return "card-selected";
            else {
                return "";
            }
        }
    }
}
</script>

<style scoped>
.container-pedidos {
    height: 100%;
}

.container-pedidos .lista-pedidos {
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2));
    padding-right: 8px;
    overflow: auto;
}

.container-pedidos .card-pedido-resumido {
    border-radius: 16px;
    display: flex;
    flex-direction: column;
}

.container-pedidos .card-barra {
    width: 5px;
    margin: 8px 0;
    border-radius: 12px;
    background: transparent;
}

.container-pedidos .card-selected {
    background: #503E9D;
    transition: background 0.8s;
}

.container-pedidos .card-body {
    flex-grow: 1;
}

.container-pedidos .card-content {
    padding: 6px 12px 6px 8px;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
}

.card-content .codigo-pedido {
    font-size: 15px;
    font-weight: 600;
}

.card-content .hora-pedido {
    font-weight: 500;
}

.card-pedido-resumido .valor-total {
    font-size: 15px;
    font-weight: 700;
}
</style>