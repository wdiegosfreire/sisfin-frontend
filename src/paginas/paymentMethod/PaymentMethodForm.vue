<template>
   <v-dialog persistent v-model="$store.state.globalDialog" width="800">
      <v-card class="mb-3">
         <v-toolbar color="primary" height="35" dark flat>
            <v-toolbar-title>
               <span v-if="this.paymentMethod.identity">Edit Payment Method</span>
               <span v-else>New Payment Method</span>
            </v-toolbar-title>
         </v-toolbar>

         <v-card-text>
            <df-grid v-if="paymentMethod.identity" >
               <v-text-field label="Identity" readonly v-model="paymentMethod.identity" />
            </df-grid>
            <df-grid>
               <v-text-field label="Name" v-model="paymentMethod.name" :readonly="Boolean(paymentMethod.identity)" />
            </df-grid>
            <df-grid>
               <v-text-field label="Acronym" v-model="paymentMethod.acronym" />
            </df-grid>
         </v-card-text>

         <v-card-actions>
            <v-btn v-if="this.paymentMethod.identity" color="button" width="150" @click="executeEdition()">Confirm</v-btn>
            <v-btn v-else width="150" @click="executeRegistration()">Confirmar</v-btn>

            <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
            <v-btn width="150" @click="fecharFormulario()">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import paymentMethodService from "./paymentMethodService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
   name: "PaymentMethodForm",
   components: { DfGrid },
   mixins: [paymentMethodService],
   methods: {
      limparFormulario() {
         this.paymentMethod.identity = null;
         this.paymentMethod.name = "";
         this.paymentMethod.acronym = "";
      },

      fecharFormulario() {
         this.limparFormulario();
         this.$store.commit("showGlobalDialog", false);
         
      },

      updateGlobalEntity() {
         this.paymentMethod = this.$store.state.globalEntity;
      }
   },
   watch: {
      "$store.state.globalEntity": "updateGlobalEntity",
   },
};
</script>
