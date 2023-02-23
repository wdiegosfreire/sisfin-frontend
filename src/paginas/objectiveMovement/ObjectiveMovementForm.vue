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
				<df-grid v-if="objectiveMovement.identity" >
					<v-text-field label="Identity" readonly v-model="objectiveMovement.identity" />
				</df-grid>
				<df-grid>
					<v-text-field label="Name" v-model="objectiveMovement.name" :readonly="Boolean(objectiveMovement.identity)" />
				</df-grid>
				<df-grid>
					<v-text-field label="CNPJ" v-model="objectiveMovement.cnpj" :readonly="Boolean(objectiveMovement.identity)" />
					<v-text-field label="Branch" v-model="objectiveMovement.branch" />
				</df-grid>
				<df-grid>
					<v-text-field label="Note" v-model="objectiveMovement.note" />
				</df-grid>
			</v-card-text>

      <v-card-actions>
        <v-btn v-if="this.objectiveMovement.identity" color="button" width="150" @click="executeEdition()">Confirm</v-btn>
        <v-btn v-else width="150" @click="executeRegistration()">Confirmar</v-btn>

        <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
        <v-btn width="150" @click="fecharFormulario()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ObjectiveMovementService from "./ObjectiveMovementService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
	name: "ObjectiveMovementForm",
	components: { DfGrid },
	mixins: [ObjectiveMovementService],
	methods: {
		limparFormulario() {
			this.objectiveMovement.identity = null;
		},

		fecharFormulario() {
			this.limparFormulario();
			this.$store.commit("showGlobalDialog", false);
		},

		updateGlobalEntity() {
			this.objectiveMovement = this.$store.state.globalEntity;
		}
	},
	watch: {
		"$store.state.globalEntity": "updateGlobalEntity",
	},
};
</script>
