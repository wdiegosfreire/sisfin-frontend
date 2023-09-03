<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.location.identity">Edit Location</span>
					<span v-else>New Location</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid v-if="location.identity" >
					<v-text-field label="Identity" readonly v-model="location.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Name" v-model="location.name" :readonly="Boolean(location.identity)" />
				</df-grid>
				<df-grid>
					<v-text-field label="CNPJ" v-model="location.cnpj" :readonly="Boolean(location.identity)" v-mask="['##.###.###/####-##']" />
					<v-text-field label="Branch" v-model="location.branch" />
				</df-grid>
				<df-grid>
					<v-text-field label="Note" v-model="location.note" />
				</df-grid>
			</v-card-text>

         <v-card-actions>
            <v-btn v-if="this.location.identity" color="button" width="150" @click="$emit('executeEdition', location)">Confirm</v-btn>
            <v-btn v-else width="150" @click="$emit('executeRegistration', location)">Confirm</v-btn>

            <v-btn width="150" @click="$emit('cleanForm', location)">Clear</v-btn>
            <v-btn width="150" @click="$emit('closeForm', location)">Close</v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import DfGrid from "../../components/grid/Grid.vue";

import { mask } from 'vue-the-mask';

export default {
	name: "LocationForm",

	components: { DfGrid },

   directives: { mask },

   props: {
      location: {
         type: Object,
         required: true
      }
   }
};
</script>
