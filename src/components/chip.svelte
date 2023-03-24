<script lang="ts">
	export let row: number = 0;
	export let col: number = 0;
	export let color = 'red';
	export let isWinner = false;

	let path = 'images/white.jpg';

	$: getImage = (color: string) => {
		if (isWinner) {
			return 'images/norieSmile.jpg';
		}
		if (color === 'red') {
			return 'images/nuri.jpg';
		}
		if (color === 'blue') {
			return 'images/leoSmile.jpg';
		}
		return 'images/white.jpg';
	};
	$: path = getImage(color);
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img
	style="border-color: {isWinner ? 'green' : 'black'};"
	class="item"
	src={path}
	width="40"
	height="40"
/>

<style>
	.item {
		border: 2px solid black;
		border-radius: 2em;
	}
</style>
