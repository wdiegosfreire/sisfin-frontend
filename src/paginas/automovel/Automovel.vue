<template>
	<v-card>
		<v-card-title class="headline">Automóvel</v-card-title>

		<v-card-text>
			<df-grid spaced>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
				<div style="border: solid 1px white;">Automóvel</div>
			</df-grid>
		</v-card-text>
	</v-card>
</template>

<script>
import DfGrid from "../../components/grid/Grid.vue";

export default {
	name: "Automovel",
	components: { DfGrid }
}
</script>