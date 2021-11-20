import api from "../../components/api/api.js";
import message from "../../components/mixins/message.js";

export default {
  name: "locationService",
  mixins: [api, message ],
	data() {
    return {
      showFilterField: false,
      location: {
        name: "",
        note: ""
      },
    };
  },
  methods: {
    acessarModulo() {
      let location = {
        user: this.$store.state.user
      }
   
      this.post("/location/acessarModulo", location).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.locationList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    acessarCadastro() {
      this.$store.commit("showGlobalDialog", true);
    },

    acessarEdicao(location) {
      location.user = this.$store.state.user;
      this.post("/location/acessarEdicao", location).then(response => {
        this.$store.commit("setGlobalEntity", response.data.retorno.location);
        this.$store.commit("showGlobalDialog", true);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },
  
    executarFiltro(filterValue) {
      this.location.filter = filterValue;
      this.location.user = this.$store.state.user;

      this.post("/location/executarFiltro", this.location).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.locationList);
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarCadastro() {
      if (!this.location.name.trim()) {
        this.$_message_showRequired("Missing location name.");
          return;
      }
   
      this.location.user = this.$store.state.user;
      this.post("/location/executarCadastro", this.location).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.locationList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarEdicao() {
      if (!this.location.identity) {
        this.$_message_showWarning("Missing location identity.");
        return;
      }

      if (!this.location.name.trim()) {
        this.$_message_showWarning("Missing location name.");
        return;
      }

      this.location.user = this.$store.state.user;
      this.post("/location/executarEdicao", this.location).then(response => {
        this.$store.commit("setGlobalResult", response.data.retorno.locationList);
        this.$_message_showSuccess();
        this.fecharFormulario();
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    executarExclusao(location) {
      this.$confirm("Deseja excluir permanentemente o registro selecionado?").then(() => {
        location.user = this.$store.state.user;
        this.post("/location/executarExclusao", location).then(response => {
          this.$store.commit("setGlobalResult", response.data.retorno.locationList);
          this.$_message_showSuccess();
        }).catch(error => {
          this.$_message_handleError(error);
        });
      });
    }
  }
}