<template>
    <div id="not-found">
        <v-icon size="100" color="var(--primary-color)">mdi-telescope</v-icon>
        <span>404</span>
        <h1>Página não encontrada</h1>
        <router-link to="/" id="link">
            <v-btn class="btn" height="46" color="var(--primary-color)">
                Ir para página inicial
                <v-icon size="22" right dark>mdi-arrow-right</v-icon>
            </v-btn>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "NotFound"
}
</script>

<style scoped>
#not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

#not-found h1 {
    text-align: center;
}

#not-found span {
    font-size: 46px;
    font-weight: 400;
    margin-top: 12px;
}

#not-found #link {
    text-decoration: none;
}

#not-found .btn {
    color: var(--background-color);
    text-transform: none;
    letter-spacing: 1px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 12px;
    padding: 0 40px;
}
</style>