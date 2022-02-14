<template>
    <v-card id="card-pedido" elevation="2">
        <div class="info-pedido">
            <div class="card-header flex">
                <h3 id="title">Pedido #{{pedidoSelected.codigo_pedido}}</h3>
                <div>
                    <v-icon class="mr-1" size="20" color="#FF3D00">mdi-clock-outline</v-icon>
                    Horário do pedido: {{horarioPedidoDisplay}}
                </div>
            </div>

            <TileResumoPedido label="Entrega prevista:" value="20:32" icon="mdi-timer-outline"
                              color="var(--secondary-color)"/>
            <TileResumoPedido label="Tipo de entrega:" :value="tipoEntregaDisplay" icon="mdi-moped"
                              color="var(--primary-color)"/>

            <v-divider class="mt-3 mb-3"></v-divider>

            <TileResumoPedido label="Cliente:" :value="pedidoSelected.nome" icon="mdi-account" color="brown"/>
            <TileResumoPedido label="Telefone:" :value="formatarTelefone(pedidoSelected.telefone)" icon="mdi-phone-classic" color="#54C964"/>
            <TileResumoPedido v-if="!isRetirada" label="Endereço:" :value="enderecoClienteDisplay"
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
                                <div class="produto">{{item.descricao}}</div>
                                <div class="preco-unitario-produto">{{qtdValorUnitarioItemDisplay(item)}}</div>
                                <div class="valor-total-produto">{{toMoney(item.valor_total)}}</div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>

        <div class="buttons-pedido mt-3">
            <v-btn class="btn" outlined color="var(--error-color)">Cancelar</v-btn>
            <v-btn class="btn white--text" style="font-weight: 400" color="var(--primary-color)">Aceitar</v-btn>
        </div>
    </v-card>
</template>

<script>
import TileResumoPedido from "./TileResumoPedido";
import TipoEntrega from "../../../enums/tipoEntrega";
import {mapGetters, mapState} from "vuex";
import {formatterPhone, toMoney} from "../../../utils/utils";

export default {
    name: "ResumoPedido",
    components: {TileResumoPedido},
    data: () => ({
        items: [
            {
                img: require('../../../assets/img/hamburguer.png'),
                produto: "Hambúrguer duplo com queijo cheddar",
                precoUnitario: "1UN x R$24,00",
                valorTotal: "R$24,00"
            },
            {
                img: require('../../../assets/img/coca.png'),
                produto: "Coca cola lata",
                precoUnitario: "2UN x R$4,50",
                valorTotal: "R$9,00"
            },
        ],
    }),
    computed: {
        ...mapState('pedidos', ['pedidoSelected']),
        ...mapGetters('pedidos', ['itensPedido', 'enderecoClienteDisplay', 'horarioPedidoDisplay']),
        isRetirada() {
              return this.pedidoSelected.tipo_entrega === TipoEntrega.Retirada.value;
        },
        tipoEntregaDisplay() {
            if (this.isRetirada) {
                return TipoEntrega.Retirada.descricao;
            } else {
                return TipoEntrega.Entrega.descricao;
            }
        }
    },
    methods: {
        toMoney(value) {
            return toMoney(value, true);
        },
        formatarTelefone(value) {
            return formatterPhone(value);
        },
        qtdValorUnitarioItemDisplay(item) {
            return `${item.quantidade}UN x ${this.toMoney(item.valor_unitario)}`;
        }
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
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2));
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
    width: 160px;
    border-radius: 10px;
    border-width: 2px;
    text-transform: none;
    font-size: 16px;
    font-weight: 700;
}
</style>