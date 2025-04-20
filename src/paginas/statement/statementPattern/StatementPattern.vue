<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Statement Patterns</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration()" title="Click to register a new statement pattern"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

      <statement-pattern-result :collection="statementPatternListResult"
         @accessEdition="accessEdition"
         @executeExclusion="executeExclusion"
      />

      <statement-pattern-form :statementPattern="statementPatternForm"
         :account-list-combo-target="accountListComboTarget"
         :payment-method-list-combo="paymentMethodListCombo"
         :statement-type-list-combo="statementTypeListCombo"
         :location-list-combo="locationListCombo"

         @executeRegistration="executeRegistration"
         @accessRegistration="accessRegistration"
         @executeEdition="executeEdition"
         @closeForm="closeForm"
      />
   </div>
</template>

<script lang="js">
import statementPatternService from "./statementPatternService.js";
import StatementPatternResult from "./StatementPatternResult.vue";
import StatementPatternForm from "./StatementPatternForm.vue";

import DfIcon from "../../../components/df-icon/Icon.vue";
import DfInputFilter from "../../../components/input/InputFilter.vue";

export default {
   name: "StatementPattern",

   components: { StatementPatternResult, StatementPatternForm, DfInputFilter, DfIcon },

   mixins: [statementPatternService],

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
