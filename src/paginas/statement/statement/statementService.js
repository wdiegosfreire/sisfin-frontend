import statementApi from "../../../components/axios/statement/statementApi.js";
import message from "../../../components/mixins/message.js";

import Constants from "../../../plugins/Constants";

export default {
   name: "statementService",

   mixins: [ statementApi, message ],

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

         this.$_statement_post("/statement/accessModule", statement).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.statementList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         let statement = {
            userIdentity: this.$store.state.userIdentity
         };

         this.$_statement_post("/statement/accessRegistration", statement).then(response => {
            this.$store.commit("setGlobalBankListCombo", response.data.map.bankListCombo);

            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessEdition(statement) {
         statement.userIdentity = this.$store.state.userIdentity;
         this.$_statement_post("/statement/accessEdition", statement).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_ENTITY, response.data.map.statement);
            this.$store.commit("setGlobalBankListCombo", response.data.map.bankListCombo);

            this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         let statement = {
            filter: filterValue,
            userIdentity: this.$store.state.userIdentity
         }

         this.$_statement_post("/statement/executeSearch", statement).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.statementList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration(statement) {
         if (this.isMissingRequiredFields(statement))
            return;

         statement.userIdentity = this.$store.state.userIdentity;
         this.$_statement_post("/statement/executeRegistration", statement).then(() => {
            this.closeForm(statement);
            this.$_message_showSuccess();
            this.accessModule();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition(statement) {
         if (this.isMissingIdentity(statement) || this.isMissingRequiredFields(statement))
            return;

         statement.userIdentity = this.$store.state.userIdentity;
         this.$_statement_post("/statement/executeEdition", statement).then(() => {
            this.closeForm(statement);
            this.$_message_showSuccess();
            this.accessModule();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(statement) {
         this.$confirm(Constants.message.DELETE).then(() => {
            statement.userIdentity = this.$store.state.userIdentity;

            this.$_statement_post("/statement/executeExclusion", statement).then(() => {
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
         if (!statement.name || !statement.name.trim()) {
            this.$_message_showRequired("Mising statement sname.");
            return true;
         }

         return false;
      },

      cleanForm(statement) {
         if (!statement.identity) {
            statement.name = "";
         }
      },

      closeForm(statement) {
         statement.identity = null;
         statement.name = null;
         statement.bank = null;

         this.$store.commit("setGlobalBankListCombo", []);
         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      }
   }
}