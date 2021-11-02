import api from "../../components/api/api.js";
import message from "../../components/mixins/message.js";

export default {
  name: "ContaService",
  mixins: [api, message ],
	data() {
    return {
      showFilterField: false,
      btpConta: {
        conTxtDescricao: "",
        conNumNivel: ""
      }
    };
  },
  methods: {
    acessarModulo() {
      let btpConta = {
        btpUsuario: this.$store.state.btpUsuario
      }
   
      this.post("/conta/acessarModulo", btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    acessarCadastro(btpConta) {
      if (!btpConta) {
        btpConta = {}
      }

      btpConta.btpUsuario = this.$store.state.btpUsuario

      this.post("/conta/acessarCadastro", btpConta).then(response => {
        this.btpContaListComboNivelUm = response.data.retorno.btpContaListComboNivelUm;
        this.btpContaListComboNivelDois = response.data.retorno.btpContaListComboNivelDois;
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    acessarEdicao(btpConta) {
      btpConta.btpUsuario = this.$store.state.btpUsuario;

      this.post("/conta/acessarEdicao", btpConta).then(response => {
        this.$store.commit("setGlobalEntity", response.data.retorno.btpConta);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executarFiltro(filterValue) {
      this.btpConta.filter = filterValue;
      this.btpConta.btpUsuario = this.$store.state.btpUsuario;

      this.post("/conta/executarFiltro", this.btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarCadastro() {
      if (!this.btpConta.conNumNivel.trim()) {
        this.$_message_showRequired("Nível da conta não informado.");
          return;
      }

      if (!this.btpConta.conTxtDescricao.trim()) {
        this.$_message_showRequired("Descrição da conta não informada.");
          return;
      }
   
      this.btpConta.btpUsuario = this.$store.state.btpUsuario;
      this.post("/conta/executarCadastro", this.btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarEdicao() {
      if (!this.btpConta.conTxtDescricao) {
        this.$_message_showWarning("Código da conta não informado.");
        return;
      }

      if (!this.btpConta.conTxtDescricao.trim()) {
        this.$_message_showWarning("Nome da conta não informada.");
        return;
      }

      this.btpConta.btpUsuario = this.$store.state.btpUsuario;
      this.post("/conta/executarEdicao", this.btpConta).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarExclusao(btpConta) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        btpConta.btpUsuario = this.$store.state.btpUsuario;
        this.post("/conta/executarExclusao", btpConta).then(response => {
          this.$store.commit("setGlobalResult", response.data.retorno.btpContaList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}