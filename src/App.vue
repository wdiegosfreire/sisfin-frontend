<template>
  <v-app>
    <estrutura />
    <loading />
  </v-app>
</template>

<script>
import Loading from "./components/loading/Loading.vue";
import apiConfig from "./components/axios/common/apiConfig"
import Estrutura from "./paginas/estrutura/Estrutura.vue";

export default {
  name: 'App',
  components: { Estrutura, Loading },
  
  mixins: [apiConfig],
  created() {
    this.createInterceptors();

    if (window.localStorage.user) {
      this.$store.commit("setUser", window.localStorage.user);
    }
    else {
      this.$store.commit("setUser", {});
      this.$router.push("/");
    }
  }
};
</script>
