<template>
   <v-card>
      <v-card-text>
         <button @click="$emit('test', 'Bolinha')">dsfgsdf</button>

         <v-card outlined class="elevation-1 mb-4" v-for="objectiveMovement in collection" :key="objectiveMovement.identity">
            <v-card-title>
               <span>{{ objectiveMovement.objective.description }}: R$ {{ objectiveMovement.value }}</span>

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
                     <v-list-item @click="$emit('accessEdition', objectiveMovement)">
                        <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                        <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                     </v-list-item>
                     <v-list-item @click="$emit('executeExclusion', objectiveMovement)">
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
                  <df-output-text class="text-left" label="Identity">{{ objectiveMovement.identity }}</df-output-text>
                  <df-output-text class="text-left" label="Registration Date">{{ objectiveMovement.registrationDate }}</df-output-text>
                  <df-output-text class="text-left" label="Due Date">{{ objectiveMovement.dueDate }}</df-output-text>
                  <df-output-text class="text-left" label="Payment Date">{{ objectiveMovement.paymentDate }}</df-output-text>
                  <df-output-text class="text-left" label="Installment">{{ objectiveMovement.installment }}</df-output-text>
                  <df-output-text class="text-left" label="Payment Method">{{ objectiveMovement.paymentMethod.name }}</df-output-text>
                  <df-output-text class="text-left" label="Account Source">{{ objectiveMovement.accountSource.name }}</df-output-text>
                  <df-output-text class="text-left" label="Account Target">{{ objectiveMovement.accountTarget.name }}</df-output-text>
                  <df-output-text class="text-left" label="Location">{{ objectiveMovement.objective.location.name }}</df-output-text>
               </df-grid>
            </v-card-text>
         </v-card>
      </v-card-text>

      <v-card-text v-if="collection.length == 0">No results found.</v-card-text>
   </v-card>
</template>

<script>
import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";

export default {
   name: "ObjectiveMovementResult",

   components: {DfGrid, DfOutputText, DfIcon },

   props: {
      collection: {
         type: Array,
         required: true
      }
   },

   data() {
      return {
         search: ""
      };
   }
};
</script>
