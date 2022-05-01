import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

export default {
   name: "accountService",
   mixins: [transactionApi, message ],
   data() {
      return {
         showSearchField: false,
         account: {
         },
      };
   },

   methods: {
      accessModule() {
         let account = {
            userIdentity: this.$store.state.userIdentity
         }

         this.$_transaction_post("/account/accessModule", account).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.accountList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         this.$store.commit("showGlobalDialog", true);
      },

      accessEdition(account) {
         account.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/account/accessEdition", account).then(response => {
            this.$store.commit("setGlobalEntity", response.data.map.account);
            this.$store.commit("showGlobalDialog", true);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },
  
      executeSearch(filterValue) {
         this.account.filter = filterValue;
         this.account.userIdentity = this.$store.state.userIdentity;

         this.$_transaction_post("/account/executeSearch", this.account).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.accountList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeRegistration() {
         if (!this.account.name || !this.account.name.trim()) {
            this.$_message_showRequired("Missing account name.");
            return;
         }

         if (!this.account.level || !this.account.level.trim()) {
            this.$_message_showRequired("Missing account acronym.");
            return;
         }

         this.account.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/account/executeRegistration", this.account).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.accountList);
            this.$_message_showSuccess();
            this.fecharFormulario();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeEdition() {
         if (!this.account.identity) {
            this.$_message_showRequired("Missing account identity.");
            return;
         }

         if (!this.account.name || !this.account.name.trim()) {
            this.$_message_showRequired("Mising account name.");
            return;
         }

         if (!this.account.level || !this.account.level.trim()) {
            this.$_message_showRequired("Missing account acronym.");
            return;
         }

         this.account.userIdentity = this.$store.state.userIdentity;
         this.$_transaction_post("/account/executeEdition", this.account).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.accountList);
            this.$_message_showSuccess();
            this.fecharFormulario();
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      executeExclusion(account) {
         this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
            account.userIdentity = this.$store.state.userIdentity;

            this.$_transaction_post("/account/executeExclusion", account).then(response => {
               this.$store.commit("setGlobalResult", response.data.map.accountList);
               this.$_message_showSuccess();
            }).catch(error => {
               this.$_message_handleError(error);
            });
         });
      }
   }
}
