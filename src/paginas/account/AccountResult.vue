<template>
   <v-card>
      <v-card-text>
         <v-card outlined class="elevation-1 mb-4" v-for="account in accountList" :key="account.identity">
            <v-card-title class="pb-0 pt-0">
               <span v-if="account.accountParent">
                  <span v-if="account.accountParent.accountParent">{{ account.accountParent.accountParent.name }}.</span>
                  <span>{{ account.accountParent.name }}.</span>
               </span>
               <span>{{ account.name }}</span>
            </v-card-title>
            <v-card-text>
               <df-grid column="menu">
                  <df-grid>
                     <df-output-text class="text-left" label="Identity">{{ account.identity }}</df-output-text>
                     <df-output-text class="text-left" label="Level">{{ account.level }}</df-output-text>
                     <df-output-text class="text-justify" label="Notes">{{ account.note ? account.note : "-" }}</df-output-text>
                  </df-grid>
                  <div v-if="account.accountParent">
                     <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn outlined fab small v-bind="attrs" v-on="on">
                              <df-icon icon="menu" />
                           </v-btn>
                        </template>
                        <v-list dense width="150">
                           <v-subheader>Options</v-subheader>
                           <v-list-item-group>
                              <v-list-item @click="accessEdition(account)">
                                 <v-list-item-icon><df-icon icon="edit" /></v-list-item-icon>
                                 <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                              </v-list-item>
                              <v-list-item @click="executeExclusion(account)">
                                 <v-list-item-icon><df-icon icon="trash" /></v-list-item-icon>
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

      <v-card-text v-if="accountList.length == 0">No results found.</v-card-text>
   </v-card>
</template>

<script>
import accountService from "./accountService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";

export default {
   name: "AccountResult",
   components: { DfGrid, DfOutputText, DfIcon },
   mixins: [accountService],
   data() {
      return {
         accountList: [],
         search: ""
      };
   },
   methods: {
      updateGlobalResult() {
         this.accountList = this.$store.state.globalResult;
      }
   },
   watch: {
      "$store.state.globalResult": "updateGlobalResult"
   }
};
</script>
