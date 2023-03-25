import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

import constants from "./plugins/Constants";

import VueSimpleAlert from "vue-simple-alert";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);
Vue.use(constants);

Vue.use(require('vue-moment'));

library.add(fas);

Vue.component('fa-icon', FontAwesomeIcon);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
