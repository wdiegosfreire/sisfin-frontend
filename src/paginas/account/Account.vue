<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Accounts</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration()" title="Click to register a new account"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

      <account-result />
      <account-form />
   </div>
</template>

<script>
import accountService from "./accountService.js";
import AccountResult from "./AccountResult.vue";
import AccountForm from "./AccountForm.vue";

import DfIcon from "../../components/df-icon/Icon.vue";
import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
   name: "Account",
   components: { AccountResult, AccountForm, DfInputFilter, DfIcon },
   mixins: [accountService],

   methods: {
      toggleFilterField() {
         if (this.account.filter) {
            this.account.filter = "";
            this.executeSearch();
         }

         this.showSearchField = !this.showSearchField;
      }
   },

   created() {
      this.accessModule();
   },
};
</script>
