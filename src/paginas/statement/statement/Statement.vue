<template>
	<div>
		<v-app-bar color="primary" dense dark>
			<v-toolbar-title>Statements</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-btn icon @click.stop="accessModule()" title="Click to reload page"><df-icon icon="fa-arrows-rotate" size="lg" /></v-btn>
			<v-btn icon @click.stop="toggleFilterField()" title="Click to search"><df-icon icon="fa-magnifying-glass" size="lg" /></v-btn>
			<v-btn icon @click.stop="accessRegistration()" title="Click to register a new statement"><df-icon icon="fa-plus" /></v-btn>
		</v-app-bar>

		<df-period :month="month" :year="year" @periodChange="periodChange"></df-period>
		<df-input-filter transition="slide-x-transition" v-if="showSearchField" @type="executeSearch" />

		<statement-result :collection="$store.state.globalResult"
			@accessEdition="accessEdition"
			@executeExclusion="executeExclusion"
		/>

		<statement-form
			:statement="$store.state.globalEntity"
			:bank-list-combo="$store.state.globalBankListCombo"
			:location-list-combo="$store.state.globalLocationListCombo"
			:account-list-combo-source="$store.state.globalAccountListComboSource"
			:account-list-combo-target="$store.state.globalAccountListComboTarget"
			:payment-method-list-combo="$store.state.globalPaymentMethodListCombo"
			:statement-type-list-combo="$store.state.globalStatementTypeListCombo"

			@executeRegistration="executeRegistration"
			@accessRegistration="accessRegistration"
			@executeEdition="executeEdition"
			@cleanForm="cleanForm"
			@closeForm="closeForm"
		/>
	</div>
</template>

<script lang="js">
import statementService from "./statementService.js";
import StatementResult from "./StatementResult.vue";
import StatementForm from "./StatementForm.vue";

import DfIcon from "../../../components/df-icon/Icon.vue";
import DfPeriod from "../../../components/period/Period.vue";
import DfInputFilter from "../../../components/input/InputFilter.vue";

export default {
	name: "Statement",

	components: { StatementResult, StatementForm, DfInputFilter, DfIcon, DfPeriod },

	mixins: [statementService],

	methods: {
		toggleFilterField() {
			if (this.showSearchField)
				this.executeSearch();

			this.showSearchField = !this.showSearchField;
		},

		periodChange(month, year) {
			this.month = month;
			this.year = year;

			if (this.month && this.year && this.year.length == 4) {
				this.$store.commit("setGlobalMonth", this.month);
				this.$store.commit("setGlobalYear", this.year);

				this.accessModule();
			}
		},
	},

	created() {
		this.$store.commit("setGlobalEntity", {
			year: null,
			month: null,
			openingBalance: null,
			closingBalance: null,
			isClosed: false,
			statementType: {},
			statementItemList: [
				{
					identity: null,
					accountSource: {},
					accountTarget: {},
					location: {}
				}
			],
			userIdentity: null,
			statementFile: null
		});

		this.month = this.$store.state.globalMonth;
		this.year = this.$store.state.globalYear;

		let newDate = new Date();
		if (!this.month)
			this.month = newDate.getMonth();
		if (!this.year)
			this.year = newDate.getFullYear();

		if (this.month == 0) {
			this.month = 12;
			this.year--;
		}

		this.year = this.year + "";
		this.month = this.month.toString().padStart(2,"0");

		this.$store.commit("setGlobalMonth", this.month);
		this.$store.commit("setGlobalYear", this.year);

		this.accessModule();
	},
};
</script>
