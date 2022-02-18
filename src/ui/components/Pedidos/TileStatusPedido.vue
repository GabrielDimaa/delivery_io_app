<template>
    <div class="status-chip" :style="{
        background: getColor.light,
        border: '1px solid ' + getColor.dark,
        color: getColor.dark,
        'font-size': small ? '12px' : '14px',
        'font-weight': 500,
        'border-radius': '25px',
        padding: small ? '0 7px' : '2px 7px',
        'min-width': small ? 0 : '90px',
        'text-align': 'center'
    }">
        {{ status.descricao }}
    </div>
</template>

<script>
import StatusPedido from "../../../enums/statusPedido";

export default {
    name: "TileStatusPedido",
    props: {
        status: {
            type: StatusPedido,
            required: true
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        getColor() {
            switch (this.status) {
                case StatusPedido.Cancelado:
                    return {dark: "rgba(219, 22, 47)", light: "rgba(219, 22, 47, 0.2)"};
                case StatusPedido.Aceito:
                    return {dark: "rgba(10, 129, 209)", light: "rgba(10, 129, 209, 0.2)"};
                case StatusPedido.EmRotaDeEntrega:
                    return {dark: "rgba(234, 115, 23)", light: "rgba(234, 115, 23, 0.2)"};
                case StatusPedido.ProntoParaRetirada:
                    return {dark: "rgb(211, 0, 255)", light: "rgba(211, 0, 255, 0.2)"};
                case StatusPedido.Finalizado:
                    return {dark: "rgb(19,213,90)", light: "rgba(50, 232, 117, 0.2)"};
                case StatusPedido.EmAberto:
                default:
                    return {dark: "rgb(46, 196, 182)", light: "rgba(46, 196, 182, 0.2)"};
            }
        }
    }
}
</script>

<style scoped>
</style>