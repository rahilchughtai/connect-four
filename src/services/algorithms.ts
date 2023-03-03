import { getDiagonals, getHorizontals, getVerticals } from './helpers';

export interface ChipTuple {
	row: number;
	col: number;
}

export const rowsHighestIndex = 5;
export const colsHighestIndex = 6;

const AllLines = [...getHorizontals(), ...getVerticals(), ...getDiagonals()];

export const findFirstEmpty = (col: number, fields: string[][]): ChipTuple | null => {
	for (let row = 0; row <= rowsHighestIndex; row++) {
		const element = fields[row][col];
		if (element === 'white') {
			return { row, col };
		}
	}
	return null;
};

export const checkWinner = (fields: string[][]) => {
	for (const line of AllLines) {
		const won = line.map((line) => {
			const { row, col } = line;
			return fields[row][col];
		});

		if (won.every((val) => val === 'red')) {
			return true;
		}

		if (won.every((val) => val === 'blue')) {
			return true;
		}
	}
	return false;
};
