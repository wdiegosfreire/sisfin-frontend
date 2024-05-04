<template>
   <v-card>
      <v-card-text>
         <v-simple-table>
            <template v-slot:default>
               <thead>
                  <tr>
                     <th width="100px">Identity</th>
                     <th width="100px">Icon</th>
                     <th>Name</th>
                     <th width="100px" class="text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="account in collection" :key="account.identity">
                     <td :class="getBoldFont(account)">{{ account.identity }}</td>
                     <td><df-icon v-if="account.icon" size="lg" :icon="account.icon" class="pl-1" /></td>
                     <td :class="getBoldFont(account)">{{ account.level }} {{ account.name }}</td>
                     <td class="text-right">
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
                     </td>
                  </tr>
               </tbody>
            </template>
         </v-simple-table>
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
   },

   methods: {
      getIdentation(account) {
         let marginLeft = "";

         if (account.accountParent && account.accountParent.accountParent)
            marginLeft = "ml-16"
         else if (account.accountParent && !account.accountParent.accountParent)
            marginLeft = "ml-8"

         return marginLeft;
      },

      getBoldFont(account) {
         if (account.level.length == 3) {
            return "font-weight-bold";
         }

         return "";
      }
   }
};
</script>
