<template>
   <v-card>
      <v-card-text>
         <v-card outlined class="elevation-1 mb-4" v-for="bank in collection" :key="bank.identity">
            <v-card-title>
               <span>{{ bank.name }}</span>

               <v-spacer></v-spacer>
               <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn outlined fab small v-bind="attrs" v-on="on">
                        <df-icon icon="fa-bars" />
                     </v-btn>
                  </template>
                  <v-list dense width="150">
                     <v-subheader>Options</v-subheader>
                     <v-list-item-group>
                        <v-list-item @click="$emit('accessEdition', bank)">
                           <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                           <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="$emit('executeExclusion', bank)">
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
                  <df-output-text class="text-left" label="Identity">{{ bank.identity }}</df-output-text>
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
   name: "BankResult",

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
