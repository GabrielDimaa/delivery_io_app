<template>
    <v-container id="dashboard" fluid class="ma-0 pa-0">
        <v-row>
            <CardsPedidosDashboard :value="totalPedidos.toString()" :text="'Total de pedidos'" :icon="'mdi-chart-timeline-variant-shimmer'"
                                   :background="totalPedidosColors.light" :loading="loading" :color="totalPedidosColors.dark"/>
            <CardsPedidosDashboard :value="emAberto.toString()" :text="'Em aberto'" :icon="'mdi-clipboard-clock-outline'"
                                   :background="emAbertoColors.light" :loading="loading" :color="emAbertoColors.dark"/>
            <CardsPedidosDashboard :value="finalizados.toString()" :text="'Finalizados'" :icon="'mdi-checkbox-multiple-marked-circle-outline'"
                                   :background="finalizadosColors.light" :loading="loading" :color="finalizadosColors.dark"/>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <RelatorioValorTotal/>
            </v-col>

            <v-col cols="12" md="6">
                <RelatorioTotalProdutos/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {getColorStatus} from "../../../utils/utils";
import StatusPedido from "../../../enums/statusPedido";
import CardsPedidosDashboard from "../../components/Dashboard/CardsPedidosDashboard";
import RelatorioValorTotal from "../../components/Dashboard/RelatorioValorTotal";
import RelatorioTotalProdutos from "../../components/Dashboard/RelatorioTotalProdutos";
import api from "../../../services/api";

export default {
    name: "Dashboard",
    components: {RelatorioTotalProdutos, RelatorioValorTotal, CardsPedidosDashboard},
    data: () => ({
        loading: false,
        totalPedidos: 0,
        emAberto: 0,
        finalizados: 0
    }),
    computed: {
        totalPedidosColors() {
            return {dark: "var(--primary-color)", light: "var(--opacity-primary-color)"};
        },
        emAbertoColors() {
            return getColorStatus(StatusPedido.EmAberto);
        },
        finalizadosColors() {
            return getColorStatus(StatusPedido.Finalizado);
        }
    },
    methods: {
        setLoading(value) {
            this.loading = value;
        }
    },
    async created() {
        try {
            this.setLoading(true);

            const response = await api.get("pedidos/counts");

            if (response.data.success) {
                const counts = response.data.data;

                this.totalPedidos = counts.total_pedidos ?? 0;
                this.emAberto = counts.em_aberto ?? 0;
                this.finalizados = counts.finalizados ?? 0;
            }
        } finally {
            this.setLoading(false);
        }
    }
}
</script>

<style scoped>

</style>