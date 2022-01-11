<template>
    <div class="container-pedidos">
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
    </div>
</template>

<script>
import TitleContent from "./TitleContent";
export default {
    name: "ListPedidos",
    components: {TitleContent},
    data: () => ({
        testes: Array(10),
    })
}
</script>

<style scoped>
.container-pedidos {
    height: 100%;
}

.container-pedidos .lista-pedidos {
    height: calc(100vh - var(--height-appbar) - (var(--padding-content) * 2) - 50px);
    padding-right: 8px;
    overflow: auto;
}

.container-pedidos .card-pedido-resumido {
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
    justify-content: flex-end;
    align-items: flex-end;
}

.card-pedido-resumido .flex-btn .btn-aceitar {
    text-transform: none;
    height: 16px;
    width: 16px;
    font-size: 14px;
    alignment: right;
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