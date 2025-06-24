<template>
	<df-result-layout :collection-length="collection.length">
		<v-treeview :items="collection" item-children="accountListChild" item-key="identity" class="text-left" hoverable transition activatable>
			<template v-slot:prepend="{ item }">
				<df-icon v-if="item.icon" size="lg" :icon="item.icon" class="pl-1" />
			</template>
			<template v-slot:label="{ item }">
				<span class="ml-2">{{ item.level }}</span>
				<span class="ml-2">{{ item.name }}</span>
				<span class="ml-2" v-if="item.note">({{ item.note }})</span>
			</template>
			<template v-slot:append="{ item }">
				<div v-if="item.level.length > 3">
					<v-menu offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined fab small v-bind="attrs" v-on="on">
								<df-icon icon="fa-bars" />
							</v-btn>
						</template>
						<v-list dense width="150">
							<v-subheader>Options</v-subheader>
							<v-list-item-group>
								<v-list-item @click="$emit('accessEdition', item)">
									<v-list-item-icon><df-icon icon="fa-pen-to-square" /></v-list-item-icon>
									<v-list-item-content><v-list-item-title>Edit</v-list-item-title></v-list-item-content>
								</v-list-item>
								<v-list-item v-if="!item.accountListChild || item.accountListChild.length == 0" @click="$emit('executeExclusion', item)">
									<v-list-item-icon><df-icon icon="fa-trash-can" /></v-list-item-icon>
									<v-list-item-content><v-list-item-title>Delete</v-list-item-title></v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-menu>
				</div>
			</template>
		</v-treeview>
	</df-result-layout>
</template>

<script>
import DfResultLayout from "../../components/layout/ResultLayout.vue";

import DfIcon from "../../components/df-icon/Icon.vue";

export default {
	name: "AccountResult",

	components: { DfResultLayout, DfIcon },

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
