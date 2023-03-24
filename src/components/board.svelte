<script lang="ts">
	import { Button, Center, Title } from '@svelteuidev/core';

	import Chip from './chip.svelte';
	import { findFirstEmpty, checkWinner, checkDraw } from '../services/algorithms';
	let rows = 6;
	let cols = 7;
	let winnerElements: any[] = [];

	let gameOver = false;
	let gameDraw = false;
	let fields = [...Array(rows)].map((_) => Array(cols).fill('white'));
	let playerOneTurn = true;

	$: currentColor = playerOneTurn ? 'red' : 'blue';

	$: isWinningChip = (row: number, col: number) => {
		for (const element of winnerElements) {
			if (element[0] === row && element[1] === col) {
				console.log('winner!');
				return true;
			}
		}
		return false;
	};

	const updateFields = (row: number, col: number) => {
		colorFields(row, col, currentColor);
	};

	const clearFields = () => {
		fields = [...Array(rows)].map((_) => Array(cols).fill('white'));
	};

	const ResetGame = () => {
		winnerElements = [];
		clearFields();
		playerOneTurn = true;
		gameDraw = false;
		gameOver = false;
	};
	const colorFields = (row: number, col: number, color: string) => {
		let newFields = fields;
		newFields[row][col] = color;
		fields = newFields;
	};

	const makeMove = (column: number) => {
		if (gameOver || gameDraw) {
			return;
		}
		const res = findFirstEmpty(column, fields);
		if (res === null) {
			console.log('no open field');
			return;
		}
		const { row, col } = res;
		updateFields(row, col);

		const draw = checkDraw(fields);

		if (draw) {
			gameDraw = true;
			alert('We have a draw!');
			gameOver = true;
		}
		const [winner, line] = checkWinner(fields);
		if (winner) {
			winnerElements = line.map((el) => [el.row, el.col]);
			alert('We have a winner!');
			gameOver = true;
		}
		playerOneTurn = !playerOneTurn;
	};
</script>

<div class="grid">
	{#each [0, 1, 2, 3, 4, 5, 6] as moveColumn}
		<Button on:click={() => makeMove(moveColumn)} class="throw">Throw {moveColumn}</Button>
	{/each}
	{#each [0, 1, 2, 3, 4, 5].reverse() as row}
		{#each [0, 1, 2, 3, 4, 5, 6] as col}
			<Chip isWinner={isWinningChip(row, col)} color={fields[row][col]} {row} {col} />
		{/each}
	{/each}
</div>

<Center>
	<Title>
		{currentColor.toUpperCase()}'s Turn
	</Title>
</Center>

<Center mt="lg">
	{#if gameOver || gameDraw}
		<Button on:click={ResetGame}>Restart Game</Button>
	{/if}
</Center>

<style>
	.bg {
		background-image: url('https://cdn.discordapp.com/attachments/699364951571300584/1081229129426415627/1677851819061.jpg'); /* The image used */
		height: 20px; /* You must set a specified height */
		background-position: center; /* Center the image */
		background-repeat: no-repeat; /* Do not repeat the image */
		background-size: contain;
	}
	.grid {
		width: 800px;
		display: grid;
		margin: auto;
		justify-items: center;
		align-items: center;
		border: 1px solid black;
		grid-template: repeat(6, 1fr) / repeat(7, 1fr);

		/* ccols, rows**/
	}
</style>
