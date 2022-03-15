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

      if (window.localStorage.sessionToken) {
         this.$store.commit("setUserName", window.localStorage.userName);
         this.$store.commit("setUserIdentity", window.localStorage.userIdentity);
         this.$store.commit("setSessionToken", window.localStorage.sessionToken);
      }
      else {
         this.$store.commit("setUserName", "");
         this.$store.commit("setUserIdentity", "");
         this.$store.commit("setSessionToken", "");

         this.$router.push("/");
      }
   }
};
</script>
