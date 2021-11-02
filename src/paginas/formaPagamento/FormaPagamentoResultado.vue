<template>
  <v-card>
    <v-card-text>
      <v-card outlined class="elevation-1 mb-4" v-for="btpFormaPagamento in btpFormaPagamentoList" :key="btpFormaPagamento.fopCodFormaPagamento">
        <v-card-title class="pb-0 pt-0">{{ btpFormaPagamento.fopNomFormaPagamento }}</v-card-title>
        <v-card-text>
          <df-grid column="menu">
            <df-grid>
              <df-output-text class="text-left" label="Código">{{ btpFormaPagamento.fopCodFormaPagamento }}</df-output-text>
              <df-output-text class="text-left" label="Sigla">Em Breve</df-output-text>
            </df-grid>
            <div>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-text</v-icon>
                  </v-btn>
                </template>
                <v-list dense width="150">
                  <v-subheader>Opções</v-subheader>
                  <v-list-item-group>
                    <v-list-item @click="acessarEdicao(btpFormaPagamento)">
                      <v-list-item-icon><v-icon>mdi-notebook-edit-outline</v-icon></v-list-item-icon>
                      <v-list-item-content><v-list-item-title>Editar</v-list-item-title></v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="executarExclusao(btpFormaPagamento)">
                      <v-list-item-icon><v-icon>mdi-trash-can-outline</v-icon></v-list-item-icon>
                      <v-list-item-content><v-list-item-title>Excluir</v-list-item-title></v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
          </df-grid>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-text v-if="btpFormaPagamentoList.length == 0">Nenhum resultado encontrado.</v-card-text>
  </v-card>
</template>

<script>
import FormaPagamentoService from "./FormaPagamentoService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfOutputText from "../../components/output/OutputText.vue";


export default {
  name: "FormaPagamentoResultado",
  components: { DfGrid, DfOutputText },
  mixins: [FormaPagamentoService],
  data() {
    return {
      btpFormaPagamentoList: [],
      search: "",
      headers: [
        { text: 'CÓDIGO', value: 'fopCodFormaPagamento' },
        { text: 'NOME', value: 'fopNomFormaPagamento' },
        { text: 'AÇÕES', value: 'actions', sortable: false, align: "end" }
      ]
    };
  },
  methods: {
    updateGlobalResult() {
      this.btpFormaPagamentoList = this.$store.state.globalResult;
    }
  },
  watch: {
    "$store.state.globalResult": "updateGlobalResult"
  }
};
</script>
