import Vue from "vue";
import Router from "vue-router";

import User from "./paginas/user/User.vue";

import Resumo from "./paginas/resumo/Resumo.vue";
import Objective from "./paginas/objective/Objective.vue";
import ObjectiveMovement from "./paginas/objectiveMovement/ObjectiveMovement.vue";
import Extrato from "./paginas/extrato/Extrato.vue";
import Account from "./paginas/account/Account.vue";
import Location from "./paginas/location/Location.vue";
import PaymentMethod from "./paginas/paymentMethod/PaymentMethod.vue";
import Desejo from "./paginas/desejo/Desejo.vue";
import Automovel from "./paginas/automovel/Automovel.vue";
import Supermercado from "./paginas/supermercado/Supermercado.vue";

Vue.use(Router);

const routes = [
    { path: "/", name: "user", component: User },
    { path: "/resumo", name: "resumo", component: Resumo },
    { path: "/objective", name: "objective", component: Objective },
    { path: "/objectiveMovement", name: "objectiveMovement", component: ObjectiveMovement },
    { path: "/extrato", name: "extrato", component: Extrato },
    { path: "/account", name: "account", component: Account },
    { path: "/location", name: "location", component: Location },
    { path: "/paymentMethod", name: "paymentMethod", component: PaymentMethod },
    { path: "/desejo", name: "desejo", component: Desejo },
    { path: "/automovel", name: "automovel", component: Automovel },
    { path: "/supermercado", name: "supermercado", component: Supermercado }
];

export default new Router({
    routes
});