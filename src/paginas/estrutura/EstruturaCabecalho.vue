<template><span>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon v-if="$store.state.sessionToken" @click.stop="showNavigationDrawer = !showNavigationDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title :title="computedEnviroment">
      Financial Control System - FCS <span class="text-caption">Docker 001</span>
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn v-if="$store.state.sessionToken" text @click="executeLogout()">Log Out</v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <v-navigation-drawer absolute temporary v-model="showNavigationDrawer" dark>
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar color="primary" size="40">{{ computedInitials }}</v-avatar>
      </v-list-item-avatar>
      <v-list-item-content><v-list-item-title>{{ computedName }}</v-list-item-title></v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-subheader>Activities</v-subheader>
      <v-list-item link @click="accessModuleResumo()">
        <v-list-item-icon><v-icon>mdi-text</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Summary</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModuleObjective()">
        <v-list-item-icon><v-icon>mdi-cash-multiple</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Objectives</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModuleExtrato()">
        <v-list-item-icon><v-icon>mdi-notebook-plus-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Statements</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-subheader>CADASTROS</v-subheader>
      <v-list-item link @click="accessModuleAccount()">
        <v-list-item-icon><v-icon>mdi-piggy-bank-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Accounts</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModuleLocation()">
        <v-list-item-icon><v-icon>mdi-office-building-marker-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Locations</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModulePaymentMethod()">
        <v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Payment Methods</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-subheader>COMING SOON</v-subheader>
      <v-list-item link @click="accessModuleDesejo()">
        <v-list-item-icon><v-icon>mdi-heart-half-full</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Wish List</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModuleAutomovel()">
        <v-list-item-icon><v-icon>mdi-car</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Car Management</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModuleSupermercado()">
        <v-list-item-icon><v-icon>mdi-cart</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Supermarket</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="executeLogout()">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Log Out</v-list-item-title></v-list-item-content>
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
      showNavigationDrawer: false
    }
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
    accessModuleResumo() {
      this.$router.push("/resumo");
    },

    accessModuleObjective() {
      this.$router.push("/objective");
    },

    accessModuleExtrato() {
      this.$router.push("/extrato");
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

    accessModuleDesejo() {
      this.$router.push("/desejo");
    },

    accessModuleAutomovel() {
      this.$router.push("/automovel");
    },

    accessModuleSupermercado() {
      this.$router.push("/supermercado");
    },

    executeLogout() {
      this.$_maintenance_post(`/user/executeLogout`, this.user).then(() => {
        this.$store.commit("setUserName", "");
        this.$store.commit("setUserIdentity", "");
        this.$store.commit("setSessionToken", "");

        this.$router.push("/");
      }).catch(error => {
          this.$_message_showError(error.response);
      });
    }
  }
};
</script>
