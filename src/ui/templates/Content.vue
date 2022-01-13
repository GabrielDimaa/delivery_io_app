<template>
    <div class="content">
        <router-view></router-view>
    </div>
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