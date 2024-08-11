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
                        <v-card-title>{{ index + 1 }}. {{ statementItem.description }}</v-card-title>

                        <v-card-text>
                           <df-grid column="auto-sm" spaced>
                              <df-output-text label="Date">{{ statementItem.movementDate | moment("DD/MM/YYYY") }}</df-output-text>
                              <df-output-text label="Value">{{ statementItem.movementValue | currency }}</df-output-text>
                              <df-output-text label="Document Number">{{ statementItem.documentNumber ? statementItem.documentNumber : "-"}}</df-output-text>
                           </df-grid>
                        </v-card-text>
                        <v-divider />

                        <v-card-text>
                           <v-chip small outlined color="success" class="mr-3" v-if="statementItem.operationType == 'C'">Incoming</v-chip>
                           <v-chip small outlined color="#FF0000" class="mr-3" v-else>Outcoming</v-chip>

                           <v-chip small outlined color="success" v-if="statementItem.isExported">Exported</v-chip>
                           <v-chip small outlined color="#FF0000" v-else>Pending</v-chip>
                        </v-card-text>

                        <span v-if="!statementItem.isExported">
                           <v-divider />
                           <v-card-actions>
                              <v-btn text @click="statementItem.isVisible = !statementItem.isVisible">SHOW FORM</v-btn>
                              <v-spacer />
                              <v-btn icon @click="statementItem.isVisible = !statementItem.isVisible"><v-icon>{{ statementItem.isVisible ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>
                           </v-card-actions>

                           <v-expand-transition>
                              <v-card-text v-show="statementItem.isVisible">
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
                                 <v-btn small @click="executeEdition(statementItem, true)" class="mr-3">Export and Create Movement</v-btn>
                                 <v-btn small @click="executeEdition(statementItem, false)">Export without Create Movement</v-btn>
                              </v-card-text>
                           </v-expand-transition>
                        </span>
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

      executeEdition(statementItem, isCreateMovement) {
         if (isCreateMovement) {
            if (!statementItem.descriptionNew) {
               this.$_message_showRequired("Mising movement new description.");
               return;
            }
   
            if (!statementItem.accountSource && !statementItem.accountTarget) {
               this.$_message_showRequired("Mising account source/target.");
               return;
            }
   
            if (!statementItem.paymentMethod) {
               this.$_message_showRequired("Mising payment method.");
               return;
            }
         }

         let statement = {
            identity: this.statement.identity,
            year: this.statement.year,
            month: this.statement.month,
            openingBalance: this.statement.openingBalance,
            closingBalance: this.statement.closingBalance,
            isClosed: this.statement.isClosed,
            statementType: this.statement.statementType,
            isCreateMovement: isCreateMovement,
            statementItemList: [statementItem]
         }

         this.$emit("executeEdition", statement);
      }
   }
};
</script>
