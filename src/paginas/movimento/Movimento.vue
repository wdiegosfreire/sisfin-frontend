<template>
   <v-card>
      <v-card-title class="headline">Estabelecimentos</v-card-title>

      <v-card-text>
         <df-grid spaced>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
            <div style="border: solid 1px white;">Movimentos</div>
         </df-grid>
      </v-card-text>
   </v-card>
</template>

<script>
import DfGrid from "../../components/grid/Grid.vue";

export default {
   name: "Movimento",
   components: { DfGrid }
}
</script>