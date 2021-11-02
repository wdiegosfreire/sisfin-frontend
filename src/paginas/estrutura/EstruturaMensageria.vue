<template>
  <div>
    <v-snackbar v-model="showMessage" :color="severity" top right multi-line>
      <h3 class="mb-3 text-decoration-underline">{{ summary }}</h3>

      <ul>
        <li v-for="detail in detailList" :key="detail" class="mb-2">{{ detail }}</li>
      </ul>

      <v-btn text @click="showMessage = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Feedback",
  data() {
    return {
      severity: "",
      summary: "",
      detailList: [],
      showMessage: false,
    };
  },
  watch: {
    "$store.state.message.date": "setMessage",
  },
  methods: {
    setMessage() {
      this.severity = this.$store.state.message.severity;
      this.summary = this.$store.state.message.summary;
      this.detailList = this.$store.state.message.detailList;
      this.showMessage = true;
    },
  },
};
</script>
