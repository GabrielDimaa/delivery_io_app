<template>
    <v-app-bar dense elevation="0" height="76" color="white" app>
        <v-btn small rounded fab elevation="0" @click="changeDrawer" color="var(--primary-color)" outlined>
            <v-icon color="var(--primary-color)" :size="iconSize">mdi-menu</v-icon>
        </v-btn>

        <h1 class="ml-6">{{$route.name}}</h1>

        <v-spacer/>

        <div class="status-loja">
            <v-icon color="rgb(11, 192, 78)" class="mr-1" size="22">mdi-check-circle</v-icon>
            Loja aberta
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
    border: 1px rgb(11, 192, 78) solid;
    border-radius: 4px;
    padding: 6px 18px;
    color: rgb(11, 192, 78);
    font-weight: 500;
}
</style>