<template>
   <v-card>
      <v-card-text>
         <v-card outlined class="elevation-1 mb-4" v-for="location in locationList" :key="location.identity">
            <v-card-title>
               <span>{{ location.name }}</span>
               <h6 v-if="location.branch" class="ml-1">({{ location.branch }})</h6>

               <v-spacer></v-spacer>
               <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined fab small v-bind="attrs" v-on="on">
                     <df-icon icon="fa-bars" />
                  </v-btn>
                  </template>
                  <v-list dense width="150">
                  <v-subheader>Opções</v-subheader>
                  <v-list-item-group>
                     <v-list-item @click="accessEdition(location)">
                        <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                        <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                     </v-list-item>
                     <v-list-item @click="executeExclusion(location)">
                        <v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
                        <v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
                     </v-list-item>
                  </v-list-item-group>
                  </v-list>
               </v-menu>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
               <df-grid>
                  <df-output-text class="text-left" label="Identity">{{ location.identity }}</df-output-text>
                  <df-output-text class="text-left" label="CNPJ">{{ location.cnpj }}</df-output-text>
                  <df-output-text class="text-left" label="Branch">{{ location.branch }}</df-output-text>
                  <df-output-text class="text-left" label="Notes">{{ location.note ? location.note : "No notes" }}</df-output-text>
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
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";


export default {
  name: "LocationResult",
  components: { DfGrid, DfOutputText, DfIcon },
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
