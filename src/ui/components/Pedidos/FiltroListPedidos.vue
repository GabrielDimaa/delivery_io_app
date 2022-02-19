<template>
    <div class="d-flex filtro-list-pedido">
        <v-card class="card-filtro mr-4" height="34" width="100%" elevation="2">
            <v-btn class="btn-card-filtro" elevation="0" height="100%" @click="filtrar(null)"
                   :color="isFiltroSelected(null) ? 'var(--primary-color)' : 'white'" :dark="isFiltroSelected(null)">
                Todos
            </v-btn>

            <v-btn class="btn-card-filtro" elevation="0" height="100%" @click="filtrar(aceitos)"
                   :color="isFiltroSelected(aceitos) ? 'var(--primary-color)' : 'white'"
                   :dark="isFiltroSelected(aceitos)">
                Aceitos
            </v-btn>

            <v-btn class="btn-card-filtro" elevation="0" height="100%" @click="filtrar(finalizados)"
                   :color="isFiltroSelected(finalizados) ? 'var(--primary-color)' : 'white'"
                   :dark="isFiltroSelected(finalizados)">
                Finaliz.
            </v-btn>
        </v-card>
    </div>
</template>

<script>
import StatusPedido from "../../../enums/statusPedido";
import {mapActions, mapState} from "vuex/dist/vuex.esm.browser";
import {api} from "../../../global";
import PedidoModel from "../../../models/pedidoModel";
import {mapGetters} from "vuex";

export default {
    name: "FiltroListPedidos",
    computed: {
        ...mapState('pedidos', ['filtroPedidos', 'pedidos']),
        ...mapGetters('pedidos', ['pedidosEmpty']),
        aceitos() {
            return StatusPedido.Aceito;
        },
        finalizados() {
            return StatusPedido.Finalizado;
        }
    },
    methods: {
        ...mapActions('pedidos', ['setFiltroPedidos', 'setLoading', 'setPedidos', 'setPedidoSelected']),
        isFiltroSelected(filtro) {
            return filtro === this.filtroPedidos;
        },
        async filtrar(status) {
            try {
                const statusOld = this.filtroPedidos;

                this.setLoading({show: true, text: "Buscando pedidos..."});
                this.setFiltroPedidos(status);

                const data = {"status": status?.value};

                const response = await api.get("pedidos", {params: data});

                if (response.data.success) {
                    const pedidos = response.data.data.list.map(it => PedidoModel.fromJson(it));
                    this.setPedidos(pedidos);

                    if (!this.pedidosEmpty) {
                        this.setPedidoSelected(this.pedidos[0]);
                    }
                } else {
                    this.setFiltroPedidos(statusOld);
                }
            } finally {
                this.setLoading(false)
            }
        }
    }
}
</script>

<style scoped>
.filtro-list-pedido .card-filtro {
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
}

.filtro-list-pedido .btn-card-filtro {
    border-radius: 16px;
    text-transform: none;
    letter-spacing: 1px;
    font-size: 13px;
    font-weight: 700;
    flex-grow: 1;
}
</style>