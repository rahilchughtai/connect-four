<script lang="ts">
	import Chip from './chip.svelte';
	import { findFirstEmpty, checkWinner } from '../services/algorithms';
	let rows = 6;
	let cols = 7;

	let fields = [...Array(rows)].map((_) => Array(cols).fill('white'));
	let playerOneTurn = true;
	$: currentColor = playerOneTurn ? 'red' : 'blue';

	const updateFields = (row: number, col: number) => {
		let newFields = fields;
		newFields[row][col] = currentColor;
		fields = newFields;
	};

	const makeMove = (column: number) => {
		const res = findFirstEmpty(column, fields);
		if (res === null) {
			console.log('no open field');
			return;
		}
		const { row, col } = res;
		updateFields(row, col);

		const winner = checkWinner(fields);
		if (winner) {
			alert('We have a winner!');
		}
		playerOneTurn = !playerOneTurn;
	};
</script>

<h1>Hello world</h1>

<pre>
    {playerOneTurn}
    {currentColor}
</pre>

<div class="grid">
	{#each [0, 1, 2, 3, 4, 5, 6] as moveColumn}
		<button on:click={() => makeMove(moveColumn)} class="throw">Throw {moveColumn}</button>
	{/each}
	{#each [0, 1, 2, 3, 4, 5].reverse() as row}
		<!-- content here -->
		{#each [0, 1, 2, 3, 4, 5, 6] as col}
			<Chip color={fields[row][col]} playerOne={playerOneTurn} {row} {col} />
		{/each}
	{/each}
</div>

<style>
	.throw {
		color: red;
	}
	button {
		all: unset;
		cursor: pointer;
	}
	.grid {
		display: grid;
		justify-items: center;
		gap: 1em;
		border: 1px solid black;
		grid-template: repeat(6, 1fr) / repeat(7, 1fr);

		/* ccols, rows**/
	}

</style>
