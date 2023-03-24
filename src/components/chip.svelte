<script lang="ts">
	export let row: number = 0;
	export let col: number = 0;
	export let color = 'red';
	$: bgColor = color;
	export let isWinner = false;
	export let playerOneImage: string;
	export let playerTwoImage: string;

	let path = 'images/white.jpg';

	$: pathToColor = (path: string) => {
		if (isWinner) {
			return 'green';
		}

		if (path === 'images/white.jpg') {
			return 'black';
		}
		return color;
	};

	$: getBorderColor = () => {
		if (isWinner) {
			return 'green';
		}
		return color;
	};

	$: getImage = (color: string) => {
		if (color === 'red') {
			console.log(playerOneImage);
			return playerOneImage;
		}
		if (color === 'blue') {
			return playerTwoImage;
		}
		return 'images/white.jpg';
	};
	$: path = getImage(color);
</script>

<!-- svelte-ignore a11y-missing-attribute -->

<img style="border-color: {pathToColor(path)}" class="item" src={path} width="40" height="40" />

<style>
	.item {
		border: 2px solid black;
		border-radius: 2em;
	}
</style>
