<template>
   <v-card>
      <v-card-text>
         <h3 v-if="collection.length > 0" class="text-left pb-3">Results in This Page: {{ collection.length }}</h3>

         <v-treeview :items="collection" item-children="accountListChild" item-key="identity" class="text-left" hoverable transition activatable>
            <template v-slot:prepend="{ item }">
               <df-icon v-if="item.icon" size="lg" :icon="item.icon" class="pl-1" />
            </template>
            <template v-slot:label="{ item }">
               <span class="ml-2">{{ item.level }}</span>
               <span class="ml-2">{{ item.name }}</span>
               <span class="ml-2" v-if="item.note">({{ item.note }})</span>
            </template>
            <template v-slot:append="{ item }">
               <div v-if="item.level.length > 3">
                  <v-menu offset-y>
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined fab small v-bind="attrs" v-on="on">
                           <df-icon icon="fa-bars" />
                        </v-btn>
                     </template>
                     <v-list dense width="150">
                        <v-subheader>Options</v-subheader>
                        <v-list-item-group>
                           <v-list-item @click="$emit('accessEdition', item)">
                              <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                              <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                           </v-list-item>
                           <v-list-item v-if="!item.accountListChild" @click="$emit('executeExclusion', item)">
                              <v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
                              <v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
                           </v-list-item>
                        </v-list-item-group>
                     </v-list>
                  </v-menu>
               </div>
            </template>
         </v-treeview>
      </v-card-text>

      <v-card-text v-if="collection.length == 0">No results found.</v-card-text>
   </v-card>
</template>

<script>
import DfIcon from "../../components/df-icon/Icon.vue";

export default {
   name: "AccountResult",

   components: { DfIcon },

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
