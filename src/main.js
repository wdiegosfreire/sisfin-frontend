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
   faTrashCan as fasTrashCan,
   faArrowsRotate as fasArrowsRotate,
   faMagnifyingGlass as fasMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

import {
   faTrashCan as farTrashCan,
   faPenToSquare as farPenToSquare
} from '@fortawesome/free-regular-svg-icons'

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);

library.add(
   fasBars, fasPlus, fasTrashCan, fasArrowsRotate, fasMagnifyingGlass,
   farTrashCan, farPenToSquare);
Vue.component('fa-icon', FontAwesomeIcon);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
