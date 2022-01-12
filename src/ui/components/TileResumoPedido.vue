<template>
    <div class="tile-resumo-pedido mt-3">
        <div class="label">
            <v-icon class="mr-1" size="20" :color="color">{{icon}}</v-icon>
            {{label}}
        </div>
        <small class="value">{{value}}</small>
    </div>
</template>

<script>
export default {
    name: "TileResumoPedido",
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        color: {
            required: true
        }
    }
}
</script>

<style scoped>
.tile-resumo-pedido {
    display: flex;
    align-items: center;
}

.tile-resumo-pedido .label {
    font-size: 14px;
    font-weight: 500;
    margin-right: 6px;
    color: var(--grey-color);
}

.tile-resumo-pedido .value {
    font-size: 14px;
    font-weight: 500;
}
</style>