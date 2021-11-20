<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-toolbar-title>Locations</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click.stop="acessarModulo()" title="Click to reload page"><v-icon>mdi-update</v-icon></v-btn>
      <v-btn icon @click.stop="toggleFilterField()" title="Click to search"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon @click.stop="acessarCadastro()" title="Click to register a new location"><v-icon>mdi-plus</v-icon></v-btn>
    </v-app-bar>

    <df-input-filter transition="slide-x-transition" v-if="showFilterField" @type="executarFiltro" />

    <location-result />
    <location-form />
  </div>
</template>

<script>
import locationService from "./locationService.js";
import LocationResult from "./LocationResult.vue";
import LocationForm from "./LocationForm.vue";

import DfInputFilter from "../../components/input/InputFilter.vue";

export default {
  name: "Location",
  components: { LocationResult, LocationForm, DfInputFilter },
  mixins: [locationService],
  methods: {
    toggleFilterField() {
      if (this.location.name) {
        this.location.name = "";
        this.executarFiltro();
      }

      this.showFilterField = !this.showFilterField;
    }
  },
  created() {
    this.acessarModulo();
  },
};
</script>
