import api from "../../components/api/api.js";
import message from "../../components/mixins/message.js";

export default {
  name: "FormaPagamentoService",
  mixins: [api, message ],
	data() {
    return {
      showFilterField: false,
      btpFormaPagamento: {
        fopNomFormaPagamento: ""
      },
    };
  },
  methods: {
    acessarModulo() {
      let btpFormaPagamento = {
        user: this.$store.state.user
      }
   
      this.post("/formaPagamento/acessarModulo", btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    acessarCadastro() {
      this.$store.commit("showGlobalDialog", true);
    },

    acessarEdicao(btpFormaPagamento) {
      btpFormaPagamento.user = this.$store.state.user;
      this.post("/formaPagamento/acessarEdicao", btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalEntity", response.data.retorno.btpFormaPagamento);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executarFiltro(filterValue) {
      this.btpFormaPagamento.filter = filterValue;
      this.btpFormaPagamento.user = this.$store.state.user;

      this.post("/formaPagamento/executarFiltro", this.btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarCadastro() {
      if (!this.btpFormaPagamento.fopNomFormaPagamento.trim()) {
        this.$_message_showRequired("Nome da forma de pagamento não informado.");
          return;
      }
   
      this.btpFormaPagamento.user = this.$store.state.user;
      this.post("/formaPagamento/executarCadastro", this.btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarEdicao() {
      if (!this.btpFormaPagamento.fopCodFormaPagamento) {
        this.$_message_showWarning("Código da forma de pagamento não informado.");
        return;
      }

      if (!this.btpFormaPagamento.fopNomFormaPagamento.trim()) {
        this.$_message_showWarning("Nome da forma de pagamento não informado.");
        return;
      }

      this.btpFormaPagamento.user = this.$store.state.user;
      this.post("/formaPagamento/executarEdicao", this.btpFormaPagamento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarExclusao(btpFormaPagamento) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        btpFormaPagamento.user = this.$store.state.user;
        this.post("/formaPagamento/executarExclusao", btpFormaPagamento).then(response => {
          this.$store.commit("setGlobalResult", response.data.retorno.btpFormaPagamentoList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}