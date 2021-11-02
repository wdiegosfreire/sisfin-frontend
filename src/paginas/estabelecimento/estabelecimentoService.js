import api from "../../components/api/api.js";
import message from "../../components/mixins/message.js";

export default {
  name: "estabelecimentoService",
  mixins: [api, message ],
	data() {
    return {
      showFilterField: false,
      btpEstabelecimento: {
        estNomEstabelecimento: "",
        estTxtObservacao: ""
      },
    };
  },
  methods: {
    acessarModulo() {
      let btpEstabelecimento = {
        btpUsuario: this.$store.state.btpUsuario
      }
   
      this.post("/estabelecimento/acessarModulo", btpEstabelecimento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpEstabelecimentoList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    acessarCadastro() {
      this.$store.commit("showGlobalDialog", true);
    },

    acessarEdicao(btpEstabelecimento) {
      btpEstabelecimento.btpUsuario = this.$store.state.btpUsuario;
      this.post("/estabelecimento/acessarEdicao", btpEstabelecimento).then(response => {
        this.$store.commit("setGlobalEntity", response.data.retorno.btpEstabelecimento);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executarFiltro(filterValue) {
      this.btpEstabelecimento.filter = filterValue;
      this.btpEstabelecimento.btpUsuario = this.$store.state.btpUsuario;

      this.post("/estabelecimento/executarFiltro", this.btpEstabelecimento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpEstabelecimentoList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarCadastro() {
      if (!this.btpEstabelecimento.estNomEstabelecimento.trim()) {
        this.$_message_showRequired("Nome do estabelecimento não informado.");
          return;
      }
   
      this.btpEstabelecimento.btpUsuario = this.$store.state.btpUsuario;
      this.post("/estabelecimento/executarCadastro", this.btpEstabelecimento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpEstabelecimentoList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarEdicao() {
      if (!this.btpEstabelecimento.estCodEstabelecimento) {
        this.$_message_showWarning("Código do estabelecimento não informado.");
        return;
      }

      if (!this.btpEstabelecimento.estNomEstabelecimento.trim()) {
        this.$_message_showWarning("Nome do estabelecimento não informado.");
        return;
      }

      this.btpEstabelecimento.btpUsuario = this.$store.state.btpUsuario;
      this.post("/estabelecimento/executarEdicao", this.btpEstabelecimento).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.btpEstabelecimentoList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarExclusao(btpEstabelecimento) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        btpEstabelecimento.btpUsuario = this.$store.state.btpUsuario;
        this.post("/estabelecimento/executarExclusao", btpEstabelecimento).then(response => {
          this.$store.commit("setGlobalResult", response.data.retorno.btpEstabelecimentoList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}