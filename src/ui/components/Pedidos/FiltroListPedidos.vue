<template>
    <div class="d-flex filtro-list-pedido">
        <v-card class="card-filtro mr-4" height="34" width="100%" elevation="2">
            <v-btn class="btn-card-filtro" elevation="0" height="100%" @click="filtrar(novos)"
                   :color="isFiltroSelected(novos) ? 'var(--primary-color)' : 'white'" :dark="isFiltroSelected(novos)">
                Novos
            </v-btn>

            <v-btn class="btn-card-filtro" elevation="0" height="100%" @click="filtrar(aceitos)"
                   :color="isFiltroSelected(aceitos) ? 'var(--primary-color)' : 'white'" :dark="isFiltroSelected(aceitos)">
                Aceitos
            </v-btn>

            <v-btn class="btn-card-filtro" elevation="0" height="100%" @click="filtrar(finalizados)"
                   :color="isFiltroSelected(finalizados) ? 'var(--primary-color)' : 'white'" :dark="isFiltroSelected(finalizados)">
                Finaliz.
            </v-btn>
        </v-card>
    </div>
</template>

<script>
import StatusPedido from "../../../enums/statusPedido";
import {mapActions, mapState} from "vuex/dist/vuex.esm.browser";

export default {
    name: "FiltroListPedidos",
    computed: {
        ...mapState('pedidos', ['filtroPedidos']),
        novos() {
            return StatusPedido.EmAberto;
        },
        aceitos() {
            return StatusPedido.Aceito;
        },
        finalizados() {
            return StatusPedido.Finalizado;
        }
    },
    methods: {
        ...mapActions('pedidos', ['setFiltroPedidos']),
        isFiltroSelected(filtro) {
            return filtro === this.filtroPedidos;
        },
        async filtrar(status) {
            this.setFiltroPedidos(status);
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