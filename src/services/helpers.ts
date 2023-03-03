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
	return Verticals;
};

const getDiagonalFour = (row: number, col: number, right = true) => {
	const shift = right ? 1 : -1;
	return [
		{ row, col },
		{ row: row + 1 * shift, col: col + 1 * shift },
		{ row: row + 2 * shift, col: col + 2 * shift },
		{ row: row + 3 * shift, col: col + 3 * shift }
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
		for (let col = 3; col <= 6; col++) {
			DiagonalsLeft.push(getDiagonalFour(row, col, false));
		}
	}

	console.log('diagonals', DiagonalsLeft.length + DiagonalsRight.length);
	return [...DiagonalsRight, ...DiagonalsLeft];
};
