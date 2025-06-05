<template>
	<df-result-layout :collection-length="collection.length">
		<v-card outlined class="elevation-1 mb-4" v-for="paymentMethod in collection" :key="paymentMethod.identity">
			<v-card-title>
				<span>{{ paymentMethod.name }}</span>

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
							<v-list-item @click="$emit('accessEdition', paymentMethod)">
								<v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
								<v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
							</v-list-item>
							<v-list-item @click="$emit('executeExclusion', paymentMethod)">
								<v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
								<v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-menu>
			</v-card-title>

			<v-divider></v-divider>

			<v-card-text>
				<df-grid>
					<df-output-text class="text-left" label="Identity">{{ paymentMethod.identity }}</df-output-text>
					<df-output-text class="text-left" label="Acronym">{{ paymentMethod.acronym }}</df-output-text>
				</df-grid>
			</v-card-text>
		</v-card>
	</df-result-layout>
</template>

<script>
import DfResultLayout from "../../components/layout/ResultLayout.vue";

import DfGrid from "../../components/grid/Grid.vue";
import DfIcon from "../../components/df-icon/Icon.vue";
import DfOutputText from "../../components/output/OutputText.vue";

export default {
   name: "PaymentMethodResult",

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
