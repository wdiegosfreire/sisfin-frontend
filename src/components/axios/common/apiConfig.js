import apiInstance from "../../api/apiInstance";
import maintenanceApiInstance from "../maintenance/maintenanceApiInstance";
import transactionApiInstance from "../transaction/transactionApiInstance";

import message from "../../mixins/message.js";

export default {
	name: "apiConfig",
	mixins: [ message ],
	methods: {
		createInterceptors() {
			this.$_message_console(process.env.VUE_APP_ENVIRONMENT);

			apiInstance.interceptors.request.use((config) => {
				this.$store.commit("setGlobalLoading", true);
				return config;
			});

			apiInstance.interceptors.response.use((response) => {
				this.$store.commit("setGlobalLoading", false);
				return response;
			});

			maintenanceApiInstance.interceptors.request.use((config) => {
				this.$store.commit("setGlobalLoading", true);
				return config;
			});

			maintenanceApiInstance.interceptors.response.use((response) => {
				this.$store.commit("setGlobalLoading", false);
				return response;
			});

			transactionApiInstance.interceptors.request.use((config) => {
				this.$store.commit("setGlobalLoading", true);
				return config;
			});

			transactionApiInstance.interceptors.response.use((response) => {
				this.$store.commit("setGlobalLoading", false);
				return response;
			});
		}
	}
};