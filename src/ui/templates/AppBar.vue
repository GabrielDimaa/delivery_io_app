<template>
    <v-app-bar dense elevation="0" height="76" color="white" app>
        <v-btn small rounded fab elevation="0" @click="CHANGE_DRAWER" color="var(--primary-color)" outlined>
            <v-icon color="var(--primary-color)" :size="iconSize">mdi-menu</v-icon>
        </v-btn>

        <v-spacer/>

        <div id="notificacao">
            <v-badge dot color="var(--error-color)"></v-badge>
            <v-icon :size="iconSize" id="icon-notificacao">mdi-bell</v-icon>
        </div>

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
import {mapMutations} from "vuex";

export default {
    name: "AppBar",
    data: () => ({
        iconSize: 20,
    }),
    methods: {
        ...mapMutations(["CHANGE_DRAWER"])
    }
}
</script>

<style scoped>
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

#notificacao {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#icon-notificacao {
    color: var(--dark-color);
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