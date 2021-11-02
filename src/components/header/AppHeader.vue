<template>
	<v-app-bar app color="secondary" dense dark flat>
		<v-toolbar-title>Sistema de Controle Financeiro - SISFIN</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items v-if="$store.state.logged">
      <v-btn text @click="gotoBookList()">Livros</v-btn>
      <v-btn v-if="$store.state.authToken" text @click="gotoLibrary()">Minha Coleção</v-btn>
      <v-btn text @click="logout()">Sair</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    gotoBookList() {
      this.$router.push("/book");
    },
    gotoLibrary() {
      this.$router.push("/library");
    },
    logout() {
      this.$store.commit("setAuthToken", "");
      this.$store.commit("setUserId", "");
      this.$router.push("/");
    }
  }
};
</script>