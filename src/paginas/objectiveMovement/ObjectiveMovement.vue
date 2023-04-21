<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Movements</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule();" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField();" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration();" title="Click to register a new movement"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

      <df-grid>
         <df-grid column="frac-45">
            <v-select label="Month" v-model="month" :items="monthList" item-text="monthName" item-value="monthNumber" @change="periodChange();" :disabled="ignoreMonth"></v-select>
            <v-switch v-model="ignoreMonth" inset></v-switch>
         </df-grid>
         <df-grid column="frac-45">
            <v-text-field label="Year" v-model="year" @input="periodChange();" :disabled="ignoreYear" />
            <v-switch v-model="ignoreYear" inset></v-switch>
         </df-grid>
      </df-grid>

      <objective-movement-result
         :collection="$store.state.globalResult"

         @accessEdition="accessEdition"
         @executeExclusion="executeExclusion"
      />

      <objective-movement-form
         :objective-movement="$store.state.globalEntity"
         :location-list-combo="$store.state.globalLocationListCombo"
         :payment-method-list-combo="$store.state.globalPaymentMethodListCombo"
         :account-list-combo-source="$store.state.globalAccountListComboSource"
         :account-list-combo-target="$store.state.globalAccountListComboTarget"

         @validateSelectedSource="validateSelectedSource"
         @validateSelectedTarget="validateSelectedTarget"
         @executeRegistration="executeRegistration"
         @cleanForm="cleanForm"
         @closeForm="closeForm"
      />
   </div>
</template>

<script>
import objectiveMovementService from "./objectiveMovementService.js";
import ObjectiveMovementResult from "./ObjectiveMovementResult.vue";
import ObjectiveMovementForm from "./ObjectiveMovementForm.vue";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfInputFilter from "../../components/input/InputFilter.vue";

import message from "../../components/mixins/message.js";

export default {
   name: "ObjectiveMovement",

   components: { ObjectiveMovementResult, ObjectiveMovementForm, DfInputFilter, DfGrid, DfIcon },

   mixins: [ objectiveMovementService, message ],

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
            this.executeSearch();

         this.showSearchField = !this.showSearchField;
      },

      periodChange() {
         if (this.month && this.year && this.year.length == 4) {
            this.$store.commit("setGlobalMonth", this.month);
            this.$store.commit("setGlobalYear", this.year);

            this.accessModule();
         }
      }
   },

   created() {
      this.$store.commit("setGlobalEntity", {
         paymentMethod: {},
         accountSource: {},
         accountTarget: {},
         objective: {
            location: {}
         }
      });

      let newDate = new Date();
      this.month = newDate.getMonth() + 1
      this.year = newDate.getFullYear() + "";

      if (this.month < 10) {
         this.month = "0" + this.month;
      }

      this.$store.commit("setGlobalMonth", this.month);
      this.$store.commit("setGlobalYear", this.year);

      this.accessModule();
   }
};
</script>
