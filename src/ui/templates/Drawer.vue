<template>
    <v-navigation-drawer color="white" floating v-model="drawer" app>
        <v-container>
            <v-layout row class="pa-4">
                <router-link to="/">
                    <v-img src="@/assets/img/logo.png" max-width="180"/>
                </router-link>
            </v-layout>

            <v-layout row class="pa-5">
                <p id="menu-title">Menu</p>
            </v-layout>

            <v-layout row v-for="item in itensMenu" :key="item.text" class="ma-3">
                <router-link v-ripple v-if="routerCurrent !== item.route" :to="item.route" class="item-menu">
                    <v-icon class="icon-menu mr-4">{{item.icon}}</v-icon>
                    <span class="text-menu">{{item.text}}</span>
                </router-link>
                <router-link v-ripple v-else :to="item.route" class="item-menu-selected">
                    <v-icon class="icon-menu-selected mr-4">{{item.icon}}</v-icon>
                    <span class="text-menu-selected">{{item.text}}</span>
                </router-link>
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
                {text: "Dashboard", icon: "mdi-view-dashboard", route: "/"},
                {text: "Pedidos", icon: "mdi-room-service", route: "/pedidos"},
                {text: "Cardápio", icon: "mdi-book-open-variant", route: "/cardapio"},
                {text: "Produtos", icon: "mdi-silverware", route: "/produtos"},
                {text: "Categorias", icon: "mdi-shape", route: "/categorias"},
                {text: "Taxas de entrega", icon: "mdi-moped", route: "/taxas-entrega"},
            ]
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
        },
        routerCurrent() {
            return this.$route.path;
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

.icon-menu-selected {
    color: var(--primary-color);
}

.text-menu {
    color: var(--grey-color);
    font-size: 16px;
    font-weight: 500;
}

.text-menu-selected {
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 600;
}

.item-menu {
    padding: 10px 12px;
    text-decoration: none;
    width: 100%;
    background-position: center;
    transition: background 0.8s;
}

.item-menu:hover {
    background: var(--opacity-grey-color);
    border-radius: 6px;
}

.item-menu-selected {
    background: var(--opacity-primary-color);
    border-radius: 6px;
    padding: 10px 12px;
    text-decoration: none;
    width: 100%;
}
</style>