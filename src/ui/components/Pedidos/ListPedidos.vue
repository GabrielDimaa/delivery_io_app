<template>
    <div class="container-pedidos">
        <div class="lista-pedidos">
            <div v-for="pedido in pedidos" :key="pedido.id_pedido">
                <v-card height="126" class="card-pedido-resumido mt-2" elevation="2" @click="selectPedido(pedido)" ripple >
                    <div class="d-flex card-body">
                        <div class="card-barra" :class="{'card-selected': cardSelected(pedido)}"></div>

                        <div class="card-content">
                            <div class="card-header">
                                <span class="codigo-pedido">#{{pedido.codigo_pedido}}</span>
                                <small class="hora-pedido">20:36</small>
                            </div>

                            <div class="text-info">{{pedido.nome}}</div>

                            <div class="flex-entrega-valor-total">
                                <div class="entrega-info">
                                    <div class="previsao-entrega mt-1">
                                        <v-icon size="16" color="#FF3D00">mdi-timer-outline</v-icon>
                                        <div class="text-info ml-1">Previsão: 21:06</div>
                                    </div>

                                    <div class="tipo-entrega mt-1">
                                        <v-icon size="16" color="var(--primary-color)">mdi-store</v-icon>
                                        <div class="text-info ml-1">{{tipoEntregaDispay(pedido.tipo_entrega)}}</div>
                                    </div>
                                </div>

                                <div class="valor-total mt-1">{{toMoney(pedido.valor_total)}}</div>
                            </div>

                            <div class="flex-btn">
                                <v-btn class="btn-aceitar" text color="#0BB865">Aceitar</v-btn>
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
import TipoEntrega from "../../../enums/tipoEntrega";

export default {
    name: "ListPedidos",
    computed: {
        ...mapState('pedidos', ['pedidoSelected', 'pedidos', 'loading']),
    },
    methods: {
        ...mapActions('pedidos', ['setPedidoSelected']),
        selectPedido(pedido) {
            this.setPedidoSelected(pedido);
        },
        tipoEntregaDispay(tipoEntrega) {
            if (tipoEntrega === TipoEntrega.Entrega.value) {
                return TipoEntrega.Entrega.descricao;
            } else {
                return TipoEntrega.Retirada.descricao;
            }
        },
        toMoney(value) {
            return toMoney(value, true);
        },
        cardSelected(pedido) {
            if (this.pedidoSelected.id_pedido === pedido.id_pedido)
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
    margin: 10px 0;
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

.card-pedido-resumido .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-pedido-resumido .card-header .codigo-pedido {
    font-size: 15px;
    font-weight: 600;
}

.card-pedido-resumido .card-header .hora-pedido {
    font-weight: 500;
}

.card-pedido-resumido .text-info {
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--grey-color);
}

.card-pedido-resumido .flex-entrega-valor-total {
    display: flex;
    justify-content: space-between;
}

.card-pedido-resumido .entrega-info {
    display: flex;
    flex-direction: column;
}

.card-pedido-resumido .entrega-info .previsao-entrega,
.card-pedido-resumido .entrega-info .tipo-entrega {
    display: flex;
}

.card-pedido-resumido .flex-entrega-valor-total .valor-total {
    font-size: 15px;
    font-weight: 700;
}

.card-pedido-resumido .flex-btn {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: flex-end;
}

.card-pedido-resumido .flex-btn .btn-aceitar {
    text-transform: none;
    height: 16px;
    width: 16px;
    font-size: 14px;
    alignment: right;
}
</style>