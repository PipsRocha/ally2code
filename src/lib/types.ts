export type TopCode = {
	code: number;
	x: number;
	y: number;
	radius: number;
	angle: number;
};

export type Mode = 'no-awareness' | 'private' | 'shared';

export type RobotType = 'toio' | 'microbit' | 'dash';

export type RobotConnectionState = 'connected' | 'disconnected';

export type Position = {
	x: number;
	y: number;
};

export type Movement = 'forward' | 'backward' | 'left' | 'right';

export type Orientation = 'north' | 'east' | 'south' | 'west';

export const moves: Record<
	Orientation,
	Record<Movement, Position & { orientation: Orientation }>
> = {
	north: {
		forward: { x: 0, y: -1, orientation: 'north' },
		backward: { x: 0, y: 1, orientation: 'south' },
		left: { x: -1, y: 0, orientation: 'west' },
		right: { x: 1, y: 0, orientation: 'east' }
	},
	east: {
		forward: { x: 1, y: 0, orientation: 'east' },
		backward: { x: -1, y: 0, orientation: 'west' },
		left: { x: 0, y: -1, orientation: 'north' },
		right: { x: 0, y: 1, orientation: 'south' }
	},
	south: {
		forward: { x: 0, y: 1, orientation: 'south' },
		backward: { x: 0, y: -1, orientation: 'north' },
		left: { x: 1, y: 0, orientation: 'east' },
		right: { x: -1, y: 0, orientation: 'west' }
	},
	west: {
		forward: { x: -1, y: 0, orientation: 'west' },
		backward: { x: 1, y: 0, orientation: 'east' },
		left: { x: 0, y: 1, orientation: 'south' },
		right: { x: 0, y: -1, orientation: 'north' }
	}
};

export type Labyrinth = {
	matrix: number[][];
	initialPosition: Position;
	initialOrientation: Orientation;
	targetPosition: Position;
	type: 'labyrinth';
};

export type Maze = {
	matrix: number[][];
	initialPosition: Position;
	initialOrientation: Orientation;
	targetPosition: Position;
	targetResult: number;
	type:'maze';
};

export type Animals = {
	matrix: number[][];
	initialPosition: Position;
	initialOrientation: Orientation;
	targetPosition: Position;
	nonTargetPositions: Position [];
	type:'animalmaze';
};

export type Log = {
	robot: RobotType;
	mode: Mode;
	timestamp: number;
	message: string;
};
