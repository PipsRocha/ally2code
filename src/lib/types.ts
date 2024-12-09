export type TopCode = {
	code: number;
	x: number;
	y: number;
	radius: number;
	angle: number;
};

export type Mode = 'no-awareness' | 'private' | 'shared';

export type RobotType = 'toio' | 'microbit' | 'dash';

export type Position = {
	x: number;
	y: number;
};

export type Movement = 'forward' | 'backward' | 'left' | 'right';

export type Orientation = 'north' | 'east' | 'south' | 'west';

export const moves: Record<Orientation, Record<Movement, Position>> = {
	north: {
		forward: { x: 0, y: -1 },
		backward: { x: 0, y: 1 },
		left: { x: -1, y: 0 },
		right: { x: 1, y: 0 }
	},
	east: {
		forward: { x: 1, y: 0 },
		backward: { x: -1, y: 0 },
		left: { x: 0, y: -1 },
		right: { x: 0, y: 1 }
	},
	south: {
		forward: { x: 0, y: 1 },
		backward: { x: 0, y: -1 },
		left: { x: 1, y: 0 },
		right: { x: -1, y: 0 }
	},
	west: {
		forward: { x: -1, y: 0 },
		backward: { x: 1, y: 0 },
		left: { x: 0, y: 1 },
		right: { x: 0, y: -1 }
	}
};

export type Labyrinth = {
	matrix: number[][];
	initialPosition: Position;
	initialOrientation: Orientation;
	targetPosition: Position;
};
