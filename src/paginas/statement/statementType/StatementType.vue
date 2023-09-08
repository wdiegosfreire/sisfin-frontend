<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Statement Types</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration()" title="Click to register a new statement type"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

      <statement-type-result :collection="$store.state.globalResult"
         @accessEdition="accessEdition"
         @executeExclusion="executeExclusion"
      />

      <statement-type-form
         :statementType="$store.state.globalEntity"
         :bank-list-combo="$store.state.globalBankListCombo"

         @executeRegistration="executeRegistration"
         @executeEdition="executeEdition"
         @cleanForm="cleanForm"
         @closeForm="closeForm"
      />
   </div>
</template>

<script lang="js">
import statementTypeService from "./statementTypeService.js";
import StatementTypeResult from "./StatementTypeResult.vue";
import StatementTypeForm from "./StatementTypeForm.vue";

import DfIcon from "../../../components/df-icon/Icon.vue";
import DfInputFilter from "../../../components/input/InputFilter.vue";

export default {
   name: "StatementType",

   components: { StatementTypeResult, StatementTypeForm, DfInputFilter, DfIcon },

   mixins: [statementTypeService],

   methods: {
      toggleFilterField() {
         if (this.showSearchField)
            this.executeSearch();

         this.showSearchField = !this.showSearchField;
      }
   },

   created() {
      this.$store.commit("setGlobalEntity", {
         description: "",
         objectiveMovementList: [],
         objectiveItemList: []
      });

      this.accessModule();
   },
};
</script>
