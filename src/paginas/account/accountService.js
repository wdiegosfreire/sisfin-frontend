import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

import Constants from "../../plugins/Constants";

export default {
   name: "accountService",

   mixins: [ transactionApi, message ],

   data() {
      return {
         showSearchField: false
      };
   },

   methods: {
      accessModule() {
         let account = {
            userIdentity: this.$store.state.userIdentity
         };

         this.$_transaction_post("/account/accessModule", account).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.accountList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration(accountComboLevelOneSelected) {
         let account = {
            userIdentity: this.$store.state.userIdentity
         };

         if (accountComboLevelOneSelected) {
            accountComboLevelOneSelected.userIdentity = this.$store.state.userIdentity;
            account = accountComboLevelOneSelected;
         }

         this.$_transaction_post("/account/accessRegistration", account).then(response => {
            this.$store.commit("setGlobalAccountListComboLevelOne", response.data.map.accountListComboLevelOne);
            this.$store.commit("setGlobalAccountListComboLevelTwo", response.data.map.accountListComboLevelTwo);

            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessEdition(account) {
         account.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/account/accessEdition", account).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_ENTITY, response.data.map.account);
            this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         let account = {
            filter: filterValue,
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/account/executeSearch", account).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.accountList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration(account) {
         if (this.isMissingRequiredFields(account))
            return;

         account.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/account/executeRegistration", account).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.accountList);
            this.closeForm(account);
            this.$_message_showSuccess();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition(account) {
         if (this.isMissingIdentity(account) || this.isMissingRequiredFields(account))
            return;

         account.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/account/executeEdition", account).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.accountList);
            this.closeForm(location);
            this.$_message_showSuccess();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(account) {
         this.$confirm(Constants.message.DELETE).then(() => {
            account.userIdentity = this.$store.state.userIdentity;

            this.$_transaction_post("/account/executeExclusion", account).then(response => {
               this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.accountList);
               this.$_message_showSuccess();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      },

      updateParentAccount(account, accountParent) {
         account.accountParent = null;

         if (account && accountParent)
            account.accountParent = accountParent;
      },

      isMissingIdentity(account) {
         if (!account.identity) {
            this.$_message_showRequired("Missing account identity.");
            return true;
         }

         return false;
      },

      isMissingRequiredFields(account) {
         if (!account.accountParent || !account.accountParent.identity) {
            this.$_message_showRequired("Missing account parent.");
            return;
         }

         if (!account.name || !account.name.trim()) {
            this.$_message_showRequired("Missing account name.");
            return;
         }

         return false;
      },

      cleanForm(account) {
         if (!account.identity) {
            account.name = "";
            account.level = "";
            account.icon = "";
            account.accountParent = null;

            this.$store.commit("setGlobalAccountListComboLevelTwo", []);
         }

         account.note = "";
      },

      closeForm(account) {
         account.identity = "";
         account.name = "";
         account.level = "";
         account.icon = "";
         account.note = "";
         account.accountParent = null;

         this.$store.commit("setGlobalAccountListComboLevelTwo", []);
         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      },

      setIcon(account, faIcon) {
         account.icon = faIcon;
         account.name += " ";
         account.name = account.name.trim();
      }
   }
}
