import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

import VueSimpleAlert from "vue-simple-alert";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
   faBars as fasBars,
   faPlus as fasPlus,
   faWrench as fasWrench,
   faGasPump as fasGasPump,
   faTrashCan as fasTrashCan,
   faUtensils as fasUtensils,
   faHeartPulse as fasHeartPulse,
   faPenToSquare as fasPenToSquare,
   faArrowsRotate as fasArrowsRotate,
   faMagnifyingGlass as fasMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);

library.add(
   fasBars, fasPlus, fasWrench, fasGasPump, fasTrashCan, fasUtensils, fasHeartPulse, fasPenToSquare, fasArrowsRotate, fasMagnifyingGlass);
Vue.component('fa-icon', FontAwesomeIcon);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
