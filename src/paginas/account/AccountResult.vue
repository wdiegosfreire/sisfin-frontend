<template>
   <v-card>
      <v-card-text>
         <v-card outlined class="elevation-1 mb-4" :class="getIdentation(account)" v-for="account in collection" :key="account.identity">
            <v-card-title>
               <span v-if="account.accountParent">
                  <span v-if="account.accountParent.accountParent">{{ account.accountParent.accountParent.name }}<df-icon icon="fa-arrow-right" size="xs" class="pl-1 pr-1" /></span>
                  <span>{{ account.accountParent.name }}<df-icon icon="fa-arrow-right" size="xs" class="pl-1 pr-1" /></span>
               </span>
               <span>{{ account.name }}<df-icon v-if="account.icon" size="xs" :icon="account.icon" class="pl-1" /></span>

               <v-spacer></v-spacer>
               <div v-if="account.accountParent">
                  <v-menu offset-y>
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined fab small v-bind="attrs" v-on="on">
                           <df-icon icon="fa-bars" />
                        </v-btn>
                     </template>
                     <v-list dense width="150">
                        <v-subheader>Options</v-subheader>
                        <v-list-item-group>
                           <v-list-item @click="$emit('accessEdition', account)">
                              <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                              <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                           </v-list-item>
                           <v-list-item @click="$emit('executeExclusion', account)">
                              <v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
                              <v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
                           </v-list-item>
                        </v-list-item-group>
                     </v-list>
                  </v-menu>
               </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
               <df-grid column="auto-sm">
                  <df-output-text class="text-left" label="Identity">{{ account.identity }}</df-output-text>
                  <df-output-text class="text-left" label="Level">{{ account.level }}</df-output-text>
                  <df-output-text v-if="account.note" class="text-justify" label="Notes">{{ account.note }}</df-output-text>
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
   name: "AccountResult",

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
   },

   methods: {
      getIdentation(account) {
         let marginLeft = "";

         if (account.accountParent && account.accountParent.accountParent)
            marginLeft = "ml-16"
         else if (account.accountParent && !account.accountParent.accountParent)
            marginLeft = "ml-8"

         return marginLeft;
      }
   }
};
</script>
