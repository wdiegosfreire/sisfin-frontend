import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

import constants from "./plugins/Constants";

import VueSimpleAlert from "vue-simple-alert";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);
Vue.use(constants);

Vue.use(require('vue-moment'));

library.add(fas);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.filter('currency', function (value, precision) {
	if (!precision || (precision != 2 && precision != 3))
		precision = 2;

	const formatter = new Intl.NumberFormat("pt-BR", {
		style: 'decimal',
		minimumFractionDigits: precision,
		maximumFractionDigits: precision
	});

	return formatter.format(value);
});

Vue.filter('traceAccount', function (account) {
	let result = "";

	if (!account) {
		return result;
	}

	result += account.name;

	if (account.accountParent) {
		result = `${account.accountParent.name} :: ${result}`;

		if (account.accountParent.accountParent) {
			result = `${account.accountParent.accountParent.name} :: ${result}`;
		}
	}
	
	return result;
});

new Vue({
	vuetify,
	store,
	router,
	render: h => h(App)
}).$mount('#app')
