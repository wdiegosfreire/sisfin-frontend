<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-toolbar-title>Contas</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="accessModule()" title="Clique para recarregar a página"><v-icon>mdi-update</v-icon></v-btn>
      <v-btn icon @click.stop="toggleFilterField()" title="Clique para fazer uma search"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon @click.stop="exibirFormulario()" title="Clique para cadastrar um novo registro"><v-icon>mdi-plus</v-icon></v-btn>
    </v-app-bar>

    <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

    <conta-resultado />
    <conta-formulario />
  </div>
</template>

<script>
import ContaService from "./ContaService.js";
import ContaResultado from "./ContaResultado.vue";
import ContaFormulario from "./ContaFormulario.vue";

import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
  name: "Conta",
  components: { ContaResultado, ContaFormulario, DfInputFilter },
  mixins: [ContaService],
  methods: {
    exibirFormulario() {
      this.$store.commit("showGlobalDialog", true);
    },
    toggleFilterField() {
      if (this.btpConta.conTxtDescricao) {
        this.btpConta.conTxtDescricao = "";
        this.executeSearch();
      }

      this.showSearchField = !this.showSearchField;
    }
  },
  created() {
    this.accessModule();
  },
};
</script>
