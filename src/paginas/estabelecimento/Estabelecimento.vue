<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-toolbar-title>Estabelecimentos</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="acessarModulo()" title="Clique para recarregar a página"><v-icon>mdi-update</v-icon></v-btn>
      <v-btn icon @click.stop="toggleFilterField()" title="Clique para fazer uma pesquisa"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon @click.stop="acessarCadastro()" title="Clique para cadastrar um novo registro"><v-icon>mdi-plus</v-icon></v-btn>
    </v-app-bar>

    <df-input-filter transition="slide-x-transition" v-if="showFilterField" @type="executarFiltro" />

    <estabelecimento-resultado />
    <estabelecimento-formulario />
  </div>
</template>

<script>
import estabelecimentoService from "./estabelecimentoService.js";
import EstabelecimentoResultado from "./EstabelecimentoResultado.vue";
import EstabelecimentoFormulario from "./EstabelecimentoFormulario.vue";

import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
  name: "Estabelecimento",
  components: { EstabelecimentoResultado, EstabelecimentoFormulario, DfInputFilter },
  mixins: [estabelecimentoService],
  methods: {
    toggleFilterField() {
      if (this.btpEstabelecimento.estNomEstabelecimento) {
        this.btpEstabelecimento.estNomEstabelecimento = "";
        this.executarFiltro();
      }

      this.showFilterField = !this.showFilterField;
    }
  },
  created() {
    this.acessarModulo();
  },
};
</script>
