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
                  <v-select @change="$emit('accessRegistration', accountComboLevelOneSelected); updateParentAccount(accountComboLevelOneSelected);" v-model="accountComboLevelOneSelected" return-object label="First Level Account" item-text="name" :items="accountListComboLevelOne"></v-select>
                  <v-select @change="updateParentAccount(accountComboLevelTwoSelected)" v-model="accountComboLevelTwoSelected" return-object label="Second Level Account" item-text="name" :items="accountListComboLevelTwo" no-data-text="Contas não Identificadas"></v-select>
               </df-grid>
            </span>

            <v-text-field label="Name" v-model="account.name" :readonly="Boolean(account.identity)" />
            <v-text-field label="Notes" v-model="account.note" />

            Icons (experimental)
            <v-btn-toggle :v-model="2" class="pb-3" style="overflow: auto;">
               <v-btn><df-icon @click="setIcon('fa-magnifying-glass')" icon="fa-magnifying-glass" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-heart-pulse')" icon="fa-heart-pulse" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-lightbulb')" icon="fa-lightbulb" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-gas-pump')" icon="fa-gas-pump" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-utensils')" icon="fa-utensils" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-wrench')" icon="fa-wrench" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-car')" icon="fa-car" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-broom')" icon="fa-broom" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-wifi')" icon="fa-wifi" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-building')" icon="fa-building" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-bolt')" icon="fa-bolt" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-oil-can')" icon="fa-oil-can" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-plane-departure')" icon="fa-plane-departure" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-taxi')" icon="fa-taxi" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-credit-card')" icon="fa-credit-card" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-computer')" icon="fa-computer" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-plug-circle-bolt')" icon="fa-plug-circle-bolt" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-hammer')" icon="fa-hammer" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-basketball')" icon="fa-basketball" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-mobile')" icon="fa-mobile" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-bicycle')" icon="fa-bicycle" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-tv')" icon="fa-tv" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-burger')" icon="fa-burger" /></v-btn>
               <v-btn><df-icon @click="setIcon('fa-film')" icon="fa-film" /></v-btn>
				</v-btn-toggle>
         </v-card-text>

         <v-card-actions>
            <v-btn v-if="this.account.identity" color="button" width="150" @click="executeEdition">Confirm</v-btn>
            <v-btn v-else width="150" @click="executeRegistration">Confirm</v-btn>

            <v-btn width="150" @click="cleanForm">Clear</v-btn>
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
		executeRegistration() {
			if (this.isMissingRequiredFields()) {
				return;
			}

			this.$emit('executeRegistration', this.account);
		},

		executeEdition() {
			if (this.isMissingIdentity() || this.isMissingRequiredFields()) {
				return;
			}

			this.$emit('executeEdition', this.account);
		},

      isMissingIdentity() {
         if (!this.account.identity) {
            this.$_message_showRequired("Missing account identity.");
            return true;
         }

         return false;
      },

      isMissingRequiredFields() {
         if (!this.account?.accountParent?.identity) {
            this.$_message_showRequired("Missing account parent.");
            return;
         }

         if (!this.account?.name?.trim()) {
            this.$_message_showRequired("Missing account name.");
            return;
         }

         return false;
      },

		setIcon(iconName) {
			if (iconName === this.account.icon) {
				this.account.icon = "";
			}
			else {
				this.account.icon = iconName;
			}
		},

      updateParentAccount(accountParent) {
         this.account.accountParent = null;

         if (this.account && accountParent)
            this.account.accountParent = accountParent;
      },

      cleanForm() {
         if (!this.account.identity) {
            this.account.name = null;
            this.account.level = "";
            this.account.icon = "";
            this.account.accountParent = null;

            this.accountComboLevelOneSelected = {};
            this.accountComboLevelTwoSelected = {};
         }

         this.account.note = "";
      },

      closeForm(account) {
         this.accountComboLevelOneSelected = {};
         this.accountComboLevelTwoSelected = {};

         this.$emit('closeForm', account);
      }
   }
};
</script>
