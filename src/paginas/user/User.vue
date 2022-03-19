<template>
   <v-card max-width="500">
        <v-img src="../../assets/imagens/financas-pessoais.jpg">
            <v-card-title class="headline">Authentication</v-card-title>
        </v-img>

        <v-card-text>
            <v-text-field label="E-mail" v-model="user.email" append-icon="mdi-mail" />
            <v-text-field label="Password" type="password" v-model="password" append-icon="mdi-lock" />
        </v-card-text>

        <v-card-actions>
            <v-btn color="button" width="150" @click="executeAuthentication">Confirm</v-btn>
            <v-btn color="button" width="150" @click="resetForm">Clear</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import userService from "./userService.js";

export default {
   name: "User",
   mixins: [ userService ]
}
</script>