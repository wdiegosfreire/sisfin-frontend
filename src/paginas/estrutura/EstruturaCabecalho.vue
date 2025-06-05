<template><span>

  <v-app-bar app color="primary" dark>
		<v-app-bar-nav-icon v-if="$store.state.sessionToken" @click.stop="showNavigationDrawer = !showNavigationDrawer"></v-app-bar-nav-icon>
		<v-toolbar-title :title="computedEnviroment">
			Financial Control System - FCS <span class="text-caption">2025-06-05</span>
		</v-toolbar-title>

		<v-spacer />

		<v-toolbar-items>
			<v-btn v-if="$store.state.sessionToken" text @click="executeLogout()">Log Out</v-btn>
		</v-toolbar-items>
	</v-app-bar>

	<v-navigation-drawer v-model="showNavigationDrawer" width="300" fixed temporary dark >
		<v-list-item>
			<v-list-item-avatar>
				<v-avatar color="primary" size="40">{{ computedInitials }}</v-avatar>
			</v-list-item-avatar>
		<v-list-item-title>{{ computedName }}</v-list-item-title>
		</v-list-item>

		<v-divider></v-divider>

	<v-list dense>
		<v-list-item>
			<v-autocomplete v-model="themeSelected" label="Theme" :items="themeList" item-text="name" item-value="value" @change="themeChange();" return-object></v-autocomplete>
			<v-autocomplete v-model="themeDark" label="Dark Theme" :items="decisionList" item-text="label" item-value="value" @change="themeChange();"></v-autocomplete>
		</v-list-item>

		<v-list-group :value="true">
			<template v-slot:activator>
				<v-list-item-title class="text-h6">FINANCES</v-list-item-title>
			</template>

			<v-list-group :value="true" no-action sub-group>
				<template v-slot:activator>
					<v-list-item-title>ACTIVITIES</v-list-item-title>
				</template>

				<v-list-item link @click="accessModuleSummary()">
					<v-list-item-icon><v-icon>mdi-text</v-icon></v-list-item-icon>
					<v-list-item-title>Summary</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModuleObjective()">
					<v-list-item-icon><v-icon>mdi-cash-multiple</v-icon></v-list-item-icon>
					<v-list-item-title>Objectives</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModuleStatement()">
					<v-list-item-icon><v-icon>mdi-notebook-plus-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Statements</v-list-item-title>
				</v-list-item>
			</v-list-group>

			<v-list-group :value="true" no-action sub-group>
				<template v-slot:activator>
					<v-list-item-title>REGISTRATIONS</v-list-item-title>
				</template>
				<v-list-item link @click="accessModuleAccount()">
					<v-list-item-icon><v-icon>mdi-piggy-bank-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Accounts</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModuleLocation()">
					<v-list-item-icon><v-icon>mdi-office-building-marker-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Locations</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModulePaymentMethod()">
					<v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Payment Methods</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModuleBank()">
					<v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Banks</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModuleStatementType()">
					<v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Statement Types</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="accessModuleStatementPattern()">
					<v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
					<v-list-item-title>Statement Patterns</v-list-item-title>
				</v-list-item>
			</v-list-group>
		</v-list-group>

		<v-list-group>
			<template v-slot:activator>
				<v-list-item-title class="text-h6">SUPERMARKET</v-list-item-title>
			</template>

			<v-list-group :value="true" no-action sub-group>
				<template v-slot:activator>
					<v-list-item-title>ACTIVITIES</v-list-item-title>
				</template>

				<v-list-item link @click="accessModuleSupermarket()">
					<v-list-item-icon><v-icon>mdi-text</v-icon></v-list-item-icon>
					<v-list-item-title>Activity One</v-list-item-title>
				</v-list-item>
			</v-list-group>

			<v-list-group :value="true" no-action sub-group>
				<template v-slot:activator>
					<v-list-item-title>REGISTRATIONS</v-list-item-title>
				</template>

				<v-list-item link @click="accessModuleSupermarket()">
					<v-list-item-icon><v-icon>mdi-text</v-icon></v-list-item-icon>
					<v-list-item-title>Registration One</v-list-item-title>
				</v-list-item>
			</v-list-group>
		</v-list-group>

		<v-list-group>
			<template v-slot:activator>
				<v-list-item-title class="text-h6">COMING SOON</v-list-item-title>
			</template>        

			<v-list-item link @click="accessModuleDesejo()">
				<v-list-item-icon><v-icon>mdi-heart-half-full</v-icon></v-list-item-icon>
				<v-list-item-title>Wish List</v-list-item-title>
			</v-list-item>
			<v-list-item link @click="accessModuleAutomovel()">
				<v-list-item-icon><v-icon>mdi-car</v-icon></v-list-item-icon>
				<v-list-item-title>Car Management</v-list-item-title>
			</v-list-item>
		</v-list-group>

		<v-divider></v-divider>

		<v-list-item link @click="executeLogout()">
			<v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
			<v-list-item-title>Log Out</v-list-item-title>
		</v-list-item>
	</v-list>
</v-navigation-drawer>

</span></template>

<script>
import maintenanceApi from "../../components/axios/maintenance/maintenanceApi.js";
import message from "../../components/mixins/message";

export default {
	name: "Cabecalho",
	mixins: [maintenanceApi, message],
	data() {
		return {
			user: {},
			showNavigationDrawer: false,

			themeDark: false,
			themeSelected: {},

			decisionList: [
				{ label: 'No', value: false },
				{ label: 'Yes', value: true }
			],

         themeList: [
            {
					name: "Blue",
					value: "blue",
					light: { primary: '#2196F3', secondary: '#BBDEFB', accent: '#E91E63', success: '#4CAF50', info: '#2196F3', warning: '#FB8C00', error: '#FF5252' },
					dark: { primary: '#2196F3', secondary: '#BBDEFB', accent: '#E91E63', success: '#4CAF50', info: '#2196F3', warning: '#FB8C00', error: '#FF5252' }
				},
            {
					name: "Cyan",
					value: "cyan",
					light: { primary: '#00BCD4', secondary: '#80DEEA', accent: '#E0F7FA', success: '#4CAF50', info: '#2196F3', warning: '#FFC107', error: '#D32F2F' },
					dark: { primary: '#00BCD4', secondary: '#80DEEA', accent: '#E0F7FA', success: '#4CAF50', info: '#2196F3', warning: '#FFC107', error: '#D32F2F' }
				},
            {
					name: "Blue Gray",
					value: "blueGray",
					light: { primary: '#607D8B', secondary: '#FFC107', accent: '#FF5722', success: '#4CAF50', info: '#03A9F4', warning: '#FF9800', error: '#F44336' },
					dark: { primary: '#607D8B', secondary: '#FFC107', accent: '#FF5722', success: '#4CAF50', info: '#03A9F4', warning: '#FF9800', error: '#F44336' }
				},
            {
					name: "Deep Purple",
					value: "deepPurple",
					light: { primary: '#673AB7', secondary: '#9575CD', accent: '#D1C4E9', success: '#4CAF50', info: '#29B6F6', warning: '#FFC107', error: '#D32F2F' },
					dark: { primary: '#673AB7', secondary: '#9575CD', accent: '#D1C4E9', success: '#4CAF50', info: '#29B6F6', warning: '#FFC107', error: '#D32F2F' }
				},
            {
					name: "Deep Orange",
					value: "deepOrange",
					light: { primary: '#FF5722', secondary: '#FFC107', accent: '#4CAF50', success: '#8BC34A', info: '#2196F3', warning: '#FF9800', error: '#D32F2F' },
					dark: { primary: '#FF5722', secondary: '#795548', accent: '#FF9800', error: '#D32F2F', warning: '#FF9800', info: '#2196F3', success: '#8BC34A' }
				},
            {
					name: "Pink",
					value: "pink",
					light: { primary: '#E91E63', secondary: '#9C27B0', accent: '#FF9800', error: '#F44336', warning: '#FFC107', info: '#2196F3', success: '#4CAF50' },
					dark: { primary: '#E91E63', secondary: '#673AB7', accent: '#FF5722', error: '#D32F2F', warning: '#FF9800', info: '#03A9F4', success: '#8BC34A' }
				},
            {
					name: "Gray",
					value: "gray",
					light: { primary: '#9E9E9E', secondary: '#607D8B', accent: '#FF9800', error: '#F44336', warning: '#FFC107', info: '#2196F3', success: '#4CAF50' },
					dark: { primary: '#9E9E9E', secondary: '#455A64', accent: '#FF5722', error: '#D32F2F', warning: '#FF9800', info: '#03A9F4', success: '#8BC34A' }
				},
         ],
		}
	},

	created() {
		this.themeSelected = this.themeList[0];
		this.$vuetify.theme.themes.light = this.themeSelected.light;
		this.$_message_console("Bolinha");
	},

	watch: {
		"$store.userIdentity": "setUserIdentity"
	},

	computed: {
		computedInitials() {
			let splittedName = [];
			let firstChar = "";
			let lastChar = "";

			if (window.localStorage.userName) {
				splittedName = window.localStorage.userName.split(" ");
				firstChar = splittedName[0].substring(0, 1);
				lastChar = splittedName[splittedName.length - 1].substr(0, 1);
			}

			return firstChar + lastChar;
		},

		computedName() {
			let splittedName = [];
			let firstName = "";
			let lastName = "";

			if (window.localStorage.userName) {
				splittedName = window.localStorage.userName.split(" ");
				firstName = splittedName[0];
				lastName = splittedName[splittedName.length - 1];
			}

			return `${firstName} ${lastName}`;
		},

		computedEnviroment() {
			return `Environment ${process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT}`;
		}
	},

	methods: {
		accessModuleSummary() {
			this.$router.push("/summary");
		},

		accessModuleObjective() {
			this.$router.push("/objective");
		},

		accessModuleStatement() {
			this.$router.push("/statement");
		},

		accessModuleAccount() {
			this.$router.push("/account");
		},

		accessModuleLocation() {
			this.$router.push("/location");
		},

		accessModulePaymentMethod() {
			this.$router.push("/paymentMethod");
		},

		accessModuleBank() {
			this.$router.push("/bank");
		},

		accessModuleStatementType() {
			this.$router.push("/statementType");
		},

		accessModuleStatementPattern() {
			this.$router.push("/statementPattern");
		},

		accessModuleDesejo() {
			this.$router.push("/desejo");
		},

		accessModuleAutomovel() {
			this.$router.push("/automovel");
		},

		accessModuleSupermarket() {
			this.$router.push("/supermercado");
		},

		executeLogout() {
			this.$_maintenance_post(`/user/executeLogout`, this.user).then(() => {
				this.$store.commit("setUserName", "");
				this.$store.commit("setUserIdentity", "");
				this.$store.commit("setSessionToken", "");

				this.$router.push("/");
			})
			.catch(error => {
				this.$_message_showError(error.response);
			});
		},

		themeChange() {
			this.$vuetify.theme.dark = false;
			this.$vuetify.theme.themes.light = this.themeSelected.light;

			if (this.themeDark) {
				this.$vuetify.theme.dark = true;
				this.$vuetify.theme.themes.dark = this.themeSelected.dark;
			}
		},
	}
};
</script>
