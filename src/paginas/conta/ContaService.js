import api from "../../components/api/api.js";
import message from "../../components/mixins/message.js";

export default {
  name: "ContaService",
  mixins: [api, message ],
	data() {
    return {
      showSearchField: false,
      btpConta: {
        conTxtDescricao: "",
        conNumNivel: ""
      }
    };
  },
  methods: {
    accessModule() {
      let btpConta = {
        user: this.$store.state.userIdentity
      }
   
      this.post("/conta/accessModule", btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    accessRegistration(btpConta) {
      if (!btpConta) {
        btpConta = {}
      }

      btpConta.user = this.$store.state.userIdentity

      this.post("/conta/accessRegistration", btpConta).then(response => {
        this.btpContaListComboNivelUm = response.data.retorno.btpContaListComboNivelUm;
        this.btpContaListComboNivelDois = response.data.retorno.btpContaListComboNivelDois;
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    accessEdition(btpConta) {
      btpConta.user = this.$store.state.userIdentity;

      this.post("/conta/accessEdition", btpConta).then(response => {
        this.$store.commit("setGlobalEntity", response.data.retorno.btpConta);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executeSearch(filterValue) {
      this.btpConta.filter = filterValue;
      this.btpConta.user = this.$store.state.userIdentity;

      this.post("/conta/executeSearch", this.btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeRegistration() {
      if (!this.btpConta.conNumNivel.trim()) {
        this.$_message_showRequired("Nível da conta não informado.");
          return;
      }

      if (!this.btpConta.conTxtDescricao.trim()) {
        this.$_message_showRequired("Descrição da conta não informada.");
          return;
      }
   
      this.btpConta.user = this.$store.state.userIdentity;
      this.post("/conta/executeRegistration", this.btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeEdition() {
      if (!this.btpConta.conTxtDescricao) {
        this.$_message_showWarning("Código da conta não informado.");
        return;
      }

      if (!this.btpConta.conTxtDescricao.trim()) {
        this.$_message_showWarning("Nome da conta não informada.");
        return;
      }

      this.btpConta.user = this.$store.state.userIdentity;
      this.post("/conta/executeEdition", this.btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executeExclusion(btpConta) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        btpConta.user = this.$store.state.userIdentity;
        this.post("/conta/executeExclusion", btpConta).then(response => {
          this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}