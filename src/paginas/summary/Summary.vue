<template>
   <div>
      <v-app-bar color="primary" dense dark>
         <v-toolbar-title>Summary</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
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

      <v-card>
         <v-card-title>Incoming & Outcoming</v-card-title>
         <v-card-text class="text-left">
            <v-select @change="accessModule" v-model="incomingOutcomingChartAccountSelected" return-object label="Balance Account" item-text="name" :items="accountListBalanceCombo" no-data-text="No data found">
               <template v-slot:selection="{ item }">{{ item.accountParent.accountParent.name }} :: {{ item.accountParent.name }} :: {{ item.name }} Bolinha</template>
               <template v-slot:item="{ item }">{{ item.accountParent.accountParent.name }} :: {{ item.accountParent.name }} :: {{ item.name }}</template>
            </v-select>
            <BarChart :chartData="barChartData" />
         </v-card-text>
      </v-card>
   </div>
</template>

<script>
import summaryService from "./summaryService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import message from "../../components/mixins/message.js";

import BarChart from '../../components/chart/Bar.vue';

export default {
   name: "Summary",

   components: { DfGrid, DfIcon, BarChart },

   mixins: [ summaryService, message ],

   data() {
      return {
         month: "",
         year: "",
         ignoreMonth: false,
         ignoreYear: false
      };
   },

   methods: {
      periodChange() {
         if (this.month && this.year && this.year.length == 4) {
            this.$store.commit("setGlobalMonth", this.month);
            this.$store.commit("setGlobalYear", this.year);

            this.accessModule();
         }
      },

      chartInstance(chart) {
         this.chart = chart;
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
}
</script>
