import transactionApi from "../../components/axios/transaction/transactionApi.js";

// Mixins
import format from "../../components/mixins/format.js";
import message from "../../components/mixins/message.js";

import Constants from "../../plugins/Constants";

export default {
   name: "objectiveMovementService",
   mixins: [transactionApi, message, format ],
	data() {
      return {
         showSearchField: false,
         monthList: [
            {monthName: "January", monthNumber: "01"},
            {monthName: "February", monthNumber: "02"},
            {monthName: "March", monthNumber: "03"},
            {monthName: "April", monthNumber: "04"},
            {monthName: "May", monthNumber: "05"},
            {monthName: "June", monthNumber: "06"},
            {monthName: "July", monthNumber: "07"},
            {monthName: "August", monthNumber: "08"},
            {monthName: "September", monthNumber: "09"},
            {monthName: "October", monthNumber: "10"},
            {monthName: "November", monthNumber: "11"},
            {monthName: "December", monthNumber: "12"}
         ]
      };
   },

   methods: {
      accessModule() {
         if (!this.$store.state.globalMonth || !this.$store.state.globalYear) {
            this.$_message_showError("Period not found");
            return;
         }

         let objective = {
            userIdentity: this.$store.state.userIdentity,
            objectiveMovementList: [
               {
                  userIdentity: this.$store.state.userIdentity,
                  paymentDate: new Date(this.$store.state.globalYear + "-" + this.$store.state.globalMonth + "-01 12:00:00")
               }
            ]
         };

         this.$_transaction_post("/objective/accessModule", objective).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.objectiveList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         let objective = {
            userIdentity: this.$store.state.userIdentity
         };
   
         this.$_transaction_post("/objective/accessRegistration", objective).then(response => {
            this.$store.commit("setGlobalLocationListCombo", response.data.map.locationListCombo);
            this.$store.commit("setGlobalPaymentMethodListCombo", response.data.map.paymentMethodListCombo);
            this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);
            this.$store.commit("setGlobalAccountListComboTarget", response.data.map.accountListComboTarget);
   
            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration(objective) {
         objective.userIdentity = this.$store.state.userIdentity;

         for (let objectiveMovement of objective.objectiveMovementList) {
            objectiveMovement.dueDate = new Date(this.$_format_toAmericanDate(objectiveMovement.dueDate) + " 12:00:00");
            objectiveMovement.paymentDate = new Date(this.$_format_toAmericanDate(objectiveMovement.paymentDate) + " 12:00:00");
         }

         this.$_transaction_post("/objective/executeRegistration", objective).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.objectiveList);
            this.$_message_showSuccess();
            this.accessModule();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      cleanForm(objective) {
         objective.description = "";
         objective.location = {};
         objective.objectiveItemList = [];
         objective.objectiveMovementList = [];
      },

      closeForm(objective) {
         this.cleanForm(objective);
         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      },

      accessEdition(objective) {
         objective.userIdentity = this.$store.state.userIdentity;

         this.$_transaction_post("/objective/accessEdition", objective).then(response => {
            this.$store.commit("setGlobalEntity", response.data.map.objective);
            this.$store.commit("setGlobalLocationListCombo", response.data.map.locationListCombo);
            this.$store.commit("setGlobalPaymentMethodListCombo", response.data.map.paymentMethodListCombo);
            this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);
            this.$store.commit("setGlobalAccountListComboTarget", response.data.map.accountListComboTarget);

            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition(objective) {
         objective.userIdentity = this.$store.state.userIdentity;

         for (let objectiveMovement of objective.objectiveMovementList) {
            objectiveMovement.dueDate = new Date(this.$_format_toAmericanDate(objectiveMovement.dueDate) + " 12:00:00");
            objectiveMovement.paymentDate = new Date(this.$_format_toAmericanDate(objectiveMovement.paymentDate) + " 12:00:00");
         }

         this.$_transaction_post("/objective/executeEdition", objective).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.objectiveList);
            this.$_message_showSuccess();
            this.accessModule();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(objective) {
         this.$confirm(Constants.message.DELETE).then(() => {
            objective.userIdentity = this.$store.state.userIdentity;

            this.$_transaction_post("/objective/executeExclusion", objective).then(() => {
               this.$_message_showSuccess();
               this.accessModule();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      }
   }
}
