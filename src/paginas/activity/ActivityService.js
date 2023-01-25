import transactionApi from "../../components/axios/transaction/transactionApi.js";
import message from "../../components/mixins/message.js";

export default {
  name: "transactionService",
  mixins: [transactionApi, message ],
	data() {
    return {
      showSearchField: false,
      activity: {},
      objectiveMovementList: [
         {
            identity: 1,
            registrationDate: new Date(),
            dueDate: new Date(),
            paymentDate: new Date(),
            value: 5199.99,
            installment: 1,
            objective: {
               description: "Notebook Acer",
               location: {name: "Cometa"}
            },
            paymentMethod: {name: "Débito Ourocard"},
            accountSource: {name: "Conta Corrente"},
            accountTarget: {name: "Informática"},
         }
      ]
    };
  },

  methods: {
    accessModule() {
    },

    accessRegistration() {
      this.$store.commit("showGlobalDialog", true);
    },

    accessEdition(location) {
      location.userIdentity = this.$store.state.userIdentity;
      this.$_transaction_post("/location/accessEdition", location).then(response => {
        this.$store.commit("setGlobalEntity", response.data.map.location);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executeSearch(filterValue) {
      this.location.filter = filterValue;
      this.location.userIdentity = this.$store.state.userIdentity;

      this.$_transaction_post("/location/executeSearch", this.location).then(response => {
        this.$store.commit("setGlobalResult", response.data.map.locationList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeRegistration() {
      if (!this.location.name || !this.location.name.trim()) {
        this.$_message_showRequired("Missing location name.");
          return;
      }

      if (!this.location.cnpj || !this.location.cnpj.trim()) {
        this.$_message_showRequired("Missing location CNPJ.");
          return;
      }

      if (!this.location.branch || !this.location.branch.trim()) {
        this.$_message_showRequired("Missing location branch.");
          return;
      }
   
      this.location.userIdentity = this.$store.state.userIdentity;
      this.$_transaction_post("/location/executeRegistration", this.location).then(response => {
        this.$store.commit("setGlobalResult", response.data.map.locationList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeEdition() {
      if (!this.location.identity) {
        this.$_message_showRequired("Missing location identity.");
          return;
      }

      if (!this.location.name || !this.location.name.trim()) {
        this.$_message_showRequired("Mising location sname.");
          return;
      }

      if (!this.location.cnpj || !this.location.cnpj.trim()) {
        this.$_message_showRequired("Missing location CNPJ.");
          return;
      }

      if (!this.location.branch || !this.location.branch.trim()) {
        this.$_message_showRequired("Missing location branch.");
          return;
      }

      this.location.userIdentity = this.$store.state.userIdentity;
      this.$_transaction_post("/location/executeEdition", this.location).then(response => {
        this.$store.commit("setGlobalResult", response.data.map.locationList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeExclusion(location) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        location.userIdentity = this.$store.state.userIdentity;
        this.$_transaction_post("/location/executeExclusion", location).then(response => {
          this.$store.commit("setGlobalResult", response.data.map.locationList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}