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
            <v-select label="Month" v-model="month" :items="monthList" item-text="monthName" item-value="monthNumber" @change="periodChange();" :disabled="ignoreMonth" autofocus></v-select>
            <v-switch v-model="ignoreMonth" inset></v-switch>
         </df-grid>
         <df-grid column="frac-45">
            <v-text-field label="Year" v-model="year" @input="periodChange();" :disabled="ignoreYear" />
            <v-switch v-model="ignoreYear" inset></v-switch>
         </df-grid>
         <df-grid>
            <v-select @change="accessModule" v-model="periodRange" label="Period Range" :items="periodRangeList" />
         </df-grid>
      </df-grid>

      <v-card class="mb-3">
         <v-card-title>Incoming & Outcoming</v-card-title>
         <v-card-text class="text-left">
				<df-grid>
					<v-autocomplete @change="accessModule" v-model="balanceAccountSelected" return-object label="Balance Account" item-text="name" item-value="identity" :items="accountListBalanceCombo" no-data-text="No data found">
						<template v-slot:selection="{ item }">{{ item | traceAccount }}</template>
						<template v-slot:item="{ item }">{{ item | traceAccount }}</template>
					</v-autocomplete>
				</df-grid>

				<df-grid class="mb-3">
					<v-card v-for="(label, index) in incomingOutcomingSummaryTableData.labels" :key="index" elevation="8">
						<v-card-title class="text-h5">{{ label }}</v-card-title>
						<v-simple-table dense>
							<tbody>
								<tr v-for="data in incomingOutcomingSummaryTableData.datasets" :key="data.label">
									<td class="pr-0" style="width: 1px;">{{ data.identifier }}.</td>
									<td>{{ data.label }}</td>
                           <td class="text-right">{{ data.data[index] | currency }}</td>
                           <td class="pl-0" style="width: 1px;"><df-icon :icon="data.icon" size="md" /></td>
								</tr>
							</tbody>
						</v-simple-table>
               </v-card>
				</df-grid>
         </v-card-text>
      </v-card>

      <v-card>
         <v-card-title>Outcomming by Account</v-card-title>
         <v-card-text class="text-left">
				<df-grid>
					<v-autocomplete @change="accessModule" v-model="outcomingAccountSelected" return-object label="Outcoming Account" item-text="name" item-value="level" :items="accountListOutcomingCombo" no-data-text="No data found">
						<template v-slot:selection="{ item }">{{ item | traceAccount }}</template>
						<template v-slot:item="{ item }">{{ item | traceAccount }}</template>
					</v-autocomplete>
				</df-grid>

            <df-grid class="mb-6">
               <v-card v-for="(mapData, mapKey) in outcomingSummaryPieChart" :key="mapKey" elevation="8">
                  <v-card-title class="text-h5">{{ mapKey }}</v-card-title>
                  <pie-chart :chartData="mapData" />
               </v-card>
				</df-grid>

				<df-grid>
               <line-chart :chartData="outcomingSummaryLineChart" />
				</df-grid>
         </v-card-text>
      </v-card>
   </div>
</template>

<script>
import summaryService from "./summaryService.js";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import message from "../../components/mixins/message.js";

import PieChart from '../../components/chart/Pie.vue';
import LineChart from '../../components/chart/Line.vue';

export default {
   name: "Summary",

   components: { DfGrid, DfIcon, PieChart, LineChart },

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
