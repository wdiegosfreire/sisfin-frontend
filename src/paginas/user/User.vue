<template>
	<div class="d-flex justify-center">
		<v-card max-width="500">
			<v-img src="../../assets/imagens/financas-pessoais.jpg">
				<v-card-title class="headline">Authentication</v-card-title>
			</v-img>
	
			<v-card-text>
				<v-text-field label="E-mail" v-model="user.email" append-icon="mdi-mail" />
				<v-text-field label="Password" type="password" v-model="password" append-icon="mdi-lock" />
			</v-card-text>
	
			<v-card-actions>
				<v-btn color="button" width="150" @click="executeAuthentication">Confirm</v-btn>
				<v-btn color="button" width="150" @click="resetForm">Clear</v-btn>
			</v-card-actions>
	
			<v-card-actions v-if="maintenance">
				<v-alert outlined prominent type="error" class="text-left">
					The service "MAINTENANCE" is not responding. We'll try again after each 30 seconds until the service is back again.
				</v-alert>
			</v-card-actions>
			<v-card-actions v-if="transaction">
				<v-alert outlined prominent type="error" class="text-left">
					The service "TRANSACTION" is not responding. We'll try again after each 30 seconds until the service is back again.
				</v-alert>
			</v-card-actions>

			<v-card-text class="text-right">
				<v-btn @click="accessResetPassword" color="primary" class="mt-1" plain>Forgot your password?</v-btn>
				<v-btn @click="accessRegistration" color="primary" class="mt-2" plain>Don't have an account? Sign up and get started!</v-btn>
			</v-card-text>
		</v-card>

	</div>
</template>

<script>
import maintenanceApi from "../../components/axios/maintenance/maintenanceApi.js";
import transactionApi from "../../components/axios/transaction/transactionApi.js";
import userService from "./userService.js";

import message from "../../components/mixins/message.js";

export default {
	name: "User",
	mixins: [ maintenanceApi, transactionApi, userService, message ],

	data() {
		return {
			maintenance: false,
			transaction: false,
			timeoutDelay: 30000
		}
	},

	methods: {
		checkMicroServiceMaintenance() {
			let _this = this;

			this.$_maintenance_get(`/imrunning`).then(() => {
				_this.maintenance = false;
			}).catch(() => {
				_this.maintenance = true;
				setTimeout(function() {_this.checkMicroServiceMaintenance();}, _this.timeoutDelay);
			});
		},

		checkMicroServiceTransaction() {
			let _this = this;

			this.$_transaction_get(`/imrunning`).then(() => {
				_this.transaction = false;
			}).catch(() => {
				_this.transaction = true;
				setTimeout(function() {_this.checkMicroServiceTransaction();}, _this.timeoutDelay);
			});
		}
	},

	created: function () {
		this.$_message_console(process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT);

		this.checkMicroServiceMaintenance();
		this.checkMicroServiceTransaction();
	}
}
</script>