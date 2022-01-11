<template>
    <v-layout wrap class="pedidos">
        <v-flex class="flex-lista-pedidos" xs12 md3>
            <TitleContent title="Pedidos"/>

            <div class="lista-pedidos">
                <div v-for="teste in testes" :key="teste">
                    <v-card height="126" class="card-pedido-resumido mt-2" elevation="2">
                        <div class="card-header">
                            <span class="codigo-pedido">#00350</span>
                            <small class="hora-pedido">20:36</small>
                        </div>

                        <div class="text-info">Gabriel de Matos Hainzenreder</div>

                        <div class="flex-entrega-valor-total">
                            <div class="entrega-info">
                                <div class="previsao-entrega mt-1">
                                    <v-icon size="16" color="#FF3D00">mdi-clock-outline</v-icon>
                                    <div class="text-info ml-1">Previsão: 21:06</div>
                                </div>

                                <div class="tipo-entrega mt-1">
                                    <v-icon size="16" color="var(--primary-color)">mdi-store</v-icon>
                                    <div class="text-info ml-1">Retirada no local</div>
                                </div>
                            </div>

                            <div class="valor-total mt-1">R$56,00</div>
                        </div>

                        <div class="flex-btn">
                            <v-btn class="btn-aceitar" text color="#0BB865">Aceitar</v-btn>
                        </div>
                    </v-card>
                </div>
            </div>

        </v-flex>

        <v-flex grow class="flex-pedido pl-8" xs12 md9>
            <v-card id="card-pedido" elevation="2">
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import TitleContent from "../../components/TitleContent";

export default {
    name: "Pedidos",
    components: {TitleContent},
    data: () => ({
        testes: Array(10),
    })
}

</script>

<style scoped>
.pedidos,
.pedidos .flex-lista-pedidos,
.pedidos .flex-pedido {
    height: 100%;
}

.pedidos .lista-pedidos {
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2) - 50px);
    padding-right: 8px;
    overflow: auto;
}

.pedidos .card-pedido-resumido {
    border-radius: 16px;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
}

.card-pedido-resumido .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-pedido-resumido .card-header .codigo-pedido {
    font-size: 15px;
    font-weight: 600;
}

.card-pedido-resumido .card-header .hora-pedido {
    font-weight: 500;
}

.card-pedido-resumido .text-info {
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--grey-color);
}

.card-pedido-resumido .flex-entrega-valor-total {
    display: flex;
    justify-content: space-between;
}

.card-pedido-resumido .entrega-info {
    display: flex;
    flex-direction: column;
}

.card-pedido-resumido .entrega-info .previsao-entrega,
.card-pedido-resumido .entrega-info .tipo-entrega {
    display: flex;
}

.card-pedido-resumido .flex-entrega-valor-total .valor-total {
    font-size: 15px;
    font-weight: 700;
}

.card-pedido-resumido .flex-btn {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: end;
    align-items: end;
}

.card-pedido-resumido .flex-btn .btn-aceitar {
    text-transform: none;
    height: 16px;
    width: 16px;
    font-size: 14px;
    alignment: right;
}

.pedidos .flex-pedido #card-pedido {
    border-radius: 16px;
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2));
}

*::-webkit-scrollbar {
    width: 7px;
}

*::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.15);
    border-radius: 20px;
}

*::-webkit-scrollbar-thumb:hover {
    background-color: rgba(128, 128, 128, 0.4);
}

*::-webkit-scrollbar-thumb:active {
    background-color: rgba(128, 128, 128, 0.8);
}
</style>