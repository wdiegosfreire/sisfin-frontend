import transactionApi from "../../../components/axios/transaction/transactionApi.js";
import message from "../../../components/mixins/message.js";

import Constants from "../../../plugins/Constants";

export default {
	name: "statementTypeService",

	mixins: [ transactionApi, message ],

	data() {
		return {
			showSearchField: false
		};
	},

	methods: {
		accessModule() {
			let statementType = {
				userIdentity: this.$store.state.userIdentity
			}

			this.$_transaction_post("/statementType/accessModule", statementType).then(response => {
				this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.statementTypeList);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		accessRegistration() {
			let statementType = {
				userIdentity: this.$store.state.userIdentity
			};

			this.$_transaction_post("/statementType/accessRegistration", statementType).then(response => {
				this.$store.commit("setGlobalBankListCombo", response.data.map.bankListCombo);
				this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);

				this.$store.commit("showGlobalDialog", true);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		accessEdition(statementType) {
			statementType.userIdentity = this.$store.state.userIdentity;
			this.$_transaction_post("/statementType/accessEdition", statementType).then(response => {
				this.$store.commit(Constants.store.SET_GLOBAL_ENTITY, response.data.map.statementType);
				this.$store.commit("setGlobalBankListCombo", response.data.map.bankListCombo);
				this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);

				this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},
  
		executeSearch(filterValue) {
			let statementType = {
				filter: filterValue,
				userIdentity: this.$store.state.userIdentity
			}

			this.$_transaction_post("/statementType/executeSearch", statementType).then(response => {
				this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.statementTypeList);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		executeRegistration(statementType) {
			if (this.isMissingRequiredFields(statementType))
				return;

			statementType.userIdentity = this.$store.state.userIdentity;
			this.$_transaction_post("/statementType/executeRegistration", statementType).then(() => {
				this.closeForm(statementType);
				this.$_message_showSuccess();
				this.accessModule();
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		executeEdition(statementType) {
			if (this.isMissingIdentity(statementType) || this.isMissingRequiredFields(statementType))
				return;

			statementType.userIdentity = this.$store.state.userIdentity;
			this.$_transaction_post("/statementType/executeEdition", statementType).then(() => {
				this.closeForm(statementType);
				this.$_message_showSuccess();
				this.accessModule();
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		executeExclusion(statementType) {
			this.$confirm(Constants.message.DELETE).then(() => {
				statementType.userIdentity = this.$store.state.userIdentity;

				this.$_transaction_post("/statementType/executeExclusion", statementType).then(() => {
					this.$_message_showSuccess();
					this.accessModule();
				}).catch(error => {
					this.$_message_handleError(error);
				});
			});
		},

		isMissingIdentity(statementType) {
			if (!statementType.identity) {
				this.$_message_showRequired("Missing statement type identity.");
				return true;
			}

			return false;
		},

		isMissingRequiredFields(statementType) {
			if (!statementType.name || !statementType.name.trim()) {
				this.$_message_showRequired("Mising statement type sname.");
				return true;
			}

			return false;
		},

		cleanForm(statementType) {
			if (!statementType.identity) {
				statementType.name = "";
			}
		},

		closeForm(statementType) {
			statementType.identity = null;
			statementType.name = null;
			statementType.bank = null;
			statementType.accountSource = null;

			this.$store.commit("setGlobalBankListCombo", []);
			this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
		}
	}
}