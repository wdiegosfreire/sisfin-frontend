import apiInstance from "../../api/apiInstance";
import maintenanceApiInstance from "../maintenance/maintenanceApiInstance";
import transactionApiInstance from "../transaction/transactionApiInstance";

export default {
	name: "apiConfig",
	methods: {
		createInterceptors() {
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