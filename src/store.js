import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
      globalObjectiveMovement: {
         objective: {}
      },

      globalMonth: "",
      globalYear: "",

		globalResult: [],
		globalEntity: {},
		globalDialog: false,
		globalLoading: false,

      userName: "",
		userIdentity: "",
      sessionToken: "",

		message: {
			severity: "",
			summary: "",
			detailList: [],
			date: new Date()
		},

      globalLocationListCombo: [],
      globalAccountListComboSource: [],
      globalAccountListComboTarget: [],
      globalPaymentMethodListCombo: [],
      globalAccountListComboLevelOne: [],
      globalAccountListComboLevelTwo: [],

      money2: { decimal: ',', thousands: '.', prefix: 'R$ ', precision: 2 },
      money3: { decimal: ',', thousands: '.', prefix: 'R$ ', precision: 3 }
	},

	mutations: {
      setGlobalYear(state, payload) { state.globalYear = payload; },
      setGlobalMonth(state, payload) { state.globalMonth = payload; },
		setGlobalResult(state, payload) { state.globalResult = payload; },
		setGlobalEntity(state, payload) { state.globalEntity = payload; },
		setGlobalLoading(state, payload) { state.globalLoading = payload; },

		showGlobalDialog(state, payload) { state.globalDialog = payload; },

		setUserName(state, payload) {
			window.localStorage.userName = payload;
			state.userName = payload;
		},

      setUserIdentity(state, payload) {
			window.localStorage.userIdentity = payload;
			state.userIdentity = payload;
		},

      setSessionToken(state, payload) {
         window.localStorage.sessionToken = payload;
         state.sessionToken = payload;
		},

		showMessage(state, payload) {
			state.message = {
				severity: payload.severity,
				summary: payload.summary,
				detailList: payload.detail,
				date: new Date()
			}
		},

      
      setGlobalLocationListCombo(state, payload) { state.globalLocationListCombo = payload; },
      setGlobalAccountListComboSource(state, payload) { state.globalAccountListComboSource = payload; },
      setGlobalAccountListComboTarget(state, payload) { state.globalAccountListComboTarget = payload; },
      setGlobalPaymentMethodListCombo(state, payload) { state.globalPaymentMethodListCombo = payload; },
      setGlobalAccountListComboLevelOne(state, payload) { state.globalAccountListComboLevelOne = payload; },
      setGlobalAccountListComboLevelTwo(state, payload) { state.globalAccountListComboLevelTwo = payload; },
	}
});