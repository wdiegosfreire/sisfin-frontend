<template>
   <v-card max-width="500">
        <v-img src="../../assets/imagens/financas-pessoais.jpg">
            <v-card-title class="headline">Autenticação</v-card-title>
        </v-img>

        <v-card-text>
            <v-text-field label="E-mail" v-model="btpUsuario.usuTxtEmail" append-icon="mdi-mail" />
            <v-text-field label="Senha" type="password" v-model="usuTxtSenha" append-icon="mdi-lock" />
        </v-card-text>

        <v-card-actions>
            <v-btn color="button" width="150" @click="autenticarUsuario">Confirmar</v-btn>
            <v-btn color="button" width="150" @click="limparFormulario">Limpar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import api from "../../components/api/api";
import message from "../../components/mixins/message";
import md5 from 'js-md5'

export default {
    name: "Autenticacao",
    mixins: [api, message],
    data() {
        return {
            isProduction: false,
            usuTxtSenha: "",
            btpUsuario: {
                usuTxtEmail: "",
                usuTxtSenha: ""
            }
        }
    },
    created() {
        this.$store.commit("setLogged", false);
    },
    methods: {
        autenticarUsuario() {
            if (this.btpUsuario.usuTxtEmail == "") {
                this.$_message_showWarning("Email não informado.");
                return;
            }

            if (this.usuTxtSenha == "") {
                this.$_message_showWarning("Senha não informada.");
                return;
            }

            this.btpUsuario.usuTxtSenha = md5(this.usuTxtSenha);

            this.post(`/usuario/autenticarUsuario`, this.btpUsuario).then(response => {
                this.$store.commit("setBtpUsuario", response.data.retorno.btpUsuario);
                this.$router.push("/resumo");
            }).catch(error => {
                this.$_message_handleError(error);
            });
        },
        limparFormulario() {
            this.btpUsuario.usuTxtEmail = "";
            this.usuTxtSenha = "";
        }
    }
}
</script>