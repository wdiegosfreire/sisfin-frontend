import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

import Constants from "../../plugins/Constants";

export default {
   name: "objectiveMovementService",
   mixins: [transactionApi, message ],
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

      // Not ok
      executeRegistration(objectiveMovement) {
         if (this.isMissingRequiredFields(objectiveMovement))
            return;
   
         this.objectiveMovement.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/objectiveMovement/executeRegistration", this.objectiveMovement).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.objectiveMovementList);
            this.$_message_showSuccess();
            this.fecharFormulario();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      // Not ok
      executeEdition(objectiveMovement) {
         if (this.isMissingIdentity(objectiveMovement) || this.isMissingRequiredFields(objectiveMovement))
            return;

         this.objectiveMovement.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/objectiveMovement/executeEdition", this.objectiveMovement).then(response => {
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
            return;
         }

         if (!objectiveMovement.objective || !objectiveMovement.objective.location || objectiveMovement.objective.location.identity) {
            this.$_message_showRequired("Missing location.");
            return;
         }

         if (!objectiveMovement.paymentMethod || !objectiveMovement.paymentMethod.identity) {
            this.$_message_showRequired("Missing payment method.");
            return;
         }

         if (!objectiveMovement.dueDate) {
            this.$_message_showRequired("Missing movement description.");
            return;
         }

         if (!objectiveMovement.value || !objectiveMovement.value.trim()) {
            this.$_message_showRequired("Missing movement description.");
            return;
         }

         if (!objectiveMovement.installment || !objectiveMovement.installment.trim()) {
            this.$_message_showRequired("Missing installment.");
            return;
         }

         if (!objectiveMovement.accountSource || !objectiveMovement.accountSource.identity) {
            this.$_message_showRequired("Missing source account.");
            return;
         }

         if (!objectiveMovement.accountTarget || !objectiveMovement.accountTarget.identity) {
            this.$_message_showRequired("Missing source account.");
            return;
         }

         return false;
      },

      // Not ok
      validateSelectedSource(objectiveMovement) {
         let errorMessage = "";

         if (!objectiveMovement || !objectiveMovement.accountSource || objectiveMovement.accountSource.level.length != 9)
            errorMessage = "Please, select a final source account.";
         else if (objectiveMovement.accountSource.level.startsWith("03."))
            errorMessage = `Accounts with level "03." can't be used as source account.`;
         else if (this.validateAccountCombination(objectiveMovement) != "")
            errorMessage = this.validateAccountCombination(objectiveMovement);

         if (errorMessage) {
            this.$_message_showRequired(errorMessage);
            objectiveMovement.accountSource = {};
            objectiveMovement.accountTarget = {};
            return;
         }
      },

      validateSelectedTarget(objectiveMovement) {
         let errorMessage = "";

         if (!objectiveMovement || !objectiveMovement.accountTarget || objectiveMovement.accountTarget.level.length != 9)
            errorMessage = "Please, select a final source account.";
         else if (objectiveMovement.accountTarget.level.startsWith("02."))
            errorMessage = `Accounts with level "02." can't be used as target account.`;
         else if (this.validateAccountCombination(objectiveMovement) != "")
            errorMessage = this.validateAccountCombination(objectiveMovement);

         if (errorMessage) {
            this.$_message_showRequired(errorMessage);
            objectiveMovement.accountSource = {};
            objectiveMovement.accountTarget = {};
            return;
         }
      },

      validateAccountCombination(objectiveMovement) {
         if (objectiveMovement.accountSource.level.startsWith("02.") && objectiveMovement.accountTarget.level.startsWith("03."))
            return `The combination levels "02." as source and "03." as target is invalid.`;
         else if (objectiveMovement.accountSource.level === objectiveMovement.accountTarget.level)
            return `The same account can't be used as source and target.`;

         return "";
      },

      // Not ok
      cleanForm(objectiveMovement) {
         if (!objectiveMovement.identity) {
            this.$_message_console(objectiveMovement);
         }
      },

      // Not ok
      closeForm(objectiveMovement) {
         this.$_message_console(objectiveMovement);

         this.$store.commit(Constants.store.SHOW_GLOBAL_DIALOG, false);
      }
   }
}
