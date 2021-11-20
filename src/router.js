import Vue from "vue";
import Router from "vue-router";

import User from "./paginas/user/User.vue";

import Resumo from "./paginas/resumo/Resumo.vue";
import Movimento from "./paginas/movimento/Movimento.vue";
import Extrato from "./paginas/extrato/Extrato.vue";
import Conta from "./paginas/conta/Conta.vue";
import Estabelecimento from "./paginas/estabelecimento/Estabelecimento.vue";
import FormaPagamento from "./paginas/formaPagamento/FormaPagamento.vue";
import Desejo from "./paginas/desejo/Desejo.vue";
import Automovel from "./paginas/automovel/Automovel.vue";
import Supermercado from "./paginas/supermercado/Supermercado.vue";

Vue.use(Router);

const routes = [
    { path: "/", name: "user", component: User },
    { path: "/resumo", name: "resumo", component: Resumo },
    { path: "/movimento", name: "movimento", component: Movimento },
    { path: "/extrato", name: "extrato", component: Extrato },
    { path: "/conta", name: "conta", component: Conta },
    { path: "/estabelecimento", name: "estabelecimento", component: Estabelecimento },
    { path: "/formaPagamento", name: "formaPagamento", component: FormaPagamento },
    { path: "/desejo", name: "desejo", component: Desejo },
    { path: "/automovel", name: "automovel", component: Automovel },
    { path: "/supermercado", name: "supermercado", component: Supermercado }
];

export default new Router({
    routes
});