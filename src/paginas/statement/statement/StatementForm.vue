<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.statement.identity">Edit Statement</span>
					<span v-else>New Statement</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid v-if="statement.identity" >
					<v-text-field label="Identity" readonly v-model="statement.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Name" v-model="statement.name" :readonly="Boolean(statement.identity)" />
				</df-grid>
            <v-select label="Bank" v-model="statement.bank" item-text="name" :items="bankListCombo" return-object></v-select>
			</v-card-text>

         <v-card-actions>
            <v-btn v-if="this.statement.identity" color="button" width="150" @click="$emit('executeEdition', statement)">Confirm</v-btn>
            <v-btn v-else width="150" @click="$emit('executeRegistration', statement)">Confirm</v-btn>

            <v-btn width="150" @click="$emit('cleanForm', statement)">Clear</v-btn>
            <v-btn width="150" @click="$emit('closeForm', statement)">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import DfGrid from "../../../components/grid/Grid.vue";

import { mask } from 'vue-the-mask';

export default {
	name: "StatementForm",

	components: { DfGrid },

   directives: { mask },

   props: {
      statement: {
         type: Object,
         required: true
      },

      bankListCombo: {
         type: Array,
         required: true
      },
   }
};
</script>
