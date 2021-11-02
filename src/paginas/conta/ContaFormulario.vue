<template>
	<v-dialog persistent v-model="$store.state.globalDialog" width="800">
		<v-card class="mb-3">
			<v-toolbar color="primary" height="35" dark flat>
				<v-toolbar-title>
					<span v-if="isEdicao">Editar Conta</span>
					<span v-else>Nova Conta</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<df-grid>
					<v-text-field label="Código" v-model="btpConta.conCodConta" readonly />
				</df-grid>
				<df-grid column="fixed-3">
					<v-combobox v-model="btpContaNivelUm"
						label="Conta N1"
						item-value="conNumNivel"
						item-text="conTxtDescricao"
						:readonly="isEdicao"
						:items="btpContaListComboNivelUm"
						@change="comboContaNivelUmChange(btpContaNivelUm)"
					/>
					<v-combobox v-model="btpContaNivelDois"
						label="Conta N2"
						item-value="conNumNivel"
						item-text="conTxtDescricao"
						:readonly="isEdicao"
						:items="btpContaListComboNivelDois"
						@change="comboContaNivelDoisChange()"
					/>
					<df-grid column="fixed-2">
						<v-text-field v-if="!btpContaNivelDois.conNumNivel" label="N1." v-model="btpContaNivelUm.conNumNivel" readonly />
						<v-text-field v-else label="N2." v-model="btpContaNivelDois.conNumNivel" readonly />
						<v-text-field label="N3" v-model="btpContaNivelTres.conNumNivel" maxlength="2" :readonly="isEdicao" @input="textContaNivelTresInput()" />
					</df-grid>
				</df-grid>
				<df-grid>
					<v-text-field label="Descrição" v-model="btpConta.conTxtDescricao" :readonly="isEdicao" />
				</df-grid>
			</v-card-text>

      <v-card-actions>
        <v-btn v-if="this.btpConta.conCodConta" width="150" @click="executarEdicao()">Confirmar</v-btn>
        <v-btn v-else width="150" @click="executarCadastro()">Confirmar</v-btn>

        <v-btn width="150" @click="limparFormulario()">Limpar</v-btn>
        <v-btn width="150" @click="fecharFormulario()">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ContaService from "./ContaService.js";

import DfGrid from "../../components/grid/Grid.vue";

export default {
	name: "ContaFormulario",
	components: { DfGrid },
	mixins: [ContaService],
	data() {
    return {
			btpContaNivelUm: {},
			btpContaNivelDois: {},
			btpContaNivelTres: {},

      btpContaListComboNivelUm: [],
      btpContaListComboNivelDois: []
    };
  },
	methods: {
		limparFormulario() {
			this.btpContaNivelUm = {};
			this.btpContaNivelDois = {};
			this.btpContaNivelTres = {};

			this.btpContaListComboNivelDois = [];

			this.btpConta = {
				conCodConta: null,
				conTxtDescricao: "",
				conNumNivel: ""
			}
		},

		fecharFormulario() {
			this.limparFormulario();
			this.$store.commit("showGlobalDialog", false);
		},

		updateGlobalEntity() {
			this.btpConta = this.$store.state.globalEntity;
		},

		comboContaNivelUmChange(btpConta) {
			this.btpContaNivelDois = {};
			this.btpContaNivelTres = {};
			this.btpConta.conNumNivel = "";

			this.acessarCadastro(btpConta);
			this.calcularNivelFinal();
		},

		comboContaNivelDoisChange() {
			this.calcularNivelFinal();
		},

		textContaNivelTresInput() {
			if (isNaN(this.btpContaNivelTres.conNumNivel)) {
				this.btpContaNivelTres.conNumNivel = "";
				this.$_message_showWarning("Número inválido!");
			}

			this.calcularNivelFinal();
		},

		calcularNivelFinal() {
			let nivelUm = (this.btpContaNivelUm.conNumNivel ? this.btpContaNivelUm.conNumNivel : "");
			let nivelDois = (this.btpContaNivelDois.conNumNivel ? this.btpContaNivelDois.conNumNivel : "");
			let nivelTres = (this.btpContaNivelTres.conNumNivel ? this.btpContaNivelTres.conNumNivel : "");

			this.btpConta.conNumNivel = nivelUm + nivelTres + ".";
			this.btpConta.btpContaPai = this.btpContaNivelUm;
			if (nivelDois) {
				this.btpConta.conNumNivel = nivelDois + nivelTres + ".";
				this.btpConta.btpContaPai = this.btpContaNivelDois;
			}
		}
	},
	computed: {
		isEdicao() {
			return (this.btpConta.conCodConta ? true : false)
		}
	},
  created() {
    this.acessarCadastro();
  },
  watch: {
		"$store.state.globalEntity": "updateGlobalEntity",
	}
};
</script>
