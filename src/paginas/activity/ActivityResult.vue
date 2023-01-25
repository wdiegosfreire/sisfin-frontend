<template>
   <v-card>
      <v-card-text>
         <v-card outlined class="elevation-1 mb-4" v-for="objectiveMovement in objectiveMovementList" :key="objectiveMovement.identity">
            <v-card-title>
               <span>{{ objectiveMovement.objective.description }}</span>

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
                     <v-list-item @click="accessEdition(objectiveMovement)">
                        <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                        <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                     </v-list-item>
                     <v-list-item @click="executeExclusion(objectiveMovement)">
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
                  <df-output-text class="text-left" label="Source">{{ objectiveMovement.accountSource.name }}</df-output-text>
                  <df-output-text class="text-left" label="Target">{{ objectiveMovement.accountTarget.name }}</df-output-text>
                  <df-output-text class="text-left" label="Due Date">{{ objectiveMovement.dueDate }}</df-output-text>
                  <df-output-text class="text-left" label="Payment Date">{{ objectiveMovement.paymentDate }}</df-output-text>
                  <df-output-text class="text-left" label="Payment Method">{{ objectiveMovement.paymentMethod.name }}</df-output-text>
                  <df-output-text class="text-left" label="Registration Date">{{ objectiveMovement.objective.location.name }}</df-output-text>
                  <df-output-text class="text-left" label="Installment">{{ objectiveMovement.installment }}</df-output-text>
               </df-grid>
            </v-card-text>
         </v-card>
      </v-card-text>

      <v-card-text v-if="objectiveMovementList.length == 0">No results found.</v-card-text>
   </v-card>
</template>

<script>
import ActivityService from "./ActivityService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";


export default {
   name: "ActivityResult",
   components: { DfGrid, DfOutputText, DfIcon },
   mixins: [ActivityService],
   props: {
      collection: {
         type: Array,
         required: true
      }
   },
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
