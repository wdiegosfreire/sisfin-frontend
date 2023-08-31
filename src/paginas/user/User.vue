<template>
   <v-card max-width="500">
        <v-img src="../../assets/imagens/financas-pessoais.jpg">
            <v-card-title class="headline">Authentication</v-card-title>
        </v-img>

        <v-card-text>
            <v-text-field label="E-mail" v-model="user.email" append-icon="mdi-mail" />
            <v-text-field label="Password" type="password" v-model="password" append-icon="mdi-lock" />
        </v-card-text>

        <v-card-actions>
            <v-btn color="button" width="150" @click="executeAuthentication">Confirm</v-btn>
            <v-btn color="button" width="150" @click="resetForm">Clear</v-btn>
        </v-card-actions>

         <v-card-actions v-if="maintenance">
            <v-alert outlined prominent type="error" border="left" class="text-left">
               The service "MAINTENANCE" is not responding. We'll try again after each 30 seconds until the service is back again.
            </v-alert>
         </v-card-actions>
         <v-card-actions v-if="transaction">
            <v-alert outlined prominent type="error" border="left" class="text-left">
               The service "TRANSACTION" is not responding. We'll try again after each 30 seconds until the service is back again.
            </v-alert>
         </v-card-actions>
         <v-card-actions v-if="statement">
            <v-alert outlined prominent type="error" border="left" class="text-left">
               The service "STATEMENT" is not responding. We'll try again after each 30 seconds until the service is back again.
            </v-alert>
         </v-card-actions>
    </v-card>
</template>

<script>
import maintenanceApi from "../../components/axios/maintenance/maintenanceApi.js";
import transactionApi from "../../components/axios/transaction/transactionApi.js";
import statementApi from "../../components/axios/statement/statementApi.js";
import userService from "./userService.js";

export default {
   name: "User",
   mixins: [ maintenanceApi, transactionApi, statementApi, userService ],

   data() {
      return {
         maintenance: false,
         transaction: false,
         statement: false,
         timeoutDelay: 30000
      }
   },

   methods: {
      checkMicroServiceMaintenance() {
         let _this = this;

         this.$_maintenance_get(`/imrunning`).then(() => {
            _this.maintenance = false;
         }).catch(() => {
            _this.maintenance = true;
            setTimeout(function() {_this.checkMicroServiceMaintenance();}, _this.timeoutDelay);
         });
      },

      checkMicroServiceTransaction() {
         let _this = this;

         this.$_transaction_get(`/imrunning`).then(() => {
            _this.transaction = false;
         }).catch(() => {
            _this.transaction = true;
            setTimeout(function() {_this.checkMicroServiceTransaction();}, _this.timeoutDelay);
         });
      },

      checkMicroServiceStatement() {
         let _this = this;

         this.$_statement_get(`/imrunning`).then(() => {
            _this.statement = false;
         }).catch(() => {
            _this.statement = true;
            setTimeout(function() {_this.checkMicroServiceStatement();}, _this.timeoutDelay);
         });
      }
   },

   created: function () {
      this.checkMicroServiceMaintenance();
      this.checkMicroServiceTransaction();
      this.checkMicroServiceStatement();
   }
}
</script>