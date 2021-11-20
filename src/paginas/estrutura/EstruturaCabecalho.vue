<template><span>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon v-if="$store.state.user.identity" @click.stop="showNavigationDrawer = !showNavigationDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title :title="computedEnviroment">
      Financial Control System - FCS v1.0.0
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn v-if="$store.state.user.identity" text @click="executeLogout()">Log Out</v-btn>
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
      <v-subheader>TRANSACTIONS</v-subheader>
      <v-list-item link @click="acessarModuloResumo()">
        <v-list-item-icon><v-icon>mdi-text</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Summary</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloMovimento()">
        <v-list-item-icon><v-icon>mdi-cash-multiple</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Transactions</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloExtrato()">
        <v-list-item-icon><v-icon>mdi-notebook-plus-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Statements</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-subheader>CADASTROS</v-subheader>
      <v-list-item link @click="acessarModuloConta()">
        <v-list-item-icon><v-icon>mdi-piggy-bank-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Bank Accounts</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="accessModuleLocation()">
        <v-list-item-icon><v-icon>mdi-office-building-marker-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Locations</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloFormaPagamento()">
        <v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Payment Methods</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-subheader>COMING SOON</v-subheader>
      <v-list-item link @click="acessarModuloDesejo()">
        <v-list-item-icon><v-icon>mdi-heart-half-full</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Wish List</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloAutomovel()">
        <v-list-item-icon><v-icon>mdi-car</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Car Management</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloSupermercado()">
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
    "$store.state.user": "setUser"
  },
  computed: {
    computedInitials() {
      let splittedName = [];
      let firstChar = "";
      let lastChar = "";

      if (this.user && this.user.name) {
        splittedName = this.user.name.split(" ");
        firstChar = splittedName[0].substring(0, 1);
        lastChar = splittedName[splittedName.length - 1].substr(0, 1);
      }

      return firstChar + lastChar;
    },
    computedName() {
      let splittedName = [];
      let firstName = "";
      let lastName = "";

      if (this.user && this.user.name) {
        splittedName = this.user.name.split(" ");
        firstName = splittedName[0];
        lastName = splittedName[splittedName.length - 1];
      }

      return `${firstName} ${lastName}`;
    },
    computedEnviroment() {
      return `Environment ${process.env.VUE_APP_ENVIRONMENT}`;
    }
  },
  methods: {
    setUser() {
      this.$store.commit("setUser", this.$store.state.user);
      this.user = this.$store.state.user;
    },

    acessarModuloResumo() {
      this.$router.push("/resumo");
    },

    acessarModuloMovimento() {
      this.$router.push("/movimento");
    },

    acessarModuloExtrato() {
      this.$router.push("/extrato");
    },

    acessarModuloConta() {
      this.$router.push("/conta");
    },

    accessModuleLocation() {
      this.$router.push("/location");
    },

    acessarModuloFormaPagamento() {
      this.$router.push("/formaPagamento");
    },

    acessarModuloDesejo() {
      this.$router.push("/desejo");
    },

    acessarModuloAutomovel() {
      this.$router.push("/automovel");
    },

    acessarModuloSupermercado() {
      this.$router.push("/supermercado");
    },

    executeLogout() {
      this.$_maintenance_post(`/user/executeLogout`, this.user).then(() => {
        this.$store.commit("setUser", {});
        this.$router.push("/");
      }).catch(error => {
          this.$_message_showError(error.response);
      });
    }
  }
};
</script>