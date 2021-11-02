import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		globalResult: [],
		globalEntity: {},
		globalDialog: false,
		globalLoading: false,

		btpUsuario: {},
		logged: false,
		isProduction: false,
		message: {
			severity: "",
			summary: "",
			detailList: [],
			date: new Date()
		},
		authToken: "",
		userId: ""
	},
	mutations: {
		setGlobalResult(state, payload) {
			state.globalResult = payload;
		},

		setGlobalEntity(state, payload) {
			state.globalEntity = payload;
		},

		setGlobalLoading(state, payload) {
			state.globalLoading = payload;
		},

		// Codigo nao refatorado
		setBtpUsuario(state, payload) {
			window.localStorage.btpUsuario = payload;
			state.btpUsuario = payload;
		},

		setLogged(state, payload) {
			window.localStorage.logged = payload;
			state.logged = payload;
		},

		showGlobalDialog(state, payload) {
			state.globalDialog = payload;
		},

		setAuthToken(state, payload) {
			window.localStorage.authToken = payload;
			state.authToken = payload;
			state.logged = Boolean(state.authToken);
		},

		setUserId(state, payload) {
			window.localStorage.userId = payload;
			state.userId = payload;
		},

		showMessage(state, payload) {
			state.message = {
				severity: payload.severity,
				summary: payload.summary,
				detailList: payload.detail,
				date: new Date()
			}
		}
	}
});