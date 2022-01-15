import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from "../ui/views/admin/Dashboard";
import Pedidos from "../ui/views/admin/Pedidos";
import Produtos from "../ui/views/admin/Produtos";
import Categorias from "../ui/views/admin/Categorias";
import TaxasEntrega from "../ui/views/admin/TaxasEntrega";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: "/pedidos",
            name: "Pedidos",
            component: Pedidos
        },
        {
            path: "/produtos",
            name: "Produtos",
            component: Produtos
        },
        {
            path: "/categorias",
            name: "Categorias",
            component: Categorias
        },
        {
            path: "/taxas-entrega",
            name: "Taxas de entrega",
            component: TaxasEntrega
        }
    ]
});