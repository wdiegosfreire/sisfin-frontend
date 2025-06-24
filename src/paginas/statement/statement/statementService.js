import transactionApi from "../../../components/axios/transaction/transactionApi.js";
import message from "../../../components/mixins/message.js";

import Constants from "../../../plugins/Constants";

export default {
	name: "statementService",

	mixins: [ transactionApi, message ],

	data() {
		return {
			showSearchField: false
		};
	},

	methods: {
		accessModule() {
			let statement = {
				userIdentity: this.$store.state.userIdentity
			}

			this.$_transaction_post("/statement/accessModule", statement).then(response => {
				this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.statementList);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		accessRegistration(bankComboSelected) {
			let statement = {
				userIdentity: this.$store.state.userIdentity
			};

			if (bankComboSelected) {
				bankComboSelected.userIdentity = this.$store.state.userIdentity;

				let statementType = {
					userIdentity: this.$store.state.userIdentity,
					bank: bankComboSelected
				};

				statement.statementType = statementType;
			}

			this.$_transaction_post("/statement/accessRegistration", statement).then(response => {
				this.$store.commit("setGlobalBankListCombo", response.data.map.bankListCombo);
				this.$store.commit("setGlobalStatementTypeListCombo", response.data.map.statementTypeListCombo);

				this.$store.commit(Constants.store.SET_GLOBAL_ENTITY, {identity: null, statementFile: null});
				this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		accessEdition(statement) {
			statement.userIdentity = this.$store.state.userIdentity;

			this.$_transaction_post("/statement/accessEdition", statement).then(response => {
				this.$store.commit("setGlobalEntity", response.data.map.statement);
				this.$store.commit("setGlobalLocationListCombo", response.data.map.locationListCombo);
				this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);
				this.$store.commit("setGlobalAccountListComboTarget", response.data.map.accountListComboTarget);
				this.$store.commit("setGlobalPaymentMethodListCombo", response.data.map.paymentMethodListCombo);

				this.$store.commit("showGlobalDialog", true);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},
  
		executeSearch(filterValue) {
			let statement = {
				filter: filterValue,
				userIdentity: this.$store.state.userIdentity
			}

			this.$_transaction_post("/statement/executeSearch", statement).then(response => {
				this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.statementList);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		async executeRegistration(statement) {
			if (this.isMissingRequiredFields(statement)) {
				return;
			}

			statement.userIdentity = this.$store.state.userIdentity;

			const toBase64 = file => new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = reject;
			});

			statement.statementFile = await toBase64(statement.statementFile);

			this.$_transaction_post("/statement/executeRegistration", statement).then(() => {
				this.closeForm(statement);
				this.$_message_showSuccess();
				this.accessModule();
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		executeEdition(statement) {
			if (this.isMissingIdentity(statement) || this.isMissingRequiredFields(statement)) {
				return;
			}

			for (let statementItem of statement.statementItemList) {
				statementItem.statement = null;
			}

			statement.userIdentity = this.$store.state.userIdentity;
			this.$_transaction_post("/statement/executeEdition", statement).then(() => {
				this.$_message_showSuccess();
				this.accessEdition(statement);
			}).catch(error => {
				this.$_message_handleError(error);
			});
		},

		executeExclusion(statement) {
			this.$confirm(Constants.message.DELETE).then(() => {
				statement.userIdentity = this.$store.state.userIdentity;

				this.$_transaction_post("/statement/executeExclusion", statement).then(() => {
					this.$_message_showSuccess();
					this.accessModule();
				}).catch(error => {
					this.$_message_handleError(error);
				});
			});
		},

		isMissingIdentity(statement) {
			if (!statement.identity) {
				this.$_message_showRequired("Missing statement identity.");
				return true;
			}

			return false;
		},

		isMissingRequiredFields(statement) {
			if (!statement.statementType?.name) {
				this.$_message_showRequired("Mising statement type. Please, choose a bank to load the statement type list.");
				return true;
			}

			if (!statement.identity && !statement.statementFile) {
				this.$_message_showRequired("Mising statement file.");
				return true;
			}

			return false;
		},

		cleanForm(statement) {
			statement.statementType = {};
			statement.statementFile = null;
		},

		closeForm(statement) {
			statement.statementFile = null;
			this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
		}
	}
}