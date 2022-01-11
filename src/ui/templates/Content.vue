<template>
    <div class="content">
        <Pedidos/>
    </div>
</template>

<script>
import Pedidos from "../views/admin/Pedidos";

export default {
    name: "Content",
    components: {Pedidos}
}
</script>

<style scoped>
.content {
    padding: var(--padding-content);
    height: 100%;
}
</style>