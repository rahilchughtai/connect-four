<script lang="ts">
	export let playerOne:boolean;
	export let row: number = 0;
	export let col: number = 0;
	export let color = 'white';



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div style="background-color: {color};" class="item">{row},{col}</div>

<style>
	.item {
		border: 1px solid black;
		text-align: center;
		padding: 1.2em;
		border-radius: 2em;
		height: 20px;
		width: 20px;
	}
</style>
