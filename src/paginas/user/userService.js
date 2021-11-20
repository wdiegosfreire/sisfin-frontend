import maintenanceApi from "../../components/axios/maintenance/maintenanceApi.js";
import message from "../../components/mixins/message.js";
import md5 from 'js-md5';

export default {
  name: "userService",
  mixins: [maintenanceApi, message ],
  data() {
    return {
        isProduction: false,
        password: "",
        user: {
            email: "",
            password: ""
        }
    }
  },

  methods: {
    executeAuthentication() {
      if (this.user.email == "") {
          this.$_message_showWarning("Email não informado.");
          return;
      }

      if (this.password == "") {
          this.$_message_showWarning("Senha não informada.");
          return;
      }

      this.user.password = md5(this.password);

      this.$_maintenance_post(`/user/executeAuthentication`, this.user).then(response => {
        this.$store.commit("setUser", response.data.map.userAuthenticated);
        this.$router.push("/resumo");
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    resetForm() {
      this.user.email = "";
      this.password = "";
    }
  }
}