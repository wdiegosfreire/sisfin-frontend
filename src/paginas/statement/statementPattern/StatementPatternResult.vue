<template>
   <v-card>
      <v-card-text>
         <h3 v-if="collection.length > 0" class="text-left pb-3">Results in This Page: {{ collection.length }}</h3>
         <v-card outlined class="elevation-1 mb-4" v-for="statementPattern in collection" :key="statementPattern.identity">
            <v-card-title>
               <span>{{ statementPattern.comparator }}</span>

               <v-spacer></v-spacer>
               <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn outlined fab small v-bind="attrs" v-on="on"><df-icon icon="fa-bars" /></v-btn>
                  </template>
                  <v-list dense width="150">
                     <v-subheader>Options</v-subheader>
                     <v-list-item-group>
                        <v-list-item @click="$emit('accessEdition', statementPattern)">
                           <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                           <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="$emit('executeExclusion', statementPattern)">
                           <v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
                           <v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
                        </v-list-item>
                     </v-list-item-group>
                  </v-list>
               </v-menu>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
               <df-grid spaced>
                  <df-output-text class="text-left" label="Identity">{{ statementPattern.identity }}</df-output-text>
                  <df-output-text class="text-left" label="Description">{{ statementPattern.description }}</df-output-text>
                  <df-output-text class="text-left" label="Source Account">{{ statementPattern.accountSource | traceAccount }}</df-output-text>
                  <df-output-text class="text-left" label="Target Account">{{ statementPattern.accountTarget | traceAccount }}</df-output-text>
                  <df-output-text class="text-left" label="Payment Method">{{ statementPattern.paymentMethod.name }} ({{ statementPattern.paymentMethod.acronym }})</df-output-text>
                  <df-output-text class="text-left" label="Statement Type">{{ statementPattern.statementType.bank.name }} :: {{ statementPattern.statementType.name }}</df-output-text>
                  <df-output-text class="text-left" label="Location">{{ statementPattern.location ? statementPattern.location.name : "" }}</df-output-text>
               </df-grid>
            </v-card-text>
         </v-card>
      </v-card-text>

      <v-card-text v-if="collection.length == 0">No results found.</v-card-text>
   </v-card>
</template>

<script>
import DfGrid from "../../../components/grid/Grid.vue";
import DfIcon from "../../../components/df-icon/Icon.vue";
import DfOutputText from "../../../components/output/OutputText.vue";

export default {
   name: "StatementPatternResult",

   components: { DfGrid, DfOutputText, DfIcon },

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
