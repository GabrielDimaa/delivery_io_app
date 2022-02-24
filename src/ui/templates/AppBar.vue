<template>
    <v-app-bar dense elevation="0" height="76" color="white" app>
        <v-btn small rounded fab elevation="0" @click="changeDrawer" color="var(--primary-color)" outlined>
            <v-icon color="var(--primary-color)" :size="iconSize">mdi-menu</v-icon>
        </v-btn>

        <h1 class="ml-6">{{$route.name}}</h1>

        <v-spacer/>

        <div class="status-loja ml-8">
            <span id="descricao-status-loja">Aberto</span>
            <div id="cor-status-loja"></div>
        </div>

        <div class="sair ml-8 pr-8 pl-8">
            <v-icon color="var(--grey-color)" :size="iconSize" class="icon-sair mr-4">mdi-logout</v-icon>
            <span id="text-sair">Sair</span>
        </div>
    </v-app-bar>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "AppBar",
    data: () => ({
        iconSize: 20,
    }),
    methods: {
        ...mapActions(["changeDrawer"])
    }
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}

.sair {
    display: flex;
    align-items: center;
    border-left: 2px solid #dadadc;
    height: 68%;
}

.sair #text-sair {
    font-size: 14px;
    font-weight: 500;
    color: var(--grey-color);
}

.status-loja {
    display: flex;
    align-items: center;
}

.status-loja #descricao-status-loja {
    font-weight: 500;
    margin-right: 16px;
}

.status-loja #cor-status-loja {
    border-radius:100%;
    background: #0BB14E;
    height: 14px;
    width: 14px;
}
</style>