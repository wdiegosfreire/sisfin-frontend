<template>
	<div>
		<v-app-bar color="primary" dense dark>
			<v-toolbar-title>Payment Methods</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
			<v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
			<v-btn icon @click.stop="accessRegistration()" title="Click to register a new payment method"><df-icon icon="fa-plus" /></v-btn>
		</v-app-bar>

		<df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

		<payment-method-result :collection="$store.state.globalResult"
			@accessEdition="accessEdition"
			@executeExclusion="executeExclusion"
		/>

		<payment-method-form :payment-method="$store.state.globalEntity"
			@executeRegistration="executeRegistration"
			@executeEdition="executeEdition"
			@cleanForm="cleanForm"
			@closeForm="closeForm"
		/>
	</div>
</template>

<script lang="js">
import paymentMethodService from "./paymentMethodService.js";
import PaymentMethodResult from "./PaymentMethodResult.vue";
import PaymentMethodForm from "./PaymentMethodForm.vue";

import DfIcon from "../../components/df-icon/Icon.vue";
import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
	name: "PaymentMethod",

	components: { PaymentMethodResult, PaymentMethodForm, DfInputFilter, DfIcon },

	mixins: [paymentMethodService],

	methods: {
		toggleFilterField() {
			if (this.showSearchField)
				this.executeSearch();

			this.showSearchField = !this.showSearchField;
		}
	},

	created() {
		this.accessModule();
	},
};
</script>
