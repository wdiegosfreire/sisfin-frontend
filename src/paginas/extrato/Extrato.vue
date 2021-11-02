<template>
   <v-card>
      <v-card-title class="headline">Extrato</v-card-title>

      <v-card-text>
         <df-grid spaced>
            <div style="border: solid 1px white;">Extrato</div>
            <div style="border: solid 1px white;">Extrato</div>
            <div style="border: solid 1px white;">Extrato</div>
            <div style="border: solid 1px white;">Extrato</div>
            <div style="border: solid 1px white;">Extrato</div>
         </df-grid>
      </v-card-text>
   </v-card>
</template>

<script>
import DfGrid from "../../components/grid/Grid.vue";

export default {
   name: "Extrato",
   components: { DfGrid }
}
</script>