<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.statementPattern.identity">Edit Statement Pattern</span>
					<span v-else>New Statement Pattern</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid v-if="statementPattern.identity">
					<v-text-field label="Identity" readonly v-model="statementPattern.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Comparator" v-model="statementPattern.comparator" :readonly="Boolean(statementPattern.identity)" />
				</df-grid>
				<df-grid>
					<v-text-field label="Description" v-model="statementPattern.description" />
				</df-grid>
				<df-grid>
					<v-select label="Location" v-model="statementPattern.location" item-text="name" :items="locationListCombo" return-object></v-select>
					<v-select label="Target Account" v-model="statementPattern.accountTarget" item-text="name" :items="accountListComboTarget" return-object @change="validateSelectedTarget()">
						<template v-slot:selection="{ item }">{{ item.level }} {{ item.name }}</template>
                  <template v-slot:item="{ item }">{{ item.level }} {{ item.name }}</template>
					</v-select>
				</df-grid>
			</v-card-text>

			<v-card-actions>
				<v-btn v-if="this.statementPattern.identity" color="button" width="150" @click="executeEdition">Confirm</v-btn>
				<v-btn v-else width="150" @click="executeRegistration">Confirm</v-btn>

				<v-btn width="150" @click="cleanForm">Clear</v-btn>
				<v-btn width="150" @click="$emit('closeForm', statementPattern)">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask';

import DfGrid from "../../../components/grid/Grid.vue";
import message from "../../../components/mixins/message.js";

export default {
	name: "StatementPatternForm",

	components: { DfGrid },

	directives: { mask },

	mixins: [ message],

	props: {
		statementPattern: {
			type: Object,
			required: true
		},

      locationListCombo: {
         type: Array,
         required: true
      },

      accountListComboTarget: {
         type: Array,
         required: true
      }
	},

	methods: {
		executeRegistration() {
			if (this.isMissingRequiredFields()) {
				return;
			}

			this.$emit('executeRegistration', this.statementPattern);
		},

		executeEdition() {
			if (this.isMissingIdentity() || this.isMissingRequiredFields()) {
				return;
			}

			this.$emit('executeEdition', this.statementPattern);
		},

		isMissingIdentity() {
			if (!this.statementPattern.identity) {
				this.$_message_showRequired("Missing statement pattern identity.");
				return true;
			}

         return false;
      },

		isMissingRequiredFields() {
			if (!this.statementPattern.comparator || !this.statementPattern.comparator.trim()) {
				this.$_message_showRequired("Mising statement pattern comparator.");
				return true;
			}

			if (!this.statementPattern.description || !this.statementPattern.description.trim()) {
				this.$_message_showRequired("Missing statement pattern description.");
				return true;
			}

			return false;
		},

      validateSelectedTarget() {
         let errorMessage = "";

         if (!this.statementPattern || !this.statementPattern.accountTarget || this.statementPattern.accountTarget.level.length != 9)
            errorMessage = "Please, select a final target account.";
         else if (this.statementPattern.accountTarget.level.startsWith("02."))
            errorMessage = `Accounts with level "02." can't be used as target account.`;

         if (errorMessage) {
            this.$_message_showRequired(errorMessage);
            this.statementPattern.accountTarget = {};

            return;
         }
      },

      cleanForm() {
         if (!this.statementPattern.identity) {
            this.statementPattern.comparator = "";
         }
			
			this.statementPattern.description = "";
      }
	}
};
</script>
../../../components/mixins/message.js