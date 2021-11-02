import apiInstance from "./apiInstance";

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
		}
	}
};