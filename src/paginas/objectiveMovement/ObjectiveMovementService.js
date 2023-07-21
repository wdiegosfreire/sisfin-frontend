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

         let objectiveMovement = {
            userIdentity: this.$store.state.userIdentity,
            paymentDate: new Date(this.$store.state.globalYear + "-" + this.$store.state.globalMonth + "-01 12:00:00")
         };

         this.$_transaction_post("/objectiveMovement/accessModule", objectiveMovement).then(response => {
            this.$store.commit(Constants.store.SET_GLOBAL_RESULT, response.data.map.objectiveMovementList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         let objectiveMovement = {
            userIdentity: this.$store.state.userIdentity
         };

         this.$_transaction_post("/objectiveMovement/accessRegistration", objectiveMovement).then(response => {
            this.$store.commit("setGlobalLocationListCombo", response.data.map.locationListCombo);
            this.$store.commit("setGlobalPaymentMethodListCombo", response.data.map.paymentMethodListCombo);
            this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);
            this.$store.commit("setGlobalAccountListComboTarget", response.data.map.accountListComboTarget);

            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      // Not ok
      accessEdition(objectiveMovement) {
         objectiveMovement.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/objectiveMovement/accessEdition", objectiveMovement).then(response => {
            this.$store.commit("setGlobalEntity", response.data.map.objectiveMovement);
            this.$store.commit("setGlobalLocationListCombo", response.data.map.locationListCombo);
            this.$store.commit("setGlobalPaymentMethodListCombo", response.data.map.paymentMethodListCombo);
            this.$store.commit("setGlobalAccountListComboSource", response.data.map.accountListComboSource);
            this.$store.commit("setGlobalAccountListComboTarget", response.data.map.accountListComboTarget);

            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         let objectiveMovement = {
            filter: filterValue,
            userIdentity: this.$store.state.userIdentity,
            paymentDate: new Date(this.$store.state.globalYear + "-" + this.$store.state.globalMonth + "-01 12:00:00")
         }

         this.$_transaction_post("/objectiveMovement/executeSearch", objectiveMovement).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.objectiveMovementList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration(objectiveMovement) {
         if (this.isMissingRequiredFields(objectiveMovement)) {
            return;
         }

         objectiveMovement.userIdentity = this.$store.state.userIdentity;
         objectiveMovement.dueDate = new Date(this.$_format_toAmericanDate(objectiveMovement.dueDate) + " 12:00:00");
         objectiveMovement.paymentDate = new Date(this.$_format_toAmericanDate(objectiveMovement.paymentDate) + " 12:00:00");

         if (!objectiveMovement.objective.objectiveItemList || objectiveMovement.objective.objectiveItemList.length == 0) {
            let objectiveItemDefault = {
               description: objectiveMovement.objective.description,
               sequential: "1",
               amount: 1,
               unitaryValue: objectiveMovement.value,
               totalValue: objectiveMovement.value
            }

            objectiveMovement.objective.objectiveItemList.push(objectiveItemDefault);
         }

         if (this.isTotalValueDifferentToTotalItems(objectiveMovement)) {
            return;
         }

         for (let objectiveItem of objectiveMovement.objective.objectiveItemList) {
            objectiveItem.userIdentity = this.$store.state.userIdentity;
         }

         this.$_transaction_post("/objectiveMovement/executeRegistration", objectiveMovement).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.objectiveMovementList);
            this.closeForm(objectiveMovement);
            this.$_message_showSuccess();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      // Not ok
      executeEdition(objectiveMovement) {
         if (this.isMissingIdentity(objectiveMovement) || this.isMissingRequiredFields(objectiveMovement))
            return;

         objectiveMovement.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/objectiveMovement/executeEdition", objectiveMovement).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.objectiveMovementList);
            this.$_message_showSuccess();
            this.fecharFormulario();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      // Not ok
      executeExclusion(objectiveMovement) {
         this.$confirm("Do you want to delete the selected record?").then(() => {
            objectiveMovement.userIdentity = this.$store.state.userIdentity;
            this.$_transaction_post("/objectiveMovement/executeExclusion", objectiveMovement).then(response => {
               this.$store.commit("setGlobalResult", response.data.map.objectiveMovementList);
               this.$_message_showSuccess();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      },

      isMissingIdentity(objectiveMovement) {
         if (!objectiveMovement.identity) {
            this.$_message_showRequired("Missing account identity.");
            return true;
         }

         return false;
      },

      isMissingRequiredFields(objectiveMovement) {
         if (!objectiveMovement.objective || !objectiveMovement.objective.description || !objectiveMovement.objective.description.trim()) {
            this.$_message_showRequired("Missing movement description.");
            return true;
         }

         if (!objectiveMovement || !objectiveMovement.accountSource || !objectiveMovement.accountSource.identity) {
            this.$_message_showRequired("Missing source account.");
            return true;
         }

         if (!objectiveMovement.objective || !objectiveMovement.objective.location || !objectiveMovement.objective.location.identity) {
            this.$_message_showRequired("Missing location.");
            return true;
         }

         if (!objectiveMovement.paymentMethod || !objectiveMovement.paymentMethod.identity) {
            this.$_message_showRequired("Missing payment method.");
            return true;
         }

         if (!objectiveMovement.dueDate) {
            this.$_message_showRequired("Missing due date.");
            return true;
         }

         if (!objectiveMovement.installment) {
            this.$_message_showRequired("Missing installment.");
            return true;
         }

         if (!objectiveMovement.value) {
            this.$_message_showRequired("Missing value. You must add at least one item.");
            return true;
         }

         return false;
      },

      isTotalValueDifferentToTotalItems(objectiveMovement) {
         let totalItems = 0;
         let totalMovement = objectiveMovement.value;

         for (let objectiveItem of objectiveMovement.objective.objectiveItemList) {
            totalItems += Number(objectiveItem.totalValue.toFixed(2));
         }

         if (totalMovement !== totalItems) {
            this.$_message_showError("The movement total value is different of items total value.");
            return true;
         }

         return false;
      },

      // Not ok
      cleanForm(objectiveMovement) {
         if (!objectiveMovement.identity) {
            objectiveMovement.registrationDate = "";
            objectiveMovement.dueDate = "";
            objectiveMovement.paymentDate = "";
            objectiveMovement.value = 0;
            objectiveMovement.installment = 0;

            objectiveMovement.paymentMethod = {};
            objectiveMovement.accountSource = {};

            objectiveMovement.objective.description = "";
            objectiveMovement.objective.location = {};
            objectiveMovement.objective.objectiveItemList = [];
         }
      },

      // Not ok
      closeForm(objectiveMovement) {
         objectiveMovement.identity = "";
         objectiveMovement.registrationDate = "";
         objectiveMovement.dueDate = "";
         objectiveMovement.paymentDate = "";
         objectiveMovement.value = 0;
         objectiveMovement.installment = 0;

         objectiveMovement.paymentMethod = {};
         objectiveMovement.accountSource = {};

         objectiveMovement.objective.description = "";
         objectiveMovement.objective.location = {};
         objectiveMovement.objective.objectiveItemList = [];

         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      }
   }
}
