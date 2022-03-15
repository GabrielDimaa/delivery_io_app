<template>
    <v-card class="card" width="100%">
        <div>
            <v-card-title>
                Produtos mais vendidos
            </v-card-title>

            <VueApexCharts v-if="!loading" class="pa-2" type="radialBar" height="430" :options="chartOptions" :series="series"></VueApexCharts>
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
import api from "../../../services/api";

export default {
    name: "RelatorioTotalProdutos",
    components: {VueApexCharts},
    data: () => ({
        loading: false,
        series: [],
        stroke: {lineCap: 'round'},
        chartOptions: {
            labels: ['Prod 1', 'Prod 2', 'Prod 3'],
            legend: {
                show: true,
                floating: true,
                position: 'bottom',
                fontSize: '14px'
            },
            chart: {type: 'radialBar'},
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {fontSize: '36px'},
                        value: {fontSize: '28px'},
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: () => 0
                        }
                    }
                }
            }
        },
    }),
    methods: {
        setLoading(value) {
            this.loading = value;
        },
        carregarGrafico(produtos) {
            this.chartOptions.labels = produtos.map(it => it.descricao);
            const quantidades = produtos.map(it => it.quantidade);

            const total = quantidades.reduce((acc, value) => acc + value, 0);
            this.chartOptions.plotOptions.radialBar.dataLabels.total.formatter = () => total;

            const series = quantidades.map(it => {
                return parseFloat(((it * 100) / total).toFixed(2));
            });

            const somaPorcentagem = series.reduce((acc, value) => acc + value, 0);

            if (somaPorcentagem !== 100) {
                const diferenca = 100 - somaPorcentagem;

                series[0] = series[0] - diferenca;
            }

            this.series = series;
        },
        async carregarProdutos() {
            try {
                this.setLoading(true);

                const response = await api.get("produtos/produtos_mais_vendidos");

                if (response.data.success) {
                    const produtos = response.data.data;

                    this.carregarGrafico(produtos);
                }
            } finally {
                this.setLoading(false);
            }
        }
    },
    async created() {
        await this.carregarProdutos();
    }
}
</script>

<style scoped>
.card {
    border-radius: 12px;
}
</style>