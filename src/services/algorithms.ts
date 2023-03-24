import { getDiagonals, getHorizontals, getVerticals, nextStates } from './helpers';

export interface ChipTuple {
	row: number;
	col: number;
}

export const rowsHighestIndex = 5;
export const colsHighestIndex = 6;

const AllLines = [...getHorizontals(), ...getVerticals(), ...getDiagonals()];

console.log(AllLines.length);
export const findFirstEmpty = (col: number, fields: string[][]): ChipTuple | null => {
	for (let row = 0; row <= rowsHighestIndex; row++) {
		const element = fields[row][col];
		if (element === 'white') {
			return { row, col };
		}
	}
	return null;
};

type Line = {
	row: number;
	col: number;
}[];

export const checkDraw = (fields: string[][]) => {
	return fields[5].every((val) => val !== 'white');
};

export type PlayerFieldValue = 'red' | 'blue' | 'white';

export const checkWinner = (
	fields: PlayerFieldValue[][]
): [boolean, Line, PlayerFieldValue | null] => {
	for (const line of AllLines) {
		const won: PlayerFieldValue[] = line.map((line) => {
			const { row, col } = line;
			return fields[row][col];
		});

		if (won.every((val) => val === 'red') || won.every((val) => val === 'blue')) {
			return [true, line, won[-1]];
		}
	}
	return [false, [], null];
};

export const heuristic = (State: string[][]): number => {
	let result = 0.0;

	// all lines are checked whether they contain 3 identical nonempty marks
	for (const Line of AllLines) {
		const List = Line.map(({ row, col }) => State[row][col]).filter((mark) => mark !== 'white');

		if (List.length === 3) {
			const Chars = new Set(List);
			if (Chars.size === 1) {
				if (Chars.has('red')) {
					result += 1 / 10;
				} else {
					result -= 1 / 10;
				}
			}
		}

		if (List.length === 2) {
			const Chars = new Set(List);
			if (Chars.size === 1) {
				if (Chars.has('red')) {
					result += 1 / 100;
				} else {
					result -= 1 / 100;
				}
			}
		}
	}

	// prefer middle row
	for (let row = 0; row < 6; row++) {
		if (State[row][3] === 'red') {
			result += 1 / 20;
		} else if (State[row][3] === 'blue') {
			result -= 1 / 20;
		}
	}

	return result;
};
const utility = (fields: PlayerFieldValue[][]) => {
	const [a, b, c] = checkWinner(fields);
	if (c == null) {
		return 0;
	}
	return c == 'red' ? 1 : -1;
};

