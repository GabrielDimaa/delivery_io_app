<template>
    <v-card id="card-pedido" elevation="2">
        <div class="info-pedido">
            <div class="card-header flex">
                <h3 id="title">Pedido #{{ pedidoSelected.codigoPedido }}</h3>
                <div>
                    <v-icon class="mr-1" size="20" color="#FF3D00">mdi-clock-outline</v-icon>
                    Horário do pedido: {{ pedidoSelected.horarioPedidoDisplay }}
                </div>
            </div>

            <div class="flex justify-space-between">
                <div>
                    <TileResumoPedido label="Entrega prevista:" value="20:32" icon="mdi-timer-outline"
                                      color="var(--secondary-color)"/>
                    <TileResumoPedido label="Tipo de entrega:" :value="pedidoSelected.tipoEntrega.descricao"
                                      icon="mdi-moped"
                                      color="var(--primary-color)"/>
                </div>
                <TileStatusPedido :status="pedidoSelected.status"/>
            </div>

            <v-divider class="mt-3 mb-3"></v-divider>

            <TileResumoPedido label="Cliente:" :value="pedidoSelected.nome" icon="mdi-account" color="brown"/>
            <TileResumoPedido label="Telefone:" :value="formatarTelefone(pedidoSelected.telefone)"
                              icon="mdi-phone-classic" color="#54C964"/>
            <TileResumoPedido v-if="!isRetirada" label="Endereço:" :value="pedidoSelected.enderecoClienteDisplay"
                              icon="mdi-map-marker" color="red"/>

            <h4 class="mt-4">Itens</h4>

            <v-list class="list-itens">
                <template v-for="item in itensPedido">
                    <v-list-item :key="item.produto" style="padding: 0">
                        <v-list-item-avatar size="50" rounded>
                            <v-img :src="item.img" width="50"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <div class="list-item-content">
                                <div class="produto">{{ item.descricao }}</div>
                                <div class="preco-unitario-produto">{{ qtdValorUnitarioItemDisplay(item) }}</div>
                                <div class="valor-total-produto">{{ toMoney(item.valorTotal) }}</div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>

        <div class="buttons-pedido mt-3">
            <v-btn v-if="!hideButtonCancelar" class="btn" outlined color="var(--error-color)"
                   @click="cancelarPedido(pedidoSelected)">
                Cancelar
            </v-btn>
            <v-btn v-if="descricaoAcaoProximoStatus != null" class="btn white--text" style="font-weight: 400"
                   color="var(--primary-color)" @click="alterarStatus(pedidoSelected)">
                {{ descricaoAcaoProximoStatus }}
            </v-btn>
        </div>
    </v-card>
</template>

<script>
import TileResumoPedido from "./TileResumoPedido";
import TipoEntrega from "../../../enums/tipoEntrega";
import {mapActions, mapGetters, mapState} from "vuex";
import {showError} from "../../../global";
import StatusPedido from "../../../enums/statusPedido";
import TileStatusPedido from "./TileStatusPedido";
import api from "../../../services/api";
import {formatterPhone, toMoney} from "../../../utils/utils";

export default {
    name: "ResumoPedido",
    components: {TileStatusPedido, TileResumoPedido},
    computed: {
        ...mapState('pedidos', ['pedidoSelected']),
        ...mapGetters('pedidos', ['itensPedido', 'proximoStatus', 'descricaoAcaoProximoStatus', 'hideButtonCancelar']),
        isRetirada() {
            return this.pedidoSelected.tipoEntrega === TipoEntrega.Retirada;
        }
    },
    methods: {
        ...mapActions('pedidos', ['setLoading']),
        toMoney(value) {
            return toMoney(value, true);
        },
        formatarTelefone(value) {
            return formatterPhone(value);
        },
        qtdValorUnitarioItemDisplay(item) {
            return `${item.quantidade}UN x ${this.toMoney(item.valorUnitario)}`;
        },
        async alterarStatus(pedido) {
            try {
                this.setLoading({show: true, text: "Alterando status do pedido..."});

                const data = {
                    "id_pedido": pedido.idPedido,
                    "status": this.proximoStatus.value
                };

                const response = await api.put(`pedidos/status/${pedido.idPedido}`, data);

                if (!response.data.success) {
                    showError("Houve um erro ao concluir a operação!");
                }

                pedido.status = StatusPedido.fromIndex(response.data.data.status);
            } catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
        async cancelarPedido(pedido) {
            try {
                this.setLoading({show: true, text: "Cancelando pedido..."});

                const response = await api.put(`pedidos/cancelar/${pedido.idPedido}`);

                if (!response.data.success) {
                    showError("Houve um erro ao concluir a operação!");
                }

                pedido.status = StatusPedido.fromIndex(response.data.data.status);
                pedido.canceladoAt = response.data.data.cancelado_at;
            } catch (err) {
                showError(err);
            } finally {
                this.setLoading(false);
            }
        },
    }
}
</script>

<style scoped>
.flex {
    display: flex;
    align-items: center;
}

#card-pedido {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    padding: 24px;
}

#card-pedido .info-pedido {
    flex-grow: 1;
    overflow: auto;
}

#card-pedido .card-header {
    justify-content: space-between;
    align-items: center;
}

#card-pedido .card-header #title {
    font-weight: 800;
    font-size: 22px;
}

#card-pedido .card-header > div {
    font-weight: 500;
}

.list-itens .list-item-content {
    display: flex;
    align-items: center;
}

.list-itens .list-item-content .produto {
    flex-grow: 1;
    font-size: 14px;
    font-weight: 500;
}

.list-itens .list-item-content .preco-unitario-produto {
    min-width: 120px;
    width: 120px;
    text-align: right;
    font-size: 14px;
    font-weight: 400;
    color: var(--grey-color);
}

.list-itens .list-item-content .valor-total-produto {
    min-width: 120px;
    width: 120px;
    text-align: right;
    font-size: 14px;
    font-weight: 700;
}

#card-pedido .buttons-pedido {
    flex-grow: 0;
    display: flex;
    justify-content: space-between;
}

.buttons-pedido .btn {
    height: 40px;
    min-width: 160px;
    border-radius: 10px;
    border-width: 2px;
    text-transform: none;
    font-size: 16px;
    font-weight: 700;
}
</style>