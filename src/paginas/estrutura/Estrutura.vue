<template>
    <div>
      <cabecalho />

      <v-main>
        <v-container fluid>
          <v-row>
            <v-col align="center">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <mensageria />
    </div>
</template>

<script>
import Cabecalho from "./EstruturaCabecalho.vue";
import Mensageria from "./EstruturaMensageria.vue";

export default {
  name: "Estrutura",
  components: { Cabecalho, Mensageria }
};
</script>