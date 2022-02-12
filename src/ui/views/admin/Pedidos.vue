<template>
    <div>
        <v-layout v-if="!pedidosEmpty" wrap class="pedidos">
            <v-flex class="flex-lista-pedidos" xs12 md3>
                <ListPedidos/>
            </v-flex>

            <v-flex grow class="flex-pedido pl-8" xs12 md9>
                <ResumoPedido/>
            </v-flex>
        </v-layout>

        <h2 v-else>Nenhum pedido</h2>

        <LoadingDefault :loading="loading.show" :message="loading.text"/>
    </div>
</template>

<script>
import ListPedidos from "../../components/Pedidos/ListPedidos";
import ResumoPedido from "../../components/Pedidos/ResumoPedido";
import LoadingDefault from "../../components/shared/LoadingDefault";
import {api} from "../../../global";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: "Pedidos",
    components: {LoadingDefault, ListPedidos, ResumoPedido},
    data: () => ({}),
    computed: {
        ...mapState('pedidos', ['pedidoSelected', 'pedidos', 'loading']),
        ...mapGetters('pedidos', ['pedidosEmpty'])
    },
    methods: {
        ...mapActions('pedidos', ['setPedidoSelected', 'setPedidos', 'setLoading']),
    },
    async created() {
        try {
            this.setLoading({show: true, text: "Buscando pedidos..."});

            const response = await api.get("pedidos");

            if (response.data.success) {
                this.setPedidos(response.data.data.list);

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
</style>