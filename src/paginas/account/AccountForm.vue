<template>
   <v-dialog persistent v-model="$store.state.globalDialog" width="800">
      <v-card class="mb-3">
         <v-toolbar color="primary" height="35" dark flat>
            <v-toolbar-title>
               <span v-if="this.account.identity">Edit Account</span>
               <span v-else>New Account</span>
            </v-toolbar-title>
         </v-toolbar>

         <v-card-text>
            <df-grid v-if="account.identity" >
               <v-text-field label="Identity" readonly v-model="account.identity" />
            </df-grid>
            <df-grid>
               <v-text-field label="Name" v-model="account.name" :readonly="Boolean(account.identity)" />
            </df-grid>
            <df-grid>
               <v-text-field label="Level" v-model="account.level" />
            </df-grid>
         </v-card-text>

         <v-card-actions>
            <v-btn v-if="this.account.identity" color="button" width="150" @click="executeEdition()">Confirm</v-btn>
            <v-btn v-else width="150" @click="executeRegistration()">Confirmar</v-btn>

            <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
            <v-btn width="150" @click="fecharFormulario()">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import accountService from "./accountService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
   name: "AccountForm",
   components: { DfGrid },
   mixins: [accountService],
   methods: {
      limparFormulario() {
         this.account.identity = null;
         this.account.name = "";
         this.account.level = "";
      },

      fecharFormulario() {
         this.limparFormulario();
         this.$store.commit("showGlobalDialog", false);
         
      },

      updateGlobalEntity() {
         this.account = this.$store.state.globalEntity;
      }
   },
   watch: {
      "$store.state.globalEntity": "updateGlobalEntity",
   },
};
</script>
