import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

import Constants from "../../plugins/Constants";

export default {
   name: "locationService",

   mixins: [ transactionApi, message ],

   data() {
      return {
         showSearchField: false
      };
   },

   methods: {
      accessModule() {
         let location = {
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/location/accessModule", location).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.locationList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
      },

      accessEdition(location) {
         location.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/location/accessEdition", location).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_ENTITY, response.data.map.location);
            this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         let location = {
            filter: filterValue,
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/location/executeSearch", location).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.locationList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration(location) {
         if (this.isMissingRequiredFields(location))
            return;

         location.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/location/executeRegistration", location).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.locationList);
            this.closeForm(location);
            this.$_message_showSuccess();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition(location) {
         if (this.isMissingIdentity(location) || this.isMissingRequiredFields(location))
            return;

         location.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/location/executeEdition", location).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.locationList);
            this.closeForm(location);
            this.$_message_showSuccess();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(location) {
         this.$confirm(Constants.message.DELETE).then(() => {
            location.userIdentity = this.$store.state.userIdentity;

            this.$_transaction_post("/location/executeExclusion", location).then(response => {
               this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.locationList);
               this.$_message_showSuccess();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      },

      isMissingIdentity(location) {
         if (!location.identity) {
            this.$_message_showRequired("Missing location identity.");
            return true;
         }

         return false;
      },

      isMissingRequiredFields(location) {
         if (!location.name || !location.name.trim()) {
            this.$_message_showRequired("Mising location sname.");
            return true;
         }

         if (!location.cnpj || !location.cnpj.trim()) {
            this.$_message_showRequired("Missing location CNPJ.");
            return true;
         }

         if (!location.branch || !location.branch.trim()) {
            this.$_message_showRequired("Missing location branch.");
            return true;
         }

         return false;
      },

      cleanForm(location) {
         if (!location.identity) {
            location.name = "";
            location.cnpj = "";
         }

         location.branch = "";
         location.note = "";
      },

      closeForm(location) {
         location.identity = "";
         location.name = "";
         location.cnpj = "";
         location.branch = "";
         location.note = "";

         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      }
   }
}