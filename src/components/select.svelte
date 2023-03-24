<script lang="ts">
	import { Button, Center, Title, Text } from '@svelteuidev/core';
	import Board from './board.svelte';

	let playerOneImage = '';
	let playerTwoImage = '';

	let confirmed = false;

	let playerImages = ['images/norieSmile.jpg', 'images/nuri.jpg', 'images/leoSmile.jpg'];

	const selectPlayerOne = (image: string) => {
		playerOneImage = image;
	};

	const confirmClick = () => {
		confirmed = true;
	};

	const selectPlayerTwo = (image: string) => {
		playerTwoImage = image;
	};

	$: isSelectedTwo = (image: string) => playerTwoImage === image;

	$: isSelectedOne = (image: string) => playerOneImage === image;
</script>

{#if !confirmed}
	<div>
		<Center><Text>Choose for Player One:</Text></Center>
		<Center>
			{#each playerImages as image}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					class="img {isSelectedOne(image) ? 'selected' : ''}"
					on:click={() => selectPlayerOne(image)}
					width="100px"
					src={image}
					alt=""
				/>
			{/each}
		</Center>

		<Center>
			<Text>Choose for Player Two:</Text>
		</Center>
		<Center>
			{#each playerImages as image}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					class="img {isSelectedTwo(image) ? 'selected' : ''}"
					on:click={() => selectPlayerTwo(image)}
					width="100px"
					src={image}
					alt=""
				/>
			{/each}
		</Center>

		<Center>
			<Button on:click={confirmClick} disabled={playerOneImage == '' || playerTwoImage == ''}
				>Confirm</Button
			>
		</Center>
	</div>
{:else}
	<Board {playerOneImage} {playerTwoImage} />
{/if}

<style>
	.img {
		margin: 1em 2em;
	}
	.selected {
		border: 5px solid pink;
	}
</style>
