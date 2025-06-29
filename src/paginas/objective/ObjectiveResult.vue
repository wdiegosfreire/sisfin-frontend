<template>
	<df-result-layout :collection-length="collection.length">
		<span v-for="objective in collection" :key="objective.identity">
			<span v-for="objectiveMovement in objective.objectiveMovementList" :key="objectiveMovement.identity">
				<v-card v-if="objectiveMovement.props.isNewHeader" class="mb-4">
					<v-app-bar color="primary" dense>
						<df-icon icon="fa-clock" class="white--text mr-3" />
						<v-toolbar-title class="text-h6 white--text pl-0">{{ objectiveMovement.paymentDate | moment("DD/MM/YYYY") }}</v-toolbar-title>
					</v-app-bar>
				</v-card>
	
				<v-card v-if="objectiveMovement.inPeriod" outlined class="elevation-1 mb-4">
					<v-card-title>
						<span>
							<df-icon icon="fa-circle" size="xs" color="purple" /> {{ objectiveMovement.accountSource | traceAccount }}
							<df-icon icon="fa-arrow-right-long" size="sm" /> {{ objective.description }}: R$ {{ objectiveMovement.value | currency }}
						</span>
	
						<v-spacer></v-spacer>
						<v-menu offset-y>
							<template v-slot:activator="{ on, attrs }">
								<v-btn outlined fab small v-bind="attrs" v-on="on">
									<df-icon icon="fa-bars" />
								</v-btn>
							</template>
							<v-list dense width="150">
								<v-subheader>Options</v-subheader>
								<v-list-item-group>
									<v-list-item @click="$emit('accessEdition', objective)">
										<v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
										<v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
									</v-list-item>
									<v-list-item @click="$emit('executeExclusion', objective)">
										<v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
										<v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-menu>
					</v-card-title>
	
					<v-divider></v-divider>
	
					<v-card-text>
						<df-grid spaced>
							<df-output-text class="text-left" label="Source">{{ objectiveMovement.accountSource | traceAccount }}</df-output-text>
						</df-grid>
						<df-grid spaced column="auto-sm">
							<df-output-text class="text-left" label="Identity">{{ objectiveMovement.identity }}</df-output-text>
							<df-output-text class="text-left" label="Registration Date">{{ objectiveMovement.registrationDate | moment("DD/MM/YYYY HH:mm") }}</df-output-text>
							<df-output-text class="text-left" label="Due Date">{{ objectiveMovement.dueDate | moment("DD/MM/YYYY") }}</df-output-text>
							<df-output-text class="text-left" label="Payment Date">{{ objectiveMovement.paymentDate | moment("DD/MM/YYYY") }}</df-output-text>
							<df-output-text class="text-left" label="Installment">{{ objectiveMovement.installment }}</df-output-text>
							<df-output-text class="text-left" label="Payment Method">{{ objectiveMovement.paymentMethod ? objectiveMovement.paymentMethod.name : "" }}</df-output-text>
							<df-output-text class="text-left" label="Location">{{ objective.location ? objective.location.name : "" }}</df-output-text>
						</df-grid>
	
						<v-expansion-panels accordion focusable multiple>
							<v-expansion-panel>
								<v-expansion-panel-header>Movements</v-expansion-panel-header>
								<v-expansion-panel-content>
									<objective-movement-result :collection="objective.objectiveMovementList" dense />
								</v-expansion-panel-content>
							</v-expansion-panel>
							<v-expansion-panel>
								<v-expansion-panel-header>Items</v-expansion-panel-header>
								<v-expansion-panel-content>
									<objective-item-result :collection="objective.objectiveItemList" dense />
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-card-text>
				</v-card>
	
			</span>
		</span>
	</df-result-layout>
</template>

<script lang="js">
import DfResultLayout from "../../components/layout/ResultLayout.vue";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";

import ObjectiveItemResult from "./ObjectiveItemResult.vue";
import ObjectiveMovementResult from "./ObjectiveMovementResult.vue";

export default {
	name: "ObjectiveResult",

	components: { DfResultLayout, DfGrid, DfOutputText, DfIcon, ObjectiveItemResult, ObjectiveMovementResult },

	props: {
		collection: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			search: "",
			grupo: ""
		};
	},

	methods: {
		getNewHeader(data) {
			if (this.grupo != data) {
				this.grupo = data;
				return true;
			}

			return false;
		}
	}
};
</script>
