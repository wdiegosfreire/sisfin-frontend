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

      // Not ok
      accessRegistration() {
         let objectiveMovement = {
            userIdentity: this.$store.state.userIdentity
         };

         this.$_transaction_post("/objectiveMovement/accessRegistration", objectiveMovement).then(response => {
            this.$_message_console(response);

            // Mock of locationListCombo
            this.$store.commit("setGlobalLocationListCombo", [ {identity: 1, name: "Location 01"}, {identity: 2, name: "Location 02"} ]);

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
      executeRegistration() {
         if (!this.objectiveMovement.name || !this.objectiveMovement.name.trim()) {
            this.$_message_showRequired("Missing movement name.");
               return;
         }

         if (!this.objectiveMovement.cnpj || !this.objectiveMovement.cnpj.trim()) {
            this.$_message_showRequired("Missing movement CNPJ.");
               return;
         }

         if (!this.objectiveMovement.branch || !this.objectiveMovement.branch.trim()) {
            this.$_message_showRequired("Missing movement branch.");
               return;
         }
   
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
      executeEdition() {
         if (!this.objectiveMovement.identity) {
            this.$_message_showRequired("Missing movement identity.");
               return;
         }

         if (!this.objectiveMovement.name || !this.objectiveMovement.name.trim()) {
            this.$_message_showRequired("Mising movement sname.");
               return;
         }

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
