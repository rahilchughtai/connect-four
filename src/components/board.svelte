<script lang="ts">
	import { Button, Center } from '@svelteuidev/core';

	import Chip from './chip.svelte';
	import { findFirstEmpty, checkWinner } from '../services/algorithms';
	let rows = 6;
	let cols = 7;

	let gameOver = false;
	let fields = [...Array(rows)].map((_) => Array(cols).fill('white'));
	let playerOneTurn = true;

	$: currentColor = playerOneTurn ? 'red' : 'blue';

	const updateFields = (row: number, col: number) => {
		colorFields(row, col, currentColor);
	};

	const clearFields = () => {
		fields = [...Array(rows)].map((_) => Array(cols).fill('white'));
	};

	const ResetGame = () => {
		clearFields();
		playerOneTurn = true;
		gameOver = false;
	};
	const colorFields = (row: number, col: number, color: string) => {
		let newFields = fields;
		newFields[row][col] = color;
		fields = newFields;
	};

	const makeMove = (column: number) => {
		if (gameOver) {
			return;
		}
		const res = findFirstEmpty(column, fields);
		if (res === null) {
			console.log('no open field');
			return;
		}
		const { row, col } = res;
		updateFields(row, col);

		const [winner, line] = checkWinner(fields);
		if (winner) {
			for (const field of line) {
				const { row, col } = field;
				colorFields(row, col, 'green');
			}
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
			<Chip color={fields[row][col]} playerOne={playerOneTurn} {row} {col} />
		{/each}
	{/each}
</div>
<Center mt="lg">
	{#if gameOver}
		<Button on:click={ResetGame}>Restart Game</Button>
	{/if}
</Center>

<style>
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
