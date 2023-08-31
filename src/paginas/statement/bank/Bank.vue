<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Banks</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration()" title="Click to register a new bank"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

      <bank-result :collection="$store.state.globalResult"
         @accessEdition="accessEdition"
         @executeExclusion="executeExclusion"
      />

      <bank-form :bank="$store.state.globalEntity"
         @executeRegistration="executeRegistration"
         @executeEdition="executeEdition"
         @cleanForm="cleanForm"
         @closeForm="closeForm"
      />
   </div>
</template>

<script lang="js">
import bankService from "./bankService.js";
import BankResult from "./BankResult.vue";
import BankForm from "./BankForm.vue";

import DfIcon from "../../../components/df-icon/Icon.vue";
import DfInputFilter from "../../../components/input/InputFilter.vue";

export default {
   name: "Bank",

   components: { BankResult, BankForm, DfInputFilter, DfIcon },

   mixins: [bankService],

   methods: {
      toggleFilterField() {
         if (this.showSearchField)
            this.executeSearch();

         this.showSearchField = !this.showSearchField;
      }
   },

   created() {
      this.accessModule();
   },
};
</script>
