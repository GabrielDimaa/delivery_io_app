<template>
    <v-app-bar dense elevation="0" height="76" color="white" app>
        <v-btn small rounded fab elevation="0" @click="changeDrawer" color="var(--primary-color)" outlined>
            <v-icon color="var(--primary-color)" :size="iconSize">mdi-menu</v-icon>
        </v-btn>

        <h1 class="ml-6">{{$route.name}}</h1>

        <v-spacer/>

        <div class="status-loja">
            <v-icon color="rgb(11, 192, 78)" class="mr-1" size="12">mdi-circle</v-icon>
            Loja aberta
        </div>

        <a href="" @click.prevent="fazerLogout" class="sair ml-8 pr-8 pl-8" v-ripple>
            <v-icon color="var(--grey-color)" :size="iconSize" class="icon-sair mr-4">mdi-logout</v-icon>
            <span id="text-sair">Sair</span>
        </a>
    </v-app-bar>
</template>

<script>
import {mapActions} from "vuex";
import LocalStorageService from "../../services/localStorageService";

export default {
    name: "AppBar",
    data: () => ({
        iconSize: 20,
    }),
    methods: {
        ...mapActions(['changeDrawer']),
        fazerLogout() {
            LocalStorageService.clearAccessToken();
            this.$router.replace("/admin/login");
        }
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
    height: 68%;
    text-decoration: none;
}


.sair:hover {
    background: var(--opacity-grey-color);
    border-radius: 6px;
}

.sair #text-sair {
    font-size: 14px;
    font-weight: 500;
    color: var(--grey-color);
}

.status-loja {
    border-radius: 22px;
    padding: 6px 18px;
    background: rgb(11, 192, 78, 0.2);
    color: rgb(11, 192, 78);
    font-weight: 500;
}
</style>