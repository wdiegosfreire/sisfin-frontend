<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.statementType.identity">Edit Statement Type</span>
					<span v-else>New Statement Type</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid v-if="statementType.identity" >
					<v-text-field label="Identity" readonly v-model="statementType.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Name" v-model="statementType.name" :readonly="Boolean(statementType.identity)" />
				</df-grid>
            <v-select label="Bank" v-model="statementType.bank" item-text="name" :items="bankListCombo" return-object></v-select>
            <v-select label="Source Account" v-model="statementType.accountSource" :items="accountListComboSource" return-object @change="validateSelectedSource()">
               <template v-slot:selection="{ item }">{{ item.level }} {{ item.name }}</template>
               <template v-slot:item="{ item }">{{ item.level }} {{ item.name }}</template>
            </v-select>
			</v-card-text>

         <v-card-actions>
            <v-btn v-if="this.statementType.identity" color="button" width="150" @click="$emit('executeEdition', statementType)">Confirm</v-btn>
            <v-btn v-else width="150" @click="$emit('executeRegistration', statementType)">Confirm</v-btn>

            <v-btn width="150" @click="$emit('cleanForm', statementType)">Clear</v-btn>
            <v-btn width="150" @click="$emit('closeForm', statementType)">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import DfGrid from "../../../components/grid/Grid.vue";

// Mixins
import message from "../../../components/mixins/message.js";

import { mask } from 'vue-the-mask';

export default {
	name: "StatementTypeForm",

	components: { DfGrid },

   directives: { mask },

   mixins: [ message ],

   props: {
      statementType: {
         type: Object,
         required: true
      },

      bankListCombo: {
         type: Array,
         required: true
      },

      accountListComboSource: {
         type: Array,
         required: true
      },
   },

   methods: {
      validateSelectedSource() {
         let errorMessage = "";

         if (!this.statementType || !this.statementType.accountSource || this.statementType.accountSource.level.length != 9)
            errorMessage = "Please, select a final source account.";
         else if (this.statementType.accountSource.level.startsWith("03."))
            errorMessage = `Accounts with level "03." can't be used as source account.`;

         if (errorMessage) {
            this.$_message_showRequired(errorMessage);
            this.statementType.accountSource = {};

            return;
         }
      },
   }
};
</script>
