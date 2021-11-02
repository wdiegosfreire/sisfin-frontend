<template>
  <v-app>
    <estrutura />
    <loading />
  </v-app>
</template>

<script>
import Loading from "./components/loading/Loading.vue";
import apiConfig from "./components/api/apiConfig"
import Estrutura from "./paginas/estrutura/Estrutura.vue";

export default {
  name: 'App',
  components: { Estrutura, Loading },
  
  mixins: [apiConfig],
  created() {
    this.createInterceptors();

    if (window.localStorage.btpUsuario) {
      this.$store.commit("setBtpUsuario", window.localStorage.btpUsuario);
    }
    else {
      this.$store.commit("setBtpUsuario", {});
      this.$router.push("/");
    }
  }
};
</script>
