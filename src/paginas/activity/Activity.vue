<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-toolbar-title>Activities</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
      <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
      <v-btn icon @click.stop="accessRegistration()" title="Click to register a new activity"><df-icon icon="fa-plus" /></v-btn>
    </v-app-bar>

    <df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

    <activity-result :collection="objectiveMovementList" />
    <activity-form />
  </div>
</template>

<script>
import ActivityService from "./ActivityService.js";
import ActivityResult from "./ActivityResult.vue";
import ActivityForm from "./ActivityForm.vue";

import DfIcon from "../../components/df-icon/Icon.vue";
import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
   name: "Activity",
   components: { ActivityResult, ActivityForm, DfInputFilter, DfIcon },
   mixins: [ActivityService],

   methods: {
      toggleFilterField() {
         if (this.activity.filter) {
            this.activity.filter = "";
            //this.executeSearch();
         }

         this.showSearchField = !this.showSearchField;
      }
   },

   created() {
      this.accessModule();
   },
};
</script>
