<template>
  <v-card>
    <v-card-text>
      <v-card outlined class="elevation-1 mb-4" v-for="btpConta in btpContaList" :key="btpConta.conCodConta">
        <v-card-title class="pb-0 pt-0">{{ btpConta.conTxtDescricao }}</v-card-title>
        <v-card-text>
          <df-grid column="menu">
            <df-grid>
              <df-output-text class="text-left" label="Código">{{ btpConta.conCodConta }}</df-output-text>
              <df-output-text class="text-left" label="Nível">{{ btpConta.conNumNivel }}</df-output-text>
            </df-grid>
            <div>
              <v-menu v-if="btpConta.conNumNivel.length > 3" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined fab small v-bind="attrs" v-on="on">
                    <v-icon>mdi-text</v-icon>
                  </v-btn>
                </template>
                <v-list dense width="150">
                  <v-subheader>Opções</v-subheader>
                  <v-list-item-group>
                    <v-list-item @click="accessEdition(btpConta)">
                      <v-list-item-icon><v-icon>mdi-notebook-edit-outline</v-icon></v-list-item-icon>
                      <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="executeExclusion(btpConta)">
                      <v-list-item-icon><v-icon>mdi-trash-can-outline</v-icon></v-list-item-icon>
                      <v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </div>
          </df-grid>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-text v-if="btpContaList.length == 0">No results found.</v-card-text>
  </v-card>
</template>

<script>
import ContaService from "./ContaService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfOutputText from "../../components/output/OutputText.vue";


export default {
  name: "ContaResultado",
  components: { DfGrid, DfOutputText },
  mixins: [ContaService],
  data() {
    return {
      btpContaList: [],
      search: ""
    };
  },
  methods: {
    updateGlobalResult() {
      this.btpContaList = this.$store.state.globalResult;
    }
  },
  watch: {
    "$store.state.globalResult": "updateGlobalResult"
  }
};
</script>
