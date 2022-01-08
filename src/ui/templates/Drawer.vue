<template>
    <v-navigation-drawer color="white" floating v-model="drawer" app>
        <v-container>
            <v-layout row class="pa-4">
                <v-img src="@/assets/img/logo.png" max-width="180"/>
            </v-layout>

            <v-layout row class="pa-5">
                <p id="menu-title">Menu</p>
            </v-layout>

            <v-layout row v-for="item in itensMenu" :key="item.text" class="item-menu ma-3">
                <v-icon class="icon-menu mr-4">{{item.icon}}</v-icon>
                <span class="text-menu">{{item.text}}</span>
            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "Drawer",
    data() {
        return {
            itensMenu: [
                {text: "Dashboard", icon: 'mdi-view-dashboard'},
                {text: "Pedidos", icon: "mdi-room-service"},
                {text: "Cardápio", icon: "mdi-book-open-variant"},
                {text: "Produtos", icon: "mdi-silverware"},
                {text: "Categorias", icon: "mdi-shape"},
                {text: "Taxas de entrega", icon: "mdi-moped-outline"},
            ],
        }
    },
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(value) {
                this.$store.state.drawer = value
            }
        }
    }
}
</script>

<style scoped>
#menu-title {
    color: var(--grey-color);
    font-weight: 500;
}

.icon-menu {
    color: var(--grey-color);
}

.text-menu {
    color: var(--grey-color);
    font-size: 16px;
    font-weight: 500;
}

.item-menu {
    padding: 10px 12px;
}

.item-menu:hover {
    background: var(--opacity-grey-color);
    border-radius: 6px;
}
</style>