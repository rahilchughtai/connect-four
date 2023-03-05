<script lang="ts">
	export let playerOne: boolean;
	export let row: number = 0;
	export let col: number = 0;
	export let color = 'red';
</script>

<div style="background-color: {color}" class="item">{row},{col}</div>

<style>
	.item {
		border: 1px solid black;
		text-align: center;
		padding: 1.2em;
		border-radius: 2em;
		widows: 80px;
	}
</style>
