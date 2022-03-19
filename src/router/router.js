import Vue from 'vue';
import Router from 'vue-router';
import NotFound from "../ui/views/NotFound";
import Home from "../ui/views/Home";
import AcompanhePedido from "../ui/views/AcompanhePedido";
import Admin from "../ui/views/admin/Admin";
import Login from "../ui/views/admin/Login";
import Dashboard from "../ui/views/admin/Dashboard";
import Pedidos from "../ui/views/admin/Pedidos";
import Produtos from "../ui/views/admin/Produtos";
import Categorias from "../ui/views/admin/Categorias";
import Complementos from "../ui/views/admin/Complementos";
import TaxasEntrega from "../ui/views/admin/TaxasEntrega";
import LocalStorageService from "../services/localStorageService";
import {getPayloadJWT} from "../utils/utils";

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
            path: "/pedido/:id",
            name: "AcompanhePedido",
            component: AcompanhePedido,
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
                    meta: {requiresAuth: true}
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
                    path: "/admin/complementos",
                    name: "Complementos",
                    component: Complementos,
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

        if (token != null) {
            const tokenDecode = getPayloadJWT(token);

            if (!tokenDecode ||
                tokenDecode.name !== process.env.VUE_APP_NAME ||
                tokenDecode.email !== process.env.VUE_APP_EMAIL ||
                tokenDecode.key_payload !== process.env.VUE_APP_KEY_PAYLOAD) {
                next({path: "*"})
            } else {
                next()
            }
        } else {
            next({path: "*"});
        }
    } else {
        next();
    }
});

export default router;