import type { Labyrinth } from './types';

export const labyrinths: Record<string, Labyrinth> = {
	labyrinth_train: {
		matrix: [
			[1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1]
		],
		initialPosition: { x: 6, y: 4 },
		initialOrientation: 'north',
		targetPosition: { x: 3, y: 0 }
	},
	labyrinth_p1: {
		matrix: [
			[1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 0, 0, 1, 1],
			[1, 0, 0, 0, 1, 1, 0],
			[1, 0, 0, 0, 1, 0, 0]
		],
		initialPosition: { x: 4, y: 4 },
		initialOrientation: 'north',
		targetPosition: { x: 3, y: 0 }
	},
	labyrinth_p2: {
		matrix: [
			[1, 1, 1, 1, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0]
		],
		initialPosition: { x: 2, y: 4 },
		initialOrientation: 'north',
		targetPosition: { x: 3, y: 0 }
	},
	labyrinth_p3: {
		matrix: [
			[1, 1, 0, 0, 1, 0, 0],
			[1, 0, 0, 0, 1, 0, 0],
			[1, 1, 1, 1, 1, 0, 0],
			[0, 0, 0, 0, 1, 0, 0],
			[0, 0, 0, 0, 1, 0, 0]
		],
		initialPosition: { x: 4, y: 0 },
		initialOrientation: 'south',
		targetPosition: { x: 1, y: 0 }
	},
	labyrinth_p4: {
		matrix: [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 1, 1, 1],
			[1, 0, 1, 0, 1, 0, 0],
			[1, 0, 1, 1, 1, 0, 0]
		],
		initialPosition: { x: 0, y: 4 },
		initialOrientation: 'north',
		targetPosition: { x: 6, y: 2 }
	},
	labyrinth_p5: {
		matrix: [
			[0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 1, 1],
			[0, 0, 1, 1, 1, 0, 1],
			[0, 0, 0, 0, 1, 0, 1],
			[0, 0, 0, 0, 1, 1, 1]
		],
		initialPosition: { x: 2, y: 2 },
		initialOrientation: 'east',
		targetPosition: { x: 0, y: 5 }
	},
	labyrinth_p6: {
		matrix: [
			[0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 1, 1, 1, 1],
			[0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 0, 0]
		],
		initialPosition: { x: 6, y: 3 },
		initialOrientation: 'west',
		targetPosition: { x: 6, y: 0 }
	}
};
