import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

import Constants from "../../plugins/Constants";

export default {
   name: "accountService",

   mixins: [ transactionApi, message ],

   data() {
      return {
         accountForm: {},
         accountListResult: [],
         accountListComboLevelOne: [],
         accountListComboLevelTwo: [],
         showSearchField: false
      };
   },

   methods: {
      async accessModule() {
         try {
            let account = {
               userIdentity: this.$store.state.userIdentity
            };

            const response = await this.$_transaction_post("/account/accessModule", account);
            this.accountListResult = response.data.map.accountList;
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },

      async accessRegistration(accountComboLevelOneSelected) {
         try {
            let account = {
               userIdentity: this.$store.state.userIdentity
            };
   
            if (accountComboLevelOneSelected) {
               accountComboLevelOneSelected.userIdentity = this.$store.state.userIdentity;
               account = accountComboLevelOneSelected;
            }

            const response = await this.$_transaction_post("/account/accessRegistration", account);
            this.accountListComboLevelOne = response.data.map.accountListComboLevelOne;
            this.accountListComboLevelTwo = response.data.map.accountListComboLevelTwo;

            this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },

      async accessEdition(account) {
         try {
            account.userIdentity = this.$store.state.userIdentity;
            const response = await this.$_transaction_post("/account/accessEdition", account);
            this.accountForm = response.data.map.account;

            this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },
  
      async executeSearch(filterValue) {
         try {
            let account = {
               filter: filterValue,
               userIdentity: this.$store.state.userIdentity
            };

            const response = await this.$_transaction_post("/account/executeSearch", account);
            this.accountListResult = response.data.map.accountList;
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },

      async executeRegistration(account) {
         try {
            account.userIdentity = this.$store.state.userIdentity;
            await this.$_transaction_post("/account/executeRegistration", account);

            this.closeForm(account);
            this.$_message_showSuccess();
            this.accessModule();
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },

      async executeEdition(account) {
         try {
            account.userIdentity = this.$store.state.userIdentity;
            await this.$_transaction_post("/account/executeEdition", account);

            this.closeForm(account);
            this.$_message_showSuccess();
            this.accessModule();
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },

      async executeExclusion(account) {
         try {
            await this.$confirm(Constants.message.DELETE);

            account.userIdentity = this.$store.state.userIdentity;
            await this.$_transaction_post("/account/executeExclusion", account);

            this.$_message_showSuccess();
            this.accessModule();
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      },

      closeForm(account) {
         account.identity = "";
         account.name = "";
         account.level = "";
         account.icon = "";
         account.note = "";
         account.accountParent = null;

         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      }
   }
}
