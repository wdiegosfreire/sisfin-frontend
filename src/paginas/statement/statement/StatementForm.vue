<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="1500">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title v-if="!statement.identity">Import Statement</v-toolbar-title>
				<v-toolbar-title v-else>Export Statement Items</v-toolbar-title>
			</v-toolbar>

         <span v-if="!statement.identity">
            <v-card-text>
               <v-select v-model="bankComboSelected" label="Bank" item-text="name" :items="bankListCombo" @change="$emit('accessRegistration', bankComboSelected)" return-object></v-select>
               <v-select v-model="statementTypeComboSelected" label="StatementType" item-text="name" :items="statementTypeListCombo" return-object></v-select>
               <v-file-input v-model="statement.statementFile" label="Statement File" append-icon="mdi-file" prepend-icon=""></v-file-input>
            </v-card-text>
         </span>
         <span v-else>
            <v-card-title>{{ statement.month }}/{{ statement.year }} :: {{ statement.statementType.bank.name }} :: {{ statement.statementType.name }}</v-card-title>
            <v-card-text>
               <df-grid column="auto-md" spaced>
                  <df-output-text label="Identity">{{ statement.identity }}</df-output-text>
                  <df-output-text label="Opening Balance">{{ statement.openingBalance | currency }}</df-output-text>
                  <df-output-text label="Closing Balance">{{ statement.closingBalance | currency }}</df-output-text>
                  <df-output-text label="Source">{{ statement.statementType.accountSource | traceAccount }}</df-output-text>
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
                              <df-output-text label="Description" class="bold">{{ index + 1 }}. {{ statementItem.description }}</df-output-text>
                           </df-grid>
                           <df-grid column="auto-sm" spaced>
                              <df-output-text label="Date">{{ statementItem.movementDate | moment("DD/MM/YYYY") }}</df-output-text>
                              <df-output-text label="Value">{{ statementItem.movementValue | currency }}</df-output-text>
                              <span>
                                 <df-output-text label="Status" v-if="statementItem.isExported" color="#00FF00">Exported</df-output-text>
                                 <df-output-text label="Status" v-else  color="#FF0000">Pending</df-output-text>
                              </span>
                              <span>
                                 <df-output-text label="Operation Type" v-if="statementItem.operationType == 'D'" color="#FF0000">Outcoming</df-output-text>
                                 <df-output-text label="Operation Type" v-else color="#00FF00">Incoming</df-output-text>
                              </span>
                              <df-output-text label="Document Number">{{ statementItem.documentNumber ? statementItem.documentNumber : "-"}}</df-output-text>
                           </df-grid>
                           <df-grid spaced v-if="!statementItem.isExported">
                              <v-btn x-small @click="toggleEditMode(statementItem)">Show form</v-btn>
                           </df-grid>
                           <span v-if="!statementItem.isExported && statementItem.isVisible">
                              <df-grid column="auto-lg">
                                 <v-text-field label="New Description" v-model="statementItem.descriptionNew" dense />
                                 <v-select v-if="statementItem.operationType == 'C'" label="Source Account" v-model="statementItem.accountSource" :items="accountListComboSource" clearable return-object dense>
                                    <template v-slot:selection="{ item }">{{ item.level }} {{ item.name }}</template>
                                    <template v-slot:item="{ item }">{{ item.level }} {{ item.name }}</template>
                                 </v-select>
                                 <v-select v-if="statementItem.operationType == 'D'" label="Target Account" v-model="statementItem.accountTarget" :items="accountListComboTarget" clearable return-object dense>
                                    <template v-slot:selection="{ item }">{{ item.level }} {{ item.name }}</template>
                                    <template v-slot:item="{ item }">{{ item.level }} {{ item.name }}</template>
                                 </v-select>
                                 <v-select label="Location" v-model="statementItem.location" :items="locationListCombo" clearable return-object dense>
                                    <template v-slot:selection="{ item }">{{ item.name }}</template>
                                    <template v-slot:item="{ item }">{{ item.name }}</template>
                                 </v-select>
                                 <v-select label="Payment Method" v-model="statementItem.paymentMethod" :items="paymentMethodListCombo" clearable return-object dense>
                                    <template v-slot:selection="{ item }">{{ item.name }}</template>
                                    <template v-slot:item="{ item }">{{ item.name }}</template>
                                 </v-select>
                              </df-grid>
                              <df-grid class="text-center">
                                 <v-btn x-small @click="executeEdition(statementItem)">Exportar e gerar movimento</v-btn>
                                 <v-btn x-small>Exportar sem gerar movimento</v-btn>
                              </df-grid>
                           </span>
                        </v-card-text>
                     </v-card>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </span>

         <v-card-actions v-if="!statement.identity">
            <v-btn width="150" @click="executeRegistration(statement)">Confirm</v-btn>
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
import message from "../../../components/mixins/message.js";

import DfGrid from "../../../components/grid/Grid.vue";
import DfOutputText from "../../../components/output/OutputText.vue";

export default {
	name: "StatementForm",

   components: { DfGrid, DfOutputText },

   directives: { mask },

   mixins: [ message ],

   props: {
      statement: {
         type: Object,
         required: true
      },
      bankListCombo: {
         type: Array,
         required: true
      },
      locationListCombo: {
         type: Array,
         required: true
      },
      accountListComboSource: {
         type: Array,
         required: true
      },
      accountListComboTarget: {
         type: Array,
         required: true
      },
      paymentMethodListCombo: {
         type: Array,
         required: true
      },
      statementTypeListCombo: {
         type: Array,
         required: false
      }
   },

   data() {
      return {
         bankComboSelected: {},
         statementTypeComboSelected: {}
      }
   },

   methods: {
      executeRegistration(statement) {
         statement.statementType = this.statementTypeComboSelected;
         this.$emit("executeRegistration", statement);
      },

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
      },

      toggleEditMode(statementItem) {
         statementItem.isVisible = true;
      }
   }
};
</script>
