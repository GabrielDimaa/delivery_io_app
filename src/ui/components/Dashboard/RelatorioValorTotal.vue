<template>
    <v-card class="card" width="100%">
        <div>
            <v-card-title class="d-flex justify-space-between">
                Valor total de vendas
                <v-item-group mandatory>
                    <v-item class="mr-2" v-slot="{ active, toggle }">
                        <v-chip active-class="primary white--text" :input-value="active" @click.native="setToday(true)" @click="toggle">
                            Hoje
                        </v-chip>
                    </v-item>

                    <v-item v-slot="{ active, toggle }">
                        <v-chip active-class="primary white--text" :input-value="active" @click.native="setToday(false)" @click="toggle">
                            Ontem
                        </v-chip>
                    </v-item>
                </v-item-group>
            </v-card-title>

            <VueApexCharts v-if="!loading" class="pa-2" type="area" height="410" :options="chartOptions" :series="series">
            </VueApexCharts>
            <div v-else class="d-flex justify-center align-center" style="height: 410px">
                <v-progress-circular size="66" color="var(--primary-color)" indeterminate
                                     background-color="var(--opacity-primary-color)">
                </v-progress-circular>
            </div>
        </div>
    </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import {api} from "../../../services/api";
import StatusPedido from "../../../enums/statusPedido";
import PedidoModel from "../../../models/pedidoModel";
import {toMoney} from "../../../utils/utils";

export default {
    name: "RelatorioValorTotal",
    components: {VueApexCharts},
    data: () => ({
        loading: false,
        isToday: true,
        series: [{data: [{}]}],
        chartOptions: {
            chart: {
                type: 'area',
                height: 160,
                sparkline: {
                    enabled: true
                },
            },
            tooltip: {
                enabled: true,
                y: {
                    title: {
                        formatter: () => ""
                    },
                    formatter: (value) => toMoney(value, true),
                },
            },
            stroke: {curve: 'smooth'},
            fill: {
                type: ['solid'],
                colors: ['var(--opacity-primary-color)']
            },
            yaxis: {min: 0},
            colors: ['var(--primary-color)'],
            title: {
                text: "R$ 0,00",
                offsetX: 0,
                style: {
                    fontSize: '24px',
                    fontWeight: 600
                }
            }
        }
    }),
    methods: {
        setLoading(value) {
            this.loading = value;
        },
        setToday(isToday = true) {
            if (this.isToday !== isToday) {
                this.isToday = isToday;
                this.carregarPedidos(isToday);
            }
        },
        valorTotalPedidos(pedidos) {
            return pedidos.reduce((acc, obj) => acc + parseFloat(obj.valorTotal), 0);
        },
        getSeries(pedidos) {
            const result = [];

            pedidos.forEach(
                r => {
                    const hour = r.createdAt.getHours();

                    if(!result[hour]) {
                        result[hour] = [];
                    }

                    result[hour].push(r);
                }
            );

            const series = [{
                "x": "-",
                "y": 0
            }];

            result.forEach((it, index) => series.push({
                "x": `${index} ${index > 1 ? "horas" : "hora"}`,
                "y": it.reduce((acc, obj) => acc + parseFloat(obj.valorTotal), 0)
            }));

            return [{data: series}];
        },
        async carregarPedidos(isToday = true) {
            try {
                this.setLoading(true);

                const dateNow = new Date();
                const dataInicio = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
                const dataFim = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23, 59, 59);

                if (!isToday) {
                    dataInicio.setDate(dataInicio.getDate() - 1);
                    dataFim.setDate(dataFim.getDate() - 1);
                }

                const data = {
                    "status": StatusPedido.Finalizado.value,
                    "data_inicio": dataInicio.toJSONLocal(),
                    "data_fim": dataFim.toJSONLocal()
                }

                const response = await api.get("pedidos", {params: data});

                if (response.data.success) {
                    const pedidos = response.data.data.list.map(it => PedidoModel.fromJson(it));

                    this.chartOptions.title.text = toMoney((this.valorTotalPedidos(pedidos)).toString(), true);
                    this.series = this.getSeries(pedidos);
                }
            } finally {
                this.setLoading(false);
            }
        }
    },
    async created() {
        await this.carregarPedidos();
    }
}
</script>

<style scoped>
.card {
    border-radius: 12px;
}
</style>