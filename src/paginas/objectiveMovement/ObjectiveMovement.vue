<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Movements</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
         <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
         <v-btn icon @click.stop="accessRegistration()" title="Click to register a new movement"><df-icon icon="fa-plus" /></v-btn>
      </v-app-bar>

      <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

      <df-grid>
         <v-select label="Month" :items="monthList" item-text="monthName" item-value="monthNumber" :v-model="periodMonth" @change="periodMonthChange($event)"></v-select>
         <v-text-field label="Year" :v-model="periodYear" @input="periodYearChange($event)" />
      </df-grid>

      <objective-movement-result :collection="$store.state.globalResult" @accessEdition="accessEdition" @executeExclusion="executeExclusion" />
      <objective-movement-form />
   </div>
</template>

<script>
import ObjectiveMovementService from "./ObjectiveMovementService.js";
import ObjectiveMovementResult from "./ObjectiveMovementResult.vue";
import ObjectiveMovementForm from "./ObjectiveMovementForm.vue";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfInputFilter from "../../components/input/InputFilter.vue";

import message from "../../components/mixins/message.js";

export default {
   name: "ObjectiveMovement",
   components: { ObjectiveMovementResult, ObjectiveMovementForm, DfInputFilter, DfGrid, DfIcon },
   mixins: [ ObjectiveMovementService, message ],

   data() {
      return {
         objectiveMovementList: []
      }
   },

   methods: {
      test(message) {
         this.$_message_alert(message);
      },

      toggleFilterField() {
         if (this.objectiveMovement.filter) {
            this.objectiveMovement.filter = "";
            this.executeSearch();
         }

         this.showSearchField = !this.showSearchField;
      },

      periodMonthChange(selectedMonth) {
         this.periodMonth = selectedMonth;
         this.accessModule();
      },

      periodYearChange(selectedYear) {
         if (selectedYear.length == 4) {
            this.periodYear = selectedYear;
            this.accessModule();
         }
      }
   },

   created() {
      this.accessModule();
   },
};
</script>
