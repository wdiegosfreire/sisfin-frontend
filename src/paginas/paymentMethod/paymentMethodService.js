import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

export default {
   name: "paymentMethodService",
   mixins: [transactionApi, message ],
   data() {
      return {
         showSearchField: false,
         paymentMethod: {
         },
      };
   },

   methods: {
      accessModule() {
         let paymentMethod = {
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/paymentMethod/accessModule", paymentMethod).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.paymentMethodList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         this.$store.commit("showGlobalDialog", true);
      },

      accessEdition(paymentMethod) {
         paymentMethod.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/paymentMethod/accessEdition", paymentMethod).then(response => {
            this.$store.commit("setGlobalEntity", response.data.map.paymentMethod);
            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         this.paymentMethod.filter = filterValue;
         this.paymentMethod.userIdentity = this.$store.state.userIdentity;

         this.$_transaction_post("/paymentMethod/executeSearch", this.paymentMethod).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.paymentMethodList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration() {
         if (!this.paymentMethod.name || !this.paymentMethod.name.trim()) {
            this.$_message_showRequired("Missing payment method name.");
            return;
         }

         if (!this.paymentMethod.acronym || !this.paymentMethod.acronym.trim()) {
            this.$_message_showRequired("Missing payment method acronym.");
            return;
         }

         this.paymentMethod.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/paymentMethod/executeRegistration", this.paymentMethod).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.paymentMethodList);
            this.$_message_showSuccess();
            this.fecharFormulario();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition() {
         if (!this.paymentMethod.identity) {
            this.$_message_showRequired("Missing payment method identity.");
            return;
         }

         if (!this.paymentMethod.name || !this.paymentMethod.name.trim()) {
            this.$_message_showRequired("Mising payment method name.");
            return;
         }

         if (!this.paymentMethod.acronym || !this.paymentMethod.acronym.trim()) {
            this.$_message_showRequired("Missing payment method acronym.");
            return;
         }

         this.paymentMethod.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/paymentMethod/executeEdition", this.paymentMethod).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.paymentMethodList);
            this.$_message_showSuccess();
            this.fecharFormulario();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(paymentMethod) {
         this.$confirm("Do you want to delete the selected record?").then(() => {
            paymentMethod.userIdentity = this.$store.state.userIdentity;

            this.$_transaction_post("/paymentMethod/executeExclusion", paymentMethod).then(response => {
               this.$store.commit("setGlobalResult", response.data.map.paymentMethodList);
               this.$_message_showSuccess();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      }
   }
}
