import { colsHighestIndex, rowsHighestIndex } from './algorithms';

export const getHorizontals = () => {
	const Horizontals = [];
	for (let row = 0; row <= rowsHighestIndex; row++) {
		for (let col = 0; col <= 3; col++) {
			const items = [
				{ row, col },
				{ row, col: col + 1 },
				{ row, col: col + 2 },
				{ row, col: col + 3 }
			];
			Horizontals.push(items);
		}
	}
	console.log('horizontals:', Horizontals.length);
	return Horizontals;
};

export const getVerticals = () => {
	const Verticals = [];
	for (let col = 0; col <= colsHighestIndex; col++) {
		for (let row = 0; row <= 2; row++) {
			const items = [
				{ row, col },
				{ row: row + 1, col },
				{ row: row + 2, col },
				{ row: row + 3, col }
			];
			Verticals.push(items);
		}
	}
	console.log('verticals', Verticals.length);

	return Verticals;
};

const getDiagonalFour = (row: number, col: number, right = true) => {
	const shift = right ? 1 : -1;
	return [
		{ row, col },
		{ row: row + 1 * shift, col: col + 1 },
		{ row: row + 2 * shift, col: col + 2 },
		{ row: row + 3 * shift, col: col + 3 }
	];
};

export const getDiagonals = () => {
	const DiagonalsRight = [];
	for (let row = 0; row <= 2; row++) {
		for (let col = 0; col <= 3; col++) {
			DiagonalsRight.push(getDiagonalFour(row, col));
		}
	}
	const DiagonalsLeft = [];

	for (let row = 3; row <= 5; row++) {
		for (let col = 0; col <= 3; col++) {
			DiagonalsLeft.push(getDiagonalFour(row, col, false));
		}
	}
	return [...DiagonalsRight, ...DiagonalsLeft];
};

/**
 *
 * Returns the row index of first empty element in col
 * @param State
 * @param col
 * @returns
 */
const findEmpty = (State: string[][], col: number): number | null => {
	for (let row = 0; row < 6; row++) {
		if (State[row][col] === 'white') {
			return row;
		}
	}
	return null;
};

export const copyArray = (array: string[][]) => {
	const copy: string[][] = [];
	for (let i = 0; i < array.length; i++) {
		const row: string[] = array[i].slice();
		copy.push(row);
	}
	return copy;
};
export const nextStates = (State: any[][], player: string): string[][][] => {
	const states = [];

	for (let col = 0; col < 7; col++) {
		const row = findEmpty(State, col);
		if (row !== null) {
			const copy = copyArray(State);
			copy[row][col] = player;
			states.push(copy);
		}
	}
	return states;
};
