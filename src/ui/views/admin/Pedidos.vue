<template>
    <div>
        <v-layout wrap class="pedidos">
            <v-flex class="flex-lista-pedidos" xs12 md3>
                <ListPedidos/>
            </v-flex>

            <v-flex grow class="flex-pedido pl-8" xs12 md9>
                <ResumoPedido class="height-max" v-if="!pedidosEmpty"/>
                <div class="height-max d-flex column align-center justify-start" v-else>
                    <NenhumDadoEncontrado text="Nenhum pedido encontrado."/>
                </div>
            </v-flex>
        </v-layout>

        <LoadingDefault :loading="loading.show" :message="loading.text"/>
    </div>
</template>

<script>
import ListPedidos from "../../components/Pedidos/ListPedidos";
import ResumoPedido from "../../components/Pedidos/ResumoPedido";
import LoadingDefault from "../../components/shared/LoadingDefault";
import {api} from "../../../global";
import {mapActions, mapGetters, mapState} from "vuex";
import PedidoModel from "../../../models/pedidoModel";
import NenhumDadoEncontrado from "../../components/shared/NenhumDadoEncontrado";

export default {
    name: "Pedidos",
    components: {NenhumDadoEncontrado, LoadingDefault, ListPedidos, ResumoPedido},
    data: () => ({}),
    computed: {
        ...mapState('pedidos', ['pedidoSelected', 'pedidos', 'loading', 'filtroPedidos']),
        ...mapGetters('pedidos', ['pedidosEmpty'])
    },
    methods: {
        ...mapActions('pedidos', ['setPedidoSelected', 'setPedidos', 'setLoading', 'resetFields']),
    },
    async created() {
        try {
            this.resetFields();
            this.setLoading({show: true, text: "Buscando pedidos..."});

            const response = await api.get("pedidos");

            if (response.data.success) {
                const pedidos = response.data.data.list.map(it => PedidoModel.fromJson(it));
                this.setPedidos(pedidos);

                if (!this.pedidosEmpty) {
                    this.setPedidoSelected(this.pedidos[0]);
                }
            }
        } finally {
            this.setLoading(false);
        }
    }
}
</script>

<style scoped>
@import '../../../assets/css/webkit.css';

.pedidos,
.pedidos .flex-lista-pedidos,
.pedidos .flex-pedido {
    height: 100%;
}

.pedidos .height-max {
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2));
}
</style>