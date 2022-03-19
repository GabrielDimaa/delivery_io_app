<template>
    <v-container class="acompanhe-pedido pa-8">
        <v-row class="d-flex justify-center">
            <v-col cols="12" sm="12" md="10">
                <div class="d-flex justify-space-between align-center">
                    <router-link to="/" id="link">
                        <v-btn width="150" text class="btn btn-default" height="46" color="var(--primary-color)">
                            <v-icon left size="22" dark>mdi-arrow-left</v-icon>
                            Voltar
                        </v-btn>
                    </router-link>

                    <h1 id="title">Acompanhe seu pedido</h1>

                    <div style="width: 150px;"></div>
                </div>

                <div v-if="!loading && pedido" class="divider mt-7">
                    <v-progress-linear v-if="!finalizadoOuCancelado" color="var(--opacity-primary-color)"
                                       background-color="var(--primary-color)" height="3" indeterminate>
                    </v-progress-linear>
                    <v-divider v-else></v-divider>
                </div>

                <div v-if="!loading && pedido" class="d-flex">
                    <div class="mt-5 flex-grow-0">
                        <small>Número do pedido</small>
                        <h2>#{{ codigoPedido }}</h2>

                        <div class="mt-4"></div>

                        <small>Previsão de entrega</small>
                        <h2>12:56 - 13:30</h2>

                        <div class="mt-4"></div>

                        <v-btn class="btn pa-0" color="var(--primary-color)" text>Detalhes do pedido</v-btn>

                        <v-divider class="mt-5 mb-5"></v-divider>

                        <small>Avalie seu pedido</small>
                        <v-rating empty-icon="mdi-star-outline" full-icon="mdi-star" :readonly="avaliado"
                            hover length="5" v-model="rating" background-color="var(--primary-color)" color="var(--primary-color)">
                        </v-rating>
                        <v-btn v-if="!avaliado" @click="enviarAvaliacao" :loading="loadingRating" width="100%" height="34"
                               color="var(--primary-color)" class="btn btn-default">
                            Avaliar
                        </v-btn>
                    </div>

                    <div class="flex-grow-1 d-flex flex-column align-center">
                        <v-timeline id="timeline" :class="[finalizadoOuCancelado ? 'end' : '']" align-top dense>
                            <div v-for="(status, index) in historicoStatus" :key="status.idPedidoStatus">
                                <v-timeline-item :icon="showIcon(status, index) ? 'mdi-check' : ''" class="mt-6 d-flex" fill-dot small>
                                    <div class="timeline-item">
                                        {{ status.descricao }}
                                        <div class="hora">Hora: {{ status.horaDisplay }}</div>
                                    </div>
                                </v-timeline-item>
                            </div>
                        </v-timeline>
                    </div>
                </div>
            </v-col>
        </v-row>

        <div v-if="!loading && !pedido" class="pedido-nao-encontrado">
            <v-icon class="mb-6" size="100" color="var(--primary-color)">mdi-feature-search</v-icon>
            Pedido não encontrado
        </div>

        <LoadingDefault :loading="loading" message="Buscando pedido..."></LoadingDefault>
    </v-container>
</template>

<script>
import {apiWithoutAuthentication} from "../../services/api";
import PedidoModel from "../../models/pedidoModel";
import {showError, showSuccess} from "../../global";
import StatusPedido from "../../enums/statusPedido";
import LoadingDefault from "../components/shared/LoadingDefault";

export default {
    name: "AcompanhePedido",
    components: {LoadingDefault},
    data: () => ({
        loading: false,
        pedido: null,
        historicoStatus: [],
        loadingRating: false,
        rating: 0,
        avaliado: false
    }),
    computed: {
        finalizadoOuCancelado() {
            return this.historicoStatus?.some(it => it.status.value === StatusPedido.Finalizado.value || it.status.value === StatusPedido.Cancelado.value) ?? false;
        },
        codigoPedido() {
            return this.pedido?.codigoPedido ?? "";
        }
    },
    methods: {
        async enviarAvaliacao() {
            try {
                this.loadingRating = true;

                const response = await apiWithoutAuthentication.put(`pedidos/avaliar/${this.pedido.idPedido}`, {"avaliacao": this.rating});

                if (response.data.success) {
                    this.avaliado = true;
                    showSuccess("Avaliação enviada!");
                }
            } catch (err) {
                showError(err);
            } finally {
                this.loadingRating = false;
            }
        },
        showIcon(status, index) {
            return (index + 1) < this.historicoStatus.length || status.status.value === StatusPedido.Finalizado.value || status.status.value === StatusPedido.Cancelado.value;
        }
    },
    async mounted() {
        try {
            this.loading = true;

            const response = await apiWithoutAuthentication.get(`pedidos/${this.$route.params.id}`);

            if (response.data.success) {
                this.pedido = PedidoModel.fromJson(response.data.data);

                this.historicoStatus = this.pedido?.historicoStatus ?? [];

                const avaliacao = this.pedido?.avaliacao;
                if (avaliacao != null) {
                    this.rating = avaliacao;
                    this.avaliado = true;
                }
            }
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style scoped>
/* style para remover linha no final do circle */
.end::before {
    height: calc(100% - 28px)
}

.divider > .v-divider {
    border-width: 2px !important;
}

.acompanhe-pedido h1#title {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
}

.acompanhe-pedido #link {
    text-decoration: none;
}

.acompanhe-pedido .btn {
    text-transform: none;
    letter-spacing: 0;
    font-size: 16px;
    font-weight: 700;
}

.acompanhe-pedido .btn-default {
    color: var(--background-color);
    margin-top: 12px;
    padding: 0 40px;
    font-weight: 500;
}

.acompanhe-pedido small {
    font-size: 16px;
    font-weight: 500;
    color: var(--grey-color);
}

.acompanhe-pedido h2 {
    font-size: 26px;
    font-weight: 700;
}

.acompanhe-pedido #timeline .hora {
    font-size: 16px;
    font-weight: 400;
}

#timeline .timeline-item {
    font-size: 18px;
    font-weight: 600;
}

.pedido-nao-encontrado {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    font-size: 26px;
    font-weight: 800;
}
</style>