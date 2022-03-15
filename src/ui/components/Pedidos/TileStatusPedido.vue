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
import {getColorStatus} from "../../../utils/utils";

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
            return getColorStatus(this.status);
        }
    }
}
</script>

<style scoped>
</style>