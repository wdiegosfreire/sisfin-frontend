import maintenanceApi from "../../components/axios/maintenance/maintenanceApi.js";
import message from "../../components/mixins/message.js";
import md5 from 'js-md5';

export default {
  name: "userService",
  mixins: [maintenanceApi, message ],
  data() {
    return {
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
          this.$_message_showWarning("The e-mail field is empty.");
          return;
      }

      if (this.password == "") {
          this.$_message_showWarning("The password field is empty.");
          return;
      }

      this.user.password = md5(this.password);

      this.$_maintenance_post(`/user/executeAuthentication`, this.user).then(response => {
        this.$store.commit("setUserName", response.data.map.userAuthenticated.name);
        this.$store.commit("setUserIdentity", response.data.map.userAuthenticated.identity);
        this.$store.commit("setSessionToken", response.data.map.token);

        this.$router.push("/summary");
      }).catch(error => {
        this.$_message_handleError(error);
      });
    },

    async accessResetPassword() {
      this.$_message_showInfo("Forgot your password?");
    },

    async accessRegistration() {
      this.$_message_showInfo("Don't have an account? Sign up and get started!");
    },

    resetForm() {
      this.user.email = "";
      this.password = "";
    }
  }
}