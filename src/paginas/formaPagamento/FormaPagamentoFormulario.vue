<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="this.btpFormaPagamento.fopCodFormaPagamento">Editar Forma de Pagamento</span>
					<span v-else>Nova Forma de Pagamento</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid>
					<v-text-field label="Código" readonly v-model="btpFormaPagamento.fopCodFormaPagamento" />
					<v-text-field label="Nome" v-model="btpFormaPagamento.fopNomFormaPagamento" />
				</df-grid>
			</v-card-text>

      <v-card-actions>
        <v-btn v-if="this.btpFormaPagamento.fopCodFormaPagamento" width="150" @click="executarEdicao()">Confirmar</v-btn>
        <v-btn v-else width="150" @click="executarCadastro()">Confirmar</v-btn>

        <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
        <v-btn width="150" @click="fecharFormulario()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormaPagamentoService from "./FormaPagamentoService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
	name: "FormaPagamentoFormulario",
	components: { DfGrid },
	mixins: [FormaPagamentoService],
	methods: {
		limparFormulario() {
			this.btpFormaPagamento.fopCodFormaPagamento = null;
			this.btpFormaPagamento.fopNomFormaPagamento = "";
		},

		fecharFormulario() {
			this.limparFormulario();
			this.$store.commit("showGlobalDialog", false);
		},

		updateGlobalEntity() {
			this.btpFormaPagamento = this.$store.state.globalEntity;
		}
	},
	watch: {
		"$store.state.globalEntity": "updateGlobalEntity",
	},
};
</script>
