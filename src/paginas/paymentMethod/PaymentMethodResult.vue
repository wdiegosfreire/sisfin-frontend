<template>
   <v-card>
      <v-card-text>
         <v-card outlined class="elevation-1 mb-4" v-for="paymentMethod in paymentMethodList" :key="paymentMethod.identity">
            <v-card-title class="pb-0 pt-0">
               <span>{{ paymentMethod.name }}</span>
            </v-card-title>
            <v-card-text>
               <df-grid column="menu">
                  <df-grid>
                     <df-output-text class="text-left" label="Identity">{{ paymentMethod.identity }}</df-output-text>
                     <df-output-text class="text-left" label="Acronym">{{ paymentMethod.acronym }}</df-output-text>
                  </df-grid>
                  <div>
                     <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn outlined fab small v-bind="attrs" v-on="on">
                              <df-icon icon="fa-bars" />
                           </v-btn>
                        </template>
                        <v-list dense width="150">
                           <v-subheader>Options</v-subheader>
                           <v-list-item-group>
                              <v-list-item @click="accessEdition(paymentMethod)">
                                 <v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
                                 <v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
                              </v-list-item>
                              <v-list-item @click="executeExclusion(paymentMethod)">
                                 <v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
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

      <v-card-text v-if="paymentMethodList.length == 0">No results found.</v-card-text>
   </v-card>
</template>

<script>
import paymentMethodService from "./paymentMethodService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";

export default {
   name: "PaymentMethodResult",
   components: { DfGrid, DfOutputText, DfIcon },
   mixins: [paymentMethodService],
   data() {
      return {
         paymentMethodList: [],
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
         this.paymentMethodList = this.$store.state.globalResult;
      }
   },
   watch: {
      "$store.state.globalResult": "updateGlobalResult"
   }
};
</script>
