<template>
	<df-result-layout :collection-length="collection.length">
		<span v-for="statement in collection" :key="statement.identity">
			<v-card v-if="statement.props.isNewHeader" outlined class="elevation-1 mb-4">
				<v-app-bar color="primary" dense>
					<df-icon icon="fa-calendar" class="white--text mr-3" />
					<v-toolbar-title class="text-h6 white--text pl-0">{{ statement.month }}/{{ statement.year }}</v-toolbar-title>
				</v-app-bar>
			</v-card>

			<v-card outlined class="elevation-1 mb-4">
				<v-card-title>
					<span>{{ statement.month }}/{{ statement.year }} :: {{ statement.statementType ? statement.statementType.bank.name : "" }} :: {{ statement.statementType ? statement.statementType.name : "" }}</span>

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
								<v-list-item @click="$emit('accessEdition', statement)">
									<v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
									<v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
								</v-list-item>
								<v-list-item @click="$emit('executeExclusion', statement)">
									<v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
									<v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-menu>
				</v-card-title>

				<v-divider></v-divider>

				<v-card-text>
					<df-grid column="auto-sm">
						<df-output-text class="text-left" label="Identity">{{ statement.identity }}</df-output-text>
						<df-output-text class="text-left" label="Opening Balance">{{ statement.openingBalance | currency }}</df-output-text>
						<df-output-text class="text-left" label="Closing Balance">{{ statement.closingBalance | currency }}</df-output-text>
						<df-output-text class="text-left bold" label="Status" :color="statement.isClosed ? 'green' : 'red'">{{ statement.isClosed ? "Closed" : "Opened" }}</df-output-text>
					</df-grid>
				</v-card-text>
			</v-card>
		</span>
	</df-result-layout>
</template>

<script>
import DfResultLayout from "../../../components/layout/ResultLayout.vue";

import DfGrid from "../../../components/grid/Grid.vue";
import DfIcon from "../../../components/df-icon/Icon.vue";
import DfOutputText from "../../../components/output/OutputText.vue";

export default {
	name: "StatementResult",

	components: { DfResultLayout, DfGrid, DfOutputText, DfIcon },

	props: {
		collection: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			search: ""
		};
	}
};
</script>
