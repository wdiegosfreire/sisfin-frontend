import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

export default {
   name: "accountService",
   mixins: [ transactionApi, message ],
   data() {
      return {
         showSearchField: false,
         account: {
            accountParent: {}
         },

         levelSufix: "",
         levelPrefix: "",
         accountListComboLevelOne: [],
         accountListComboLevelTwo: [],
         accountComboLevelOneSelected: {},
         accountComboLevelTwoSelected: {}
      };
   },

   methods: {
      accessModule() {
         let account = {userIdentity: this.$store.state.userIdentity};

         this.$_transaction_post("/account/accessModule", account).then(response => {
            this.$store.commit("setGlobalResult", response.data.map.accountList);
         }).catch(error => {
            this.$_message_handleError(error);
         });
      },

      accessRegistration() {
         let account = {userIdentity: this.$store.state.userIdentity};

         if (this.accountComboLevelOneSelected) {
            this.accountComboLevelOneSelected.userIdentity = this.$store.state.userIdentity;
            account = this.accountComboLevelOneSelected;
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
         if (!this.accountComboLevelOneSelected || !this.accountComboLevelOneSelected.identity) {
            this.$_message_showRequired("Missing first level account.");
            return;
         }

         if (!this.levelPrefix || !this.levelPrefix.trim()) {
            this.$_message_showRequired("Missing prefix level.");
            return;
         }

         if (!this.levelSufix || !this.levelSufix.trim()) {
            this.$_message_showRequired("Missing sufix level.");
            return;
         }

         if (!this.account.level || !this.account.level.trim()) {
            this.$_message_showRequired("Missing account acronym.");
            return;
         }

         if (!this.account.name || !this.account.name.trim()) {
            this.$_message_showRequired("Missing account name.");
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
      },

      isNumber(evt) {
         evt = (evt) ? evt : window.event;
         var charCode = (evt.which) ? evt.which : evt.keyCode;

         if (charCode < 48 || charCode > 57) {
           evt.preventDefault();
         }
         else {
           return true;
         }
       }
   }
}
