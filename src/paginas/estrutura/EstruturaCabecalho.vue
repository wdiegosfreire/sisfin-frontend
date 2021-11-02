<template><span>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon v-if="$store.state.btpUsuario.usuCodUsuario" @click.stop="showNavigationDrawer = !showNavigationDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title :title="computedEnviroment">
      Sistema de Controle Financeiro - SISFIN v0.4.0
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn v-if="$store.state.btpUsuario.usuCodUsuario" text @click="encerrarSessao()">Sair</v-btn>
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
      <v-subheader>MOVIMENTAÇÃO</v-subheader>
      <v-list-item link @click="acessarModuloResumo()">
        <v-list-item-icon><v-icon>mdi-text</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Resumo</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloMovimento()">
        <v-list-item-icon><v-icon>mdi-cash-multiple</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Movimento</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloExtrato()">
        <v-list-item-icon><v-icon>mdi-notebook-plus-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Extrato</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-subheader>CADASTROS</v-subheader>
      <v-list-item link @click="acessarModuloConta()">
        <v-list-item-icon><v-icon>mdi-piggy-bank-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Contas</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloEstabelecimento()">
        <v-list-item-icon><v-icon>mdi-office-building-marker-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Estabelecimentos</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloFormaPagamento()">
        <v-list-item-icon><v-icon>mdi-credit-card-check-outline</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Formas de Pagamento</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-subheader>EM BREVE</v-subheader>
      <v-list-item link @click="acessarModuloDesejo()">
        <v-list-item-icon><v-icon>mdi-heart-half-full</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Desejos</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloAutomovel()">
        <v-list-item-icon><v-icon>mdi-car</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Automóvel</v-list-item-title></v-list-item-content>
      </v-list-item>
      <v-list-item link @click="acessarModuloSupermercado()">
        <v-list-item-icon><v-icon>mdi-cart</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Supermercado</v-list-item-title></v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="encerrarSessao()">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-content><v-list-item-title>Sair</v-list-item-title></v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</span></template>

<script>
import api from "../../components/api/api";
import message from "../../components/mixins/message";

export default {
  name: "Cabecalho",
  mixins: [api, message],
  data() {
    return {
      btpUsuario: {},
      showNavigationDrawer: false
    }
  },
  watch: {
    "$store.state.btpUsuario": "setBtpUsuario"
  },
  computed: {
    computedInitials() {
      let splittedName = [];
      let firstChar = "";
      let lastChar = "";

      if (this.btpUsuario && this.btpUsuario.usuTxtNome) {
        splittedName = this.btpUsuario.usuTxtNome.split(" ");
        firstChar = splittedName[0].substring(0, 1);
        lastChar = splittedName[splittedName.length - 1].substr(0, 1);
      }

      return firstChar + lastChar;
    },
    computedName() {
      let splittedName = [];
      let firstName = "";
      let lastName = "";

      if (this.btpUsuario && this.btpUsuario.usuTxtNome) {
        splittedName = this.btpUsuario.usuTxtNome.split(" ");
        firstName = splittedName[0];
        lastName = splittedName[splittedName.length - 1];
      }

      return `${firstName} ${lastName}`;
    },
    computedEnviroment() {
      return `Ambiente ${process.env.VUE_APP_ENVIRONMENT}`;
    }
  },
  methods: {
    setBtpUsuario() {
      this.$store.commit("setBtpUsuario", this.$store.state.btpUsuario);
      this.btpUsuario = this.$store.state.btpUsuario;
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

    acessarModuloEstabelecimento() {
      this.$router.push("/estabelecimento");
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

    encerrarSessao() {
      this.post(`/usuario/encerrarSessao`, this.btpUsuario).then(() => {
        this.$store.commit("setBtpUsuario", {});
        this.$router.push("/");
      }).catch(error => {
          this.$_message_showError(error.response);
      });
    }
  }
};
</script>