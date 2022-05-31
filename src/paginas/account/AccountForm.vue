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
            <span v-if="account.identity" >
               <df-grid>
                  <v-text-field label="Identity" readonly v-model="account.identity" />
               </df-grid>
               <df-grid>
                  <v-text-field v-if="account.level.length == 6" label="First Level Account" v-model="account.accountParent.name" readonly />
                  <v-text-field v-if="account.level.length == 9" label="First Level Account" v-model="account.accountParent.accountParent.name" readonly />
                  <v-text-field v-if="account.level.length == 9" label="Second Level Account" v-model="account.accountParent.name" readonly />
               </df-grid>
            </span>
            <span v-else>
               <df-grid>
                  <v-select @change="accessRegistration(); computeAccountLevelPrefix()" v-model="accountComboLevelOneSelected" return-object label="First Level Account" item-text="name" :items="accountListComboLevelOne"></v-select>
                  <v-select @change="computeAccountLevelPrefix()" v-model="accountComboLevelTwoSelected" return-object label="Second Level Account" item-text="name" :items="accountListComboLevelTwo" no-data-text="Contas não Identificadas"></v-select>
               </df-grid>
               <df-grid>
                  <v-text-field label="Prefix Level" v-model="levelPrefix" readonly tabindex="-1"  />
                  <v-text-field @input="computeAccountLevelFinal()" @keypress="isNumber($event)" label="Sufix Level" v-model="levelSufix" maxlength="2" />
               </df-grid>
            </span>

            <v-text-field label="Final Level" v-model="account.level" readonly tabindex="-1" />
            <v-text-field label="Name" v-model="account.name" :readonly="Boolean(account.identity)" />
            <v-text-field label="Notes" v-model="account.note" />
            <v-text-field label="Icon" v-model="account.icon" readonly tabindex="-1" />

            <df-grid column="fixed-1">
               Icons (experimental)
               <df-grid column="auto-xs" style="max-height: 116px; overflow: auto; cursor: pointer;">
                  <df-icon @click="setIcon('fa-magnifying-glass');" icon="fa-magnifying-glass" />
                  <df-icon @click="setIcon('fa-heart-pulse');" icon="fa-heart-pulse" />
                  <df-icon @click="setIcon('fa-lightbulb');" icon="fa-lightbulb" />
                  <df-icon @click="setIcon('fa-gas-pump');" icon="fa-gas-pump" />
                  <df-icon @click="setIcon('fa-utensils');" icon="fa-utensils" />
                  <df-icon @click="setIcon('fa-wrench');" icon="fa-wrench" />
                  <df-icon @click="setIcon('fa-car');" icon="fa-car" />
                  <df-icon @click="setIcon('fa-broom');" icon="fa-broom" />
                  <df-icon @click="setIcon('fa-wifi');" icon="fa-wifi" />
                  <df-icon @click="setIcon('fa-building');" icon="fa-building" />
                  <df-icon @click="setIcon('fa-bolt');" icon="fa-bolt" />
                  <df-icon @click="setIcon('fa-oil-can');" icon="fa-oil-can" />
                  <df-icon @click="setIcon('fa-plane-departure');" icon="fa-plane-departure" />
                  <df-icon @click="setIcon('fa-taxi');" icon="fa-taxi" />
                  <df-icon @click="setIcon('fa-credit-card');" icon="fa-credit-card" />
                  <df-icon @click="setIcon('fa-computer');" icon="fa-computer" />
                  <df-icon @click="setIcon('fa-plug-circle-bolt');" icon="fa-plug-circle-bolt" />
                  <df-icon @click="setIcon('fa-hammer');" icon="fa-hammer" />
                  <df-icon @click="setIcon('fa-basketball');" icon="fa-basketball" />
                  <df-icon @click="setIcon('fa-mobile');" icon="fa-mobile" />
                  <df-icon @click="setIcon('fa-bicycle');" icon="fa-bicycle" />
                  <df-icon @click="setIcon('fa-tv');" icon="fa-tv" />
                  <df-icon @click="setIcon('fa-burger');" icon="fa-burger" />
                  <df-icon @click="setIcon('fa-film');" icon="fa-film" />
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

import message from "../../components/mixins/message.js";

export default {
   name: "AccountForm",
   components: { DfGrid, DfIcon },
   mixins: [ accountService, message ],

   methods: {
      clearRegistrationForm() {
         this.levelSufix =  "",
         this.levelPrefix =  "",
         this.accountComboLevelOneSelected =  {},
         this.accountComboLevelTwoSelected =  {},

         this.account = {
            icon: "",
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
      },

      setIcon(faIcon) {
         this.account.icon = faIcon;
      }
   },
   watch: {
      "$store.state.globalEntity": "updateGlobalEntity",
      "$store.state.globalAccountListComboLevelOne": "updateGlobalAccountListComboLevelOne",
      "$store.state.globalAccountListComboLevelTwo": "updateGlobalAccountListComboLevelTwo"
   }
};
</script>
