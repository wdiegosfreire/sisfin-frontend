<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.objectiveMovement.identity">Edit Movement</span>
					<span v-else>New Movement</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid v-if="objectiveMovement.identity">
					<v-text-field label="Identity" readonly v-model="objectiveMovement.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Description" v-model="objectiveMovement.objective.description" />
				</df-grid>
				<df-grid>
               <v-select label="Location" v-model="objectiveMovement.objective.location" item-text="name" :items="locationListCombo" return-object></v-select>
				</df-grid>
				<df-grid>
					<v-text-field label="Due Date" v-model="objectiveMovement.dueDate" />
					<v-text-field label="Payment date" v-model="objectiveMovement.paymentDate" />
				</df-grid>
				<df-grid>
					<v-text-field label="Value" v-model="objectiveMovement.value" />
					<v-text-field label="Installment" v-model="objectiveMovement.installment" />
				</df-grid>
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
import DfGrid from "../../components/grid/Grid.vue";

import message from "../../components/mixins/message.js";

export default {
	name: "ObjectiveMovementForm",

	components: { DfGrid },

   mixins: [ message ],

   props: {
      objectiveMovement: {
         type: Object,
         required: true,
      },
      locationListCombo: {
         type: Array,
         required: true
      }
   }
};
</script>
