import transactionApi from "../../../components/axios/transaction/transactionApi.js";
import message from "../../../components/mixins/message.js";

import Constants from "../../../plugins/Constants";

export default {
   name: "bankService",

   mixins: [ transactionApi, message ],

   data() {
      return {
         showSearchField: false
      };
   },

   methods: {
      accessModule() {
         let bank = {
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/bank/accessModule", bank).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.bankList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
      },

      accessEdition(bank) {
         bank.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/bank/accessEdition", bank).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_ENTITY, response.data.map.bank);
            this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         let bank = {
            filter: filterValue,
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/bank/executeSearch", bank).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.bankList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration(bank) {
         if (this.isMissingRequiredFields(bank))
            return;

         bank.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/bank/executeRegistration", bank).then(() => {
            this.closeForm(bank);
            this.$_message_showSuccess();
            this.accessModule();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition(bank) {
         if (this.isMissingIdentity(bank) || this.isMissingRequiredFields(bank))
            return;

         bank.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/bank/executeEdition", bank).then(() => {
            this.closeForm(bank);
            this.$_message_showSuccess();
            this.accessModule();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(bank) {
         this.$confirm(Constants.message.DELETE).then(() => {
            bank.userIdentity = this.$store.state.userIdentity;

            this.$_transaction_post("/bank/executeExclusion", bank).then(() => {
               this.$_message_showSuccess();
               this.accessModule();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      },

      isMissingIdentity(bank) {
         if (!bank.identity) {
            this.$_message_showRequired("Missing bank identity.");
            return true;
         }

         return false;
      },

      isMissingRequiredFields(bank) {
         if (!bank.name || !bank.name.trim()) {
            this.$_message_showRequired("Mising bank sname.");
            return true;
         }

         return false;
      },

      cleanForm(bank) {
         if (!bank.identity) {
            bank.name = "";
         }
      },

      closeForm(bank) {
         bank.identity = null;
         bank.name = "";

         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      }
   }
}