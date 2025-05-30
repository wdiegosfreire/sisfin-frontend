<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Objectives</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration()" title="Click to register a new objective"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-grid>
         <df-grid column="frac-45">
            <v-select label="Month" v-model="month" :items="monthList" item-text="monthName" item-value="monthNumber" @change="periodChange();" :disabled="ignoreMonth" autofocus></v-select>
            <v-switch v-model="ignoreMonth" inset></v-switch>
         </df-grid>
         <df-grid column="frac-45">
            <v-text-field label="Year" v-model="year" @input="periodChange();" :disabled="ignoreYear" />
            <v-switch v-model="ignoreYear" inset></v-switch>
         </df-grid>
      </df-grid>
      <df-grid v-if="showSearchField">
         <df-grid>
            <v-autocomplete v-model="filter.sourceAccount" label="Balance Account" item-text="name" item-value="identity" :items="accountListBalanceCombo" no-data-text="No data found" clearable return-object>
               <template v-slot:selection="{ item }">{{ item | traceAccount }}</template>
               <template v-slot:item="{ item }">{{ item | traceAccount }}</template>
            </v-autocomplete>
         </df-grid>
      </df-grid>
      <df-grid v-if="showSearchField" class="mb-5">
         <v-btn width="150" @click="accessModule">Filter</v-btn>
         <v-btn width="150" @click="clearFilters">Clear</v-btn>
      </df-grid>

      <objective-result
         :collection="$store.state.globalResult"

         @accessEdition="accessEdition"
         @executeExclusion="executeExclusion"
      />

      <objective-form
         :objective="$store.state.globalEntity"
         :location-list-combo="$store.state.globalLocationListCombo"
         :payment-method-list-combo="$store.state.globalPaymentMethodListCombo"
         :account-list-combo-source="$store.state.globalAccountListComboSource"
         :account-list-combo-target="$store.state.globalAccountListComboTarget"

         @executeRegistration="executeRegistration"
         @executeEdition="executeEdition"
         @cleanForm="cleanForm"
         @closeForm="closeForm"
      />
   </div>
</template>

<script>
import objectiveService from "./objectiveService.js";
import ObjectiveResult from "./ObjectiveResult.vue";
import ObjectiveForm from "./ObjectiveForm";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";

import message from "../../components/mixins/message.js";

export default {
   name: "Objective",

   components: { ObjectiveResult, ObjectiveForm, DfGrid, DfIcon },

   mixins: [ objectiveService, message ],

   data() {
      return {
         month: "",
         year: "",
         ignoreMonth: false,
         ignoreYear: false
      };
   },

   methods: {
      toggleFilterField() {
         if (this.showSearchField)
            this.clearFilters();

         this.showSearchField = !this.showSearchField;
      },

      periodChange() {
         if (this.month && this.year && this.year.length == 4) {
            this.$store.commit("setGlobalMonth", this.month);
            this.$store.commit("setGlobalYear", this.year);

            this.accessModule();
         }
      },

      clearFilters() {
         this.filter.sourceAccount = {};
         this.accessModule();
      }
   },

   created() {
      this.$store.commit("setGlobalEntity", {
         identity: null,
         description: null,
         location: {},
         objectiveMovementList: [],
         objectiveItemList: []
      });

      let newDate = new Date();
      this.month = newDate.getMonth();
      this.year = newDate.getFullYear();

      if (this.month == 0) {
         this.month = 12;
         this.year--;
      }

      this.year = this.year + "";
      this.month = this.month.toString().padStart(2,"0");

      this.$store.commit("setGlobalMonth", this.month);
      this.$store.commit("setGlobalYear", this.year);

      this.accessModule();
   }
};
</script>
