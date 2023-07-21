<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="1000">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.objectiveMovement.identity">Edit Movement</span>
					<span v-else>New Movement</span>
				</v-toolbar-title>
			</v-toolbar>

         <v-card-text>
            <input type="hidden" v-model.number="objectiveMovement.value" />

            <v-tabs fixed-tabs>
               <v-tab>Objective</v-tab>
               <v-tab-item>
                  <v-text-field v-if="objectiveMovement.identity" label="Identity" readonly v-model="objectiveMovement.identity" />
                  <v-text-field label="Description" v-model="objectiveMovement.objective.description" :readonly="isIdentityPresent" />

                  <df-grid>
                     <v-select label="Source" v-model="objectiveMovement.accountSource" :items="accountListComboSource" return-object @change="validateSelectedSource()">
                        <template v-slot:selection="{ item }">{{ item.level }} {{ item.name }}</template>
                        <template v-slot:item="{ item }">{{ item.level }} {{ item.name }}</template>
                     </v-select>
                  </df-grid>
                  <df-grid>
                     <v-select label="Location" v-model="objectiveMovement.objective.location" :items="locationListCombo" return-object>
                        <template v-slot:selection="{ item }">{{ item.name }} - <i>{{ item.branch }}</i></template>
                        <template v-slot:item="{ item }">{{ item.name }} - <i>{{ item.branch }}</i></template>
                     </v-select>
                     <v-select label="Payment Method" v-model="objectiveMovement.paymentMethod" :items="paymentMethodListCombo" return-object>
                        <template v-slot:selection="{ item }">{{ item.name }} - {{ item.acronym }}</template>
                        <template v-slot:item="{ item }">{{ item.name }} - {{ item.acronym }}</template>
                     </v-select>
                  </df-grid>
                  <df-grid column="auto-sm">
                     <v-text-field label="Due Date" v-model="objectiveMovement.dueDate" v-mask="['##/##/####']"></v-text-field>
                     <v-text-field label="Payment date" v-model="objectiveMovement.paymentDate" v-mask="['##/##/####']"></v-text-field>
                     <v-text-field label="Installment" v-model.number="objectiveMovement.installment" v-mask="['###']"></v-text-field>
                  </df-grid>
               </v-tab-item>

               <v-tab>Items</v-tab>
               <v-tab-item>
                  <df-grid column="frac-15">
                     <v-text-field label="Sequential" v-model="objectiveItemForm.sequential" tabindex="-1" v-mask="['####']"></v-text-field>
                     <v-text-field label="Description" v-model="objectiveItemForm.description" append-icon="mdi-map-marker" @click:append="copyFromMovement()"></v-text-field>
                  </df-grid>
                  <df-grid column="auto-sm">
                     <v-select label="Target" v-model="objectiveItemForm.accountTarget" :items="accountListComboTarget" return-object @change="validateSelectedTarget()">
                        <template v-slot:selection="{ item }">{{ item.level }} {{ item.name }}</template>
                        <template v-slot:item="{ item }">{{ item.level }} {{ item.name }}</template>
                     </v-select>
                  </df-grid>
                  <df-grid column="auto-sm">
                     <v-text-field label="Amount" v-model.number="objectiveItemForm.amount" prefix="R$" @blur="calculateTotalValue()"></v-text-field>
                     <v-text-field label="Unitary Value" v-model.number="objectiveItemForm.unitaryValue" prefix="R$" @blur="calculateTotalValue()"></v-text-field>
                     <v-text-field label="Total" v-model.number="objectiveItemForm.totalValue" prefix="R$" readonly tabindex="-1" />
                     <v-btn @click="addNewItem()">Add</v-btn>
                  </df-grid>

                  <v-data-table :headers="headers" :items="objectiveMovement.objective.objectiveItemList" :items-per-page="10" dense>
                     <template v-slot:[`item.actions`]="{ item }"><v-icon small @click="deleteOneItem(item)">mdi-delete</v-icon></template>
                     <template v-slot:footer></template>
                  </v-data-table>
               </v-tab-item>
            </v-tabs>
         </v-card-text>

         <v-card-text>
            <h3>Total: {{ totalAllItems | currency }}</h3>
         </v-card-text>

         <v-card-actions>
            <v-btn v-if="this.objectiveMovement.identity" color="button" width="150" @click="$emit('executeEdition', objectiveMovement)">Confirm</v-btn>
            <v-btn v-else width="150" @click="$emit('executeRegistration', objectiveMovement)">Confirm</v-btn>

            <v-btn width="150" @click="$emit('cleanForm', objectiveMovement)">Clear</v-btn>
            <v-btn width="150" @click="$emit('closeForm', objectiveMovement)">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
//Components
import DfGrid from "../../components/grid/Grid.vue";

// Mixins
import format from "../../components/mixins/format.js";
import message from "../../components/mixins/message.js";

// Directives
import { mask } from 'vue-the-mask';

export default {
	name: "ObjectiveMovementForm",

	components: { DfGrid },

   directives: { mask},

   mixins: [ format, message ],

   data() {
      return {
         totalAllItems: 0,
         objectiveItemForm: {
            description: "",
            sequential: this.objectiveMovement.objective.objectiveItemList.length + 1,
            unitaryValue: 0,
            amount: 0,
            totalValue: 0,
         },

        headers: [
            { text: "#", value: "sequential" },
            { text: "Description", value: "description" },
            { text: "Target", value: "accountTarget.name" },
            { text: "Amount", value: "amount", align: "end" },
            { text: "", value: "plus", align: "end" },
            { text: "Value", value: "unitaryValue", align: "end" },
            { text: "", value: "equal", align: 'end' },
            { text: "Total", value: "totalValue", align: "end" },
            { text: "Actions", value: "actions", align: "center", sortable: false }
        ]
      }
   },

   props: {
      objectiveMovement: {
         type: Object,
         required: true,
      },
      locationListCombo: {
         type: Array,
         required: true
      },
      paymentMethodListCombo: {
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
      }
   },

   methods: {
      calculateTotalValue() {
         if (this.objectiveItemForm) {
            let amount = this.objectiveItemForm.amount;
            let unitaryValue = this.objectiveItemForm.unitaryValue;
            this.objectiveItemForm.totalValue = Number((unitaryValue * amount).toFixed(2));
         }
      },

      addNewItem() {
         if (!this.objectiveItemForm.sequential) {
            this.$_message_showRequired("Missing item sequential.");
            return false;
         }

         if (!this.objectiveItemForm.description) {
            this.$_message_showRequired("Missing item description.");
            return false;
         }

         if (!this.objectiveItemForm.accountTarget) {
            this.$_message_showRequired("Missing target account.");
            return false;
         }

         if (!this.objectiveItemForm.amount) {
            this.$_message_showRequired("Missing item amount.");
            return false;
         }

         if (!this.objectiveItemForm.unitaryValue) {
            this.$_message_showRequired("Missing item unitary value.");
            return false;
         }

         if (!this.objectiveItemForm.totalValue) {
            this.$_message_showRequired("Missing item total value.");
            return false;
         }

         this.objectiveMovement.objective.objectiveItemList.push(
            {
               identity: this.objectiveItemForm.identity,
               description: this.objectiveItemForm.description,
               sequential: this.objectiveItemForm.sequential,
               unitaryValue: this.objectiveItemForm.unitaryValue,
               amount: this.objectiveItemForm.amount,
               totalValue: this.objectiveItemForm.totalValue,
               accountTarget: this.objectiveItemForm.accountTarget,
   
               plus: "x",
               equal: "="
            }
         );

         this.calculateTotalAllItems();

         this.objectiveItemForm.description =  "";
         this.objectiveItemForm.unitaryValue = 0;
         this.objectiveItemForm.amount = 0;
         this.objectiveItemForm.totalValue = 0;
         this.objectiveItemForm.sequential = this.objectiveMovement.objective.objectiveItemList.length + 1;
         this.objectiveItemForm.accountTarget = {}
      },

      deleteOneItem(item) {
         let index = this.objectiveMovement.objective.objectiveItemList.indexOf(item);
         this.objectiveMovement.objective.objectiveItemList.splice(index, 1);
         this.objectiveItemForm.sequential = this.objectiveMovement.objective.objectiveItemList.length + 1;

         let i = 0;
         for (const objectiveItem of this.objectiveMovement.objective.objectiveItemList) {
            objectiveItem.sequential = ++i;
         }

         this.calculateTotalAllItems();
      },

      calculateTotalAllItems() {
         this.totalAllItems = 0;
         for (let objectiveItem of this.objectiveMovement.objective.objectiveItemList) {
            let totalValueTemp = Number((objectiveItem.unitaryValue * objectiveItem.amount).toFixed(2));
            this.totalAllItems += totalValueTemp;

            objectiveItem.plus =  "x";
            objectiveItem.equal = "=";
            objectiveItem.totalValue = totalValueTemp;
         }

         this.objectiveMovement.value = Number(this.totalAllItems.toFixed(2));
      },

      validateSelectedSource() {
         let errorMessage = "";

         if (!this.objectiveMovement || !this.objectiveMovement.accountSource || this.objectiveMovement.accountSource.level.length != 9)
            errorMessage = "Please, select a final source account.";
         else if (this.objectiveMovement.accountSource.level.startsWith("03."))
            errorMessage = `Accounts with level "03." can't be used as source account.`;
         else if (this.validateAccountCombination(this.objectiveMovement) != "")
            errorMessage = this.validateAccountCombination(this.objectiveMovement);

         if (errorMessage) {
            this.$_message_showRequired(errorMessage);
            this.objectiveMovement.accountSource = {};
            this.objectiveItemForm.accountTarget = {};

            return;
         }
      },

      validateSelectedTarget() {
         let errorMessage = "";

         if (!this.objectiveItemForm || !this.objectiveItemForm.accountTarget || this.objectiveItemForm.accountTarget.level.length != 9)
            errorMessage = "Please, select a final target account.";
         else if (this.objectiveItemForm.accountTarget.level.startsWith("02."))
            errorMessage = `Accounts with level "02." can't be used as target account.`;
         else if (this.validateAccountCombination(this.objectiveItemForm) != "")
            errorMessage = this.validateAccountCombination(this.objectiveItemForm);

         if (errorMessage) {
            this.$_message_showRequired(errorMessage);
            this.objectiveMovement.accountSource = {};
            this.objectiveItemForm.accountTarget = {};

            return;
         }
      },

      validateAccountCombination() {
         if (!this.objectiveMovement.accountSource || !this.objectiveItemForm.accountTarget) {
            return "";
         }

         if (this.objectiveMovement.accountSource.level.startsWith("02.") && this.objectiveItemForm.accountTarget.level.startsWith("03."))
            return `The combination levels "02." as source and "03." as target is invalid.`;
         else if (this.objectiveMovement.accountSource.level === this.objectiveItemForm.accountTarget.level)
            return `The same account can't be used as source and target.`;

         return "";
      },

      copyFromMovement() {
         this.objectiveItemForm.description = this.objectiveMovement.objective.description;
      }
   },

   beforeUpdate() {
      this.objectiveItemForm.sequential = this.objectiveMovement.objective.objectiveItemList.length + 1
      this.calculateTotalAllItems();
   },

   computed: {
      isIdentityPresent() {
         return this.objectiveMovement.identity ? true : false;
      }
   }
};
</script>
