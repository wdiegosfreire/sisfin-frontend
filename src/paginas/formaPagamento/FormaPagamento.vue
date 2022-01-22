<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-toolbar-title>Formas de Pagamento</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="accessModule()" title="Clique para recarregar a página"><v-icon>mdi-update</v-icon></v-btn>
      <v-btn icon @click.stop="toggleFilterField()" title="Clique para fazer uma search"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon @click.stop="accessRegistration()" title="Clique para cadastrar um novo registro"><v-icon>mdi-plus</v-icon></v-btn>
    </v-app-bar>

    <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

    <forma-pagamento-resultado />
    <forma-pagamento-formulario />
  </div>
</template>

<script>
import FormaPagamentoService from "./FormaPagamentoService.js";
import FormaPagamentoResultado from "./FormaPagamentoResultado.vue";
import FormaPagamentoFormulario from "./FormaPagamentoFormulario.vue";

import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
  name: "FormaPagamento",
  components: { FormaPagamentoResultado, FormaPagamentoFormulario, DfInputFilter },
  mixins: [FormaPagamentoService],
  methods: {
    toggleFilterField() {
      if (this.btpFormaPagamento.fopNomFormaPagamento) {
        this.btpFormaPagamento.fopNomFormaPagamento = "";
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
