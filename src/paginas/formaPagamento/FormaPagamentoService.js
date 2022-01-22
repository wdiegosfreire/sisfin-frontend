import api from "../../components/api/api.js";
import message from "../../components/mixins/message.js";

export default {
  name: "FormaPagamentoService",
  mixins: [api, message ],
	data() {
    return {
      showSearchField: false,
      btpFormaPagamento: {
        fopNomFormaPagamento: ""
      },
    };
  },
  methods: {
    accessModule() {
      let btpFormaPagamento = {
        user: this.$store.state.user
      }
   
      this.post("/formaPagamento/accessModule", btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    accessRegistration() {
      this.$store.commit("showGlobalDialog", true);
    },

    accessEdition(btpFormaPagamento) {
      btpFormaPagamento.user = this.$store.state.user;
      this.post("/formaPagamento/accessEdition", btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalEntity", response.data.retorno.btpFormaPagamento);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executeSearch(filterValue) {
      this.btpFormaPagamento.filter = filterValue;
      this.btpFormaPagamento.user = this.$store.state.user;

      this.post("/formaPagamento/executeSearch", this.btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeRegistration() {
      if (!this.btpFormaPagamento.fopNomFormaPagamento.trim()) {
        this.$_message_showRequired("Nome da forma de pagamento não informado.");
          return;
      }
   
      this.btpFormaPagamento.user = this.$store.state.user;
      this.post("/formaPagamento/executeRegistration", this.btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeEdition() {
      if (!this.btpFormaPagamento.fopCodFormaPagamento) {
        this.$_message_showWarning("Código da forma de pagamento não informado.");
        return;
      }

      if (!this.btpFormaPagamento.fopNomFormaPagamento.trim()) {
        this.$_message_showWarning("Nome da forma de pagamento não informado.");
        return;
      }

      this.btpFormaPagamento.user = this.$store.state.user;
      this.post("/formaPagamento/executeEdition", this.btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeExclusion(btpFormaPagamento) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        btpFormaPagamento.user = this.$store.state.user;
        this.post("/formaPagamento/executeExclusion", btpFormaPagamento).then(response => {
          this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}