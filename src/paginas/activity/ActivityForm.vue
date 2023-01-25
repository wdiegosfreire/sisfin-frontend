<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.activity.identity">Edit Location</span>
					<span v-else>New Location</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid v-if="activity.identity" >
					<v-text-field label="Identity" readonly v-model="activity.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Name" v-model="activity.name" :readonly="Boolean(activity.identity)" />
				</df-grid>
				<df-grid>
					<v-text-field label="CNPJ" v-model="activity.cnpj" :readonly="Boolean(activity.identity)" />
					<v-text-field label="Branch" v-model="activity.branch" />
				</df-grid>
				<df-grid>
					<v-text-field label="Note" v-model="activity.note" />
				</df-grid>
			</v-card-text>

      <v-card-actions>
        <v-btn v-if="this.activity.identity" color="button" width="150" @click="executeEdition()">Confirm</v-btn>
        <v-btn v-else width="150" @click="executeRegistration()">Confirmar</v-btn>

        <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
        <v-btn width="150" @click="fecharFormulario()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ActivityService from "./ActivityService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
	name: "ActivityForm",
	components: { DfGrid },
	mixins: [ActivityService],
	methods: {
		limparFormulario() {
			this.activity.identity = null;
			this.activity.cnpj = "";
			this.activity.name = "";
			this.activity.branch = "";
			this.activity.note = "";
		},

		fecharFormulario() {
			this.limparFormulario();
			this.$store.commit("showGlobalDialog", false);
			
		},

		updateGlobalEntity() {
			this.activity = this.$store.state.globalEntity;
		}
	},
	watch: {
		"$store.state.globalEntity": "updateGlobalEntity",
	},
};
</script>
