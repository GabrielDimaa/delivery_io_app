<template>
    <v-container class="content">
        <router-view></router-view>
    </v-container>
</template>

<script>
export default {
    name: "Content"
}
</script>

<style scoped>
.content {
    padding: var(--padding-content);
    height: 100%;
}
</style>