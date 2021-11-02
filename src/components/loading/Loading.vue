<template>
	<v-snackbar v-model="$store.state.globalLoading">
		<div class="text-center">
			<div>Carregando</div>
			<v-icon>mdi-clock</v-icon>
		</div>
	</v-snackbar>
</template>

<script>
export default {
  name: "Loading"
};
</script>
