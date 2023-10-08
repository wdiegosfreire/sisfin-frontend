<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="1500">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title v-if="!statement.identity">Import Statement</v-toolbar-title>
				<v-toolbar-title v-else>Export Statement Items</v-toolbar-title>
			</v-toolbar>

         <span v-if="!statement.identity">
            <v-card-text>
               <v-file-input v-model="statement.statementFile" label="Statement File"></v-file-input>
            </v-card-text>
         </span>
         <span v-else>
            <v-card-title>{{ statement.month }}/{{ statement.year }} :: {{ statement.statementType.bank.name }} :: {{ statement.statementType.name }}</v-card-title>
            <v-card-text>
               <df-grid column="auto-sm" spaced>
                  <df-output-text label="Identity">{{ statement.identity }}</df-output-text>
                  <df-output-text label="Opening Balance">{{ statement.openingBalance | currency }}</df-output-text>
                  <df-output-text label="Closing Balance">{{ statement.closingBalance | currency }}</df-output-text>
                  <df-output-text label="Status">{{ statement.isClosed ? "Closed" : "Opened" }}</df-output-text>
               </df-grid>
            </v-card-text>
            <v-expansion-panels focusable class="mb-1">
               <v-expansion-panel>
                  <v-expansion-panel-header>Statement Items</v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <v-card class="mt-3" v-for="(statementItem, index) in statement.statementItemList" :key="statementItem.identity" outlined>
                        <v-card-text class="pa-2">
                           <df-grid spaced>
                              <df-output-text label="Description">{{ index + 1 }}. {{ statementItem.description }}</df-output-text>
                           </df-grid>
                           <df-grid column="auto-sm">
                              <df-output-text label="Date">{{ statementItem.movementDate | moment("DD/MM/YYYY") }}</df-output-text>
                              <df-output-text label="Value">{{ statementItem.movementValue | currency }}</df-output-text>
                              <df-output-text label="Status">{{ statementItem.isExported ? "Exported" : "Pending" }}</df-output-text>
                              <df-output-text label="Operation Type" :color="statementItem.operationType == 'D' ? '#FF0000' : '#00FF00'">{{ statementItem.operationType == "D" ? "Outcoming" : "Incoming" }}</df-output-text>
                              <df-output-text label="Document Number">{{ statementItem.documentNumber ? statementItem.documentNumber : "-"}}</df-output-text>
                           </df-grid>
                           <df-grid>
                              <a href="#" @click="executeEdition(statementItem)">Exportar e gerar movimento</a>
                              <a href="#">Exportar sem gerar movimento</a>
                           </df-grid>
                        </v-card-text>
                     </v-card>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </span>

         <v-card-actions v-if="!statement.identity">
            <v-btn width="150" @click="$emit('executeRegistration', statement)">Confirm</v-btn>
            <v-btn width="150" @click="$emit('cleanForm', statement)">Clear</v-btn>
            <v-btn width="150" @click="$emit('closeForm', statement)">Close</v-btn>
         </v-card-actions>
         <v-card-actions v-else>
            <v-btn width="150" @click="$emit('closeForm', statement)">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask';

import DfGrid from "../../../components/grid/Grid.vue";
import DfOutputText from "../../../components/output/OutputText.vue";

export default {
	name: "StatementForm",

   components: { DfGrid, DfOutputText },

   directives: { mask },

   props: {
      statement: {
         type: Object,
         required: true
      }
   },

   methods: {
      executeEdition(statementItem) {
         let statement = {
            identity: this.statement.identity,
            year: this.statement.year,
            month: this.statement.month,
            openingBalance: this.statement.openingBalance,
            closingBalance: this.statement.closingBalance,
            isClosed: this.statement.isClosed,
            statementType: this.statement.statementType,
            statementItemList: [statementItem]
         }

         this.$emit("executeEdition", statement);
      }
   }
};
</script>