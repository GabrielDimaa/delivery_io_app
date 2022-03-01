<template>
    <v-navigation-drawer color="white" floating v-model="drawer" app>
            <div class="pa-4">
                <router-link to="/admin">
                    <v-img src="@/assets/img/logo.png" max-width="180"/>
                </router-link>
            </div>

            <div class="pt-5 pl-5 pb2">
                <p id="menu-title">Menu</p>
            </div>

            <div style="display: flex; align-items: center" class="ml-1 mr-1" v-for="item in itensMenu" :key="item.text">
                <div :style="[(routerCurrent === item.route) ? {'background': 'var(--primary-color)'} : '']" class="marker"></div>

                <router-link v-ripple v-if="routerCurrent !== item.route" :to="item.route" class="item-menu item-menu-margin">
                    <v-icon class="icon-menu mr-4">{{item.icon}}</v-icon>
                    <span class="text-menu">{{item.text}}</span>
                </router-link>
                <router-link v-ripple v-else :to="item.route" class="item-menu-selected item-menu-margin">
                    <v-icon class="icon-menu-selected mr-4">{{item.icon}}</v-icon>
                    <span class="text-menu-selected">{{item.text}}</span>
                </router-link>
            </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "Drawer",
    data() {
        return {
            itensMenu: [
                {text: "Dashboard", icon: "mdi-view-dashboard", route: "/admin/"},
                {text: "Pedidos", icon: "mdi-room-service", route: "/admin/pedidos"},
                {text: "Cardápio", icon: "mdi-book-open-variant", route: "/admin/cardapio"},
                {text: "Produtos", icon: "mdi-silverware", route: "/admin/produtos"},
                {text: "Categorias", icon: "mdi-shape", route: "/admin/categorias"},
                {text: "Taxas de entrega", icon: "mdi-moped", route: "/admin/taxas-entrega"},
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

.marker {
    width: 4px;
    height: 30px;
    transition: background 0.6s;
}

.icon-menu {
    color: var(--grey-color);
}

.icon-menu-selected {
    color: var(--primary-color);
}

.text-menu {
    color: var(--grey-color);
    font-size: 15px;
    font-weight: 500;
}

.text-menu-selected {
    color: var(--primary-color);
    font-size: 15px;
    font-weight: 600;
    transition: background 0.8s;
}

.item-menu {
    padding: 12px;
    text-decoration: none;
    width: 100%;
    background-position: center;
}

.item-menu:hover {
    background: var(--opacity-grey-color);
    border-radius: 6px;
}

.item-menu-margin {
    margin: 4px 12px;
}

.item-menu-selected {
    background: var(--opacity-primary-color);
    border-radius: 6px;
    padding: 12px;
    text-decoration: none;
    width: 100%;
}
</style>