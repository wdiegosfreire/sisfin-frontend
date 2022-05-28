<template>
   <v-dialog persistent v-model="$store.state.globalDialog" width="900">
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
               <v-select @change="accessRegistration(); computeAccountLevelPrefix()" v-model="accountComboLevelOneSelected" return-object label="First Level Account" item-text="name" :items="accountListComboLevelOne"></v-select>
               <v-select @change="computeAccountLevelPrefix()" v-model="accountComboLevelTwoSelected" return-object label="Second Level Account" item-text="name" :items="accountListComboLevelTwo" no-data-text="Contas não Identificadas"></v-select>
               <df-grid column="fixed-2">
                  <v-text-field label="Prefix Level" v-model="levelPrefix" readonly tabindex="-1"  />
                  <v-text-field @input="computeAccountLevelFinal()" @keypress="isNumber($event)" label="Sufix Level" v-model="levelSufix" maxlength="2" />
               </df-grid>
               <v-text-field label="Final Level" v-model="account.level" readonly tabindex="-1" />
            </df-grid>
            <df-grid>
               <v-text-field label="Name" v-model="account.name" :readonly="Boolean(account.identity)" />
            </df-grid>
            <df-grid column="fixed-1">
               Icons (experimental)
               <df-grid column="auto-xs">
                  <df-icon icon="fa-magnifying-glass" size="2x" />
                  <df-icon icon="fa-heart-pulse" size="2x" />
                  <df-icon icon="fa-magnifying-glass" size="2x" />
                  <df-icon icon="fa-gas-pump" size="2x" />
                  <df-icon icon="fa-utensils" size="2x" />
                  <df-icon icon="fa-wrench" size="2x" />
               </df-grid>
            </df-grid>
         </v-card-text>

         <v-card-actions>
            <span v-if="this.account.identity">
               <v-btn width="150" @click="executeEdition()">Confirm E</v-btn>
               <v-btn width="150" @click="clearEdditionForm()">Clear E</v-btn>
            </span>
            <span v-else>
               <v-btn width="150" @click="executeRegistration()">Confirmar R</v-btn>
               <v-btn width="150" @click="clearRegistrationForm()">Clear R</v-btn>
            </span>
            <v-btn width="150" @click="fecharFormulario()">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import accountService from "./accountService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";

export default {
   name: "AccountForm",
   components: { DfGrid, DfIcon },
   mixins: [ accountService ],

   methods: {
      clearRegistrationForm() {
         this.levelSufix =  "",
         this.levelPrefix =  "",
         this.accountComboLevelOneSelected =  {},
         this.accountComboLevelTwoSelected =  {},

         this.account = {
            accountParent: {}
         };
      },

      fecharFormulario() {
         this.clearRegistrationForm();
         this.$store.commit("showGlobalDialog", false);
      },

      updateGlobalEntity() {
         this.account = this.$store.state.globalEntity;
      },

      updateGlobalAccountListComboLevelOne() {
         this.accountListComboLevelOne = this.$store.state.globalAccountListComboLevelOne;
      },

      updateGlobalAccountListComboLevelTwo() {
         this.accountListComboLevelTwo = this.$store.state.globalAccountListComboLevelTwo;
      },

      computeAccountLevelPrefix() {
         this.levelPrefix = this.accountComboLevelOneSelected.level;

         if (this.accountComboLevelTwoSelected && this.accountComboLevelTwoSelected.level)
            this.levelPrefix = this.accountComboLevelTwoSelected.level;
      },

      computeAccountLevelFinal() {
         this.account.level = "";
         this.account.accountParent.identity = "";

         if (this.levelSufix.length) {
            this.account.level = this.accountComboLevelOneSelected.level + this.levelSufix + ".";
            this.account.accountParent.identity = this.accountComboLevelOneSelected.identity;

            if (this.accountComboLevelTwoSelected && this.accountComboLevelTwoSelected.level) {
               this.account.level = this.accountComboLevelTwoSelected.level + this.levelSufix + ".";
               this.account.accountParent.identity = this.accountComboLevelTwoSelected.identity;
            }
         }
      }
   },
   watch: {
      "$store.state.globalEntity": "updateGlobalEntity",
      "$store.state.globalAccountListComboLevelOne": "updateGlobalAccountListComboLevelOne",
      "$store.state.globalAccountListComboLevelTwo": "updateGlobalAccountListComboLevelTwo"
   }
};
</script>
