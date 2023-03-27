<template>
   <v-dialog persistent v-model="$store.state.globalDialog" width="1000">
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
                  <v-select @change="$emit('accessRegistration', accountComboLevelOneSelected); $emit('updateParentAccount', account, accountComboLevelOneSelected);" v-model="accountComboLevelOneSelected" return-object label="First Level Account" item-text="name" :items="accountListComboLevelOne"></v-select>
                  <v-select @change="$emit('updateParentAccount', account, accountComboLevelTwoSelected);" v-model="accountComboLevelTwoSelected" return-object label="Second Level Account" item-text="name" :items="accountListComboLevelTwo" no-data-text="Contas não Identificadas"></v-select>
               </df-grid>
            </span>

            <v-text-field label="Name" v-model="account.name" :readonly="Boolean(account.identity)" />
            <v-text-field label="Notes" v-model="account.note" />
            <v-text-field label="Icon" v-model="account.icon" readonly tabindex="-1" />

            <df-grid column="fixed-1">
               Icons (experimental)
               <df-grid column="auto-xs" style="max-height: 116px; overflow: auto; cursor: pointer;">
                  <df-icon @click="$emit('setIcon', account, 'fa-magnifying-glass');" icon="fa-magnifying-glass" />
                  <df-icon @click="$emit('setIcon', account, 'fa-heart-pulse');" icon="fa-heart-pulse" />
                  <df-icon @click="$emit('setIcon', account, 'fa-lightbulb');" icon="fa-lightbulb" />
                  <df-icon @click="$emit('setIcon', account, 'fa-gas-pump');" icon="fa-gas-pump" />
                  <df-icon @click="$emit('setIcon', account, 'fa-utensils');" icon="fa-utensils" />
                  <df-icon @click="$emit('setIcon', account, 'fa-wrench');" icon="fa-wrench" />
                  <df-icon @click="$emit('setIcon', account, 'fa-car');" icon="fa-car" />
                  <df-icon @click="$emit('setIcon', account, 'fa-broom');" icon="fa-broom" />
                  <df-icon @click="$emit('setIcon', account, 'fa-wifi');" icon="fa-wifi" />
                  <df-icon @click="$emit('setIcon', account, 'fa-building');" icon="fa-building" />
                  <df-icon @click="$emit('setIcon', account, 'fa-bolt');" icon="fa-bolt" />
                  <df-icon @click="$emit('setIcon', account, 'fa-oil-can');" icon="fa-oil-can" />
                  <df-icon @click="$emit('setIcon', account, 'fa-plane-departure');" icon="fa-plane-departure" />
                  <df-icon @click="$emit('setIcon', account, 'fa-taxi');" icon="fa-taxi" />
                  <df-icon @click="$emit('setIcon', account, 'fa-credit-card');" icon="fa-credit-card" />
                  <df-icon @click="$emit('setIcon', account, 'fa-computer');" icon="fa-computer" />
                  <df-icon @click="$emit('setIcon', account, 'fa-plug-circle-bolt');" icon="fa-plug-circle-bolt" />
                  <df-icon @click="$emit('setIcon', account, 'fa-hammer');" icon="fa-hammer" />
                  <df-icon @click="$emit('setIcon', account, 'fa-basketball');" icon="fa-basketball" />
                  <df-icon @click="$emit('setIcon', account, 'fa-mobile');" icon="fa-mobile" />
                  <df-icon @click="$emit('setIcon', account, 'fa-bicycle');" icon="fa-bicycle" />
                  <df-icon @click="$emit('setIcon', account, 'fa-tv');" icon="fa-tv" />
                  <df-icon @click="$emit('setIcon', account, 'fa-burger');" icon="fa-burger" />
                  <df-icon @click="$emit('setIcon', account, 'fa-film');" icon="fa-film" />
               </df-grid>
            </df-grid>
         </v-card-text>

         <v-card-actions>
            <v-btn v-if="this.account.identity" color="button" width="150" @click="$emit('executeEdition', account)">Confirm</v-btn>
            <v-btn v-else width="150" @click="$emit('executeRegistration', account)">Confirm</v-btn>

            <v-btn width="150" @click="cleanForm(account)">Clear</v-btn>
            <v-btn width="150" @click="closeForm(account)">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";

import message from "../../components/mixins/message.js";

export default {
   name: "AccountForm",

   components: { DfGrid, DfIcon },

   mixins: [ message ],

   props: {
      account: {
         type: Object,
         required: true
      },
      accountListComboLevelOne: {
         type: Array,
         required: true
      },
      accountListComboLevelTwo: {
         type: Array,
         required: false
      }
   },

   data() {
      return {
         accountComboLevelOneSelected: {},
         accountComboLevelTwoSelected: {}
      }
   },

   methods: {
      cleanForm(account) {
         this.accountComboLevelOneSelected = {};
         this.accountComboLevelTwoSelected = {};

         this.$emit('cleanForm', account);
      },

      closeForm(account) {
         this.accountComboLevelOneSelected = {};
         this.accountComboLevelTwoSelected = {};

         this.$emit('closeForm', account);
      }
   }
};
</script>
