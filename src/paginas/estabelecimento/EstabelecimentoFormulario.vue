<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.btpEstabelecimento.estCodEstabelecimento">Editar Estabelecimento</span>
					<span v-else>Novo Estabelecimento</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid>
					<v-text-field label="Código" readonly v-model="btpEstabelecimento.estCodEstabelecimento" />
					<v-text-field label="Nome" v-model="btpEstabelecimento.estNomEstabelecimento" />
				</df-grid>
				<df-grid>
					<v-text-field label="Observação" v-model="btpEstabelecimento.estTxtObservacao" />
				</df-grid>
			</v-card-text>

      <v-card-actions>
        <v-btn v-if="this.btpEstabelecimento.estCodEstabelecimento" color="button" width="150" @click="executarEdicao()">Confirmar</v-btn>
        <v-btn v-else width="150" @click="executarCadastro()">Confirmar</v-btn>

        <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
        <v-btn width="150" @click="fecharFormulario()">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import estabelecimentoService from "./estabelecimentoService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
	name: "EstabelecimentoFormulario",
	components: { DfGrid },
	mixins: [estabelecimentoService],
	methods: {
		limparFormulario() {
			this.btpEstabelecimento.estCodEstabelecimento = null;
			this.btpEstabelecimento.estNomEstabelecimento = "";
			this.btpEstabelecimento.estTxtObservacao = "";
		},

		fecharFormulario() {
			this.limparFormulario();
			this.$store.commit("showGlobalDialog", false);
			
		},

		updateGlobalEntity() {
			this.btpEstabelecimento = this.$store.state.globalEntity;
		}
	},
	watch: {
		"$store.state.globalEntity": "updateGlobalEntity",
	},
};
</script>
