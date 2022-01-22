<template>
    <v-btn elevation="0" color="transparent" @click="onClick" fab x-small>
        <v-icon :color="color">{{icon}}</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "ButtonActionTable",
    props: {
        icon: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        onClick: {
            type: Function,
            required: true
        }
    }
}
</script>

<style scoped>
</style>