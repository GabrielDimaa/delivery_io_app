import Vue from 'vue';
import Router from 'vue-router';
import store from '../stores/store';
import Admin from "../ui/views/admin/Admin";
import Login from "../ui/views/admin/Login";
import Home from "../ui/views/Home";
import NotFound from "../ui/views/NotFound";
import Dashboard from "../ui/views/admin/Dashboard";
import Pedidos from "../ui/views/admin/Pedidos";
import Produtos from "../ui/views/admin/Produtos";
import Categorias from "../ui/views/admin/Categorias";
import TaxasEntrega from "../ui/views/admin/TaxasEntrega";
import LocalStorageService from "../services/localStorageService";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "*",
            component: NotFound,
        },
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/admin/login",
            name: "Login",
            component: Login,
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: "/",
                    name: "Dashboard",
                    component: Dashboard,
                    // meta: {requiresAuth: true}
                },
                {
                    path: "/admin/pedidos",
                    name: "Pedidos",
                    component: Pedidos,
                    meta: {requiresAuth: true}
                },
                {
                    path: "/admin/produtos",
                    name: "Produtos",
                    component: Produtos,
                    meta: {requiresAuth: true}
                },
                {
                    path: "/admin/categorias",
                    name: "Categorias",
                    component: Categorias,
                    meta: {requiresAuth: true}
                },
                {
                    path: "/admin/taxas-entrega",
                    name: "Taxas de entrega",
                    component: TaxasEntrega,
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = LocalStorageService.getAccessToken();

        if (token) {
            if (store.state.isLogged) {
                next()
            } else {
                LocalStorageService.clearAccessToken();
                next({path: "/admin/login"})
            }
        } else {
            next({path: "*"});
        }
    } else {
        next();
    }
});

export default router;