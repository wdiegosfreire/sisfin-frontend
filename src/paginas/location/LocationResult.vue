<template>
  <v-card>
    <v-card-text>
      <v-card outlined class="elevation-1 mb-4" v-for="location in locationList" :key="location.identity">
        <v-card-title class="pb-0 pt-0">{{ location.identity }}</v-card-title>
        <v-card-text>
          <df-grid column="menu">
            <df-grid>
              <df-output-text class="text-left" label="Identity">{{ location.identity }}</df-output-text>
              <df-output-text class="text-left" label="Notes">{{ location.note ? location.note : "No notes" }}</df-output-text>
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
                    <v-list-item @click="acessarEdicao(location)">
                      <v-list-item-icon><v-icon>mdi-notebook-edit-outline</v-icon></v-list-item-icon>
                      <v-list-item-content><v-list-item-title>Editar</v-list-item-title></v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="executarExclusao(location)">
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

    <v-card-text v-if="locationList.length == 0">No results found.</v-card-text>
  </v-card>
</template>

<script>
import locationService from "./locationService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfOutputText from "../../components/output/OutputText.vue";


export default {
  name: "LocationResult",
  components: { DfGrid, DfOutputText },
  mixins: [locationService],
  data() {
    return {
      locationList: [],
      search: "",
      headers: [
        { text: 'IDENTITY', value: 'identity' },
        { text: 'NAME', value: 'name' },
        { text: 'ACTIONS', value: 'actions', sortable: false, align: "end" }
      ]
    };
  },
  methods: {
    updateGlobalResult() {
      this.locationList = this.$store.state.globalResult;
    }
  },
  watch: {
    "$store.state.globalResult": "updateGlobalResult"
  }
};
</script>
