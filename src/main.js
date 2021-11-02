import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
