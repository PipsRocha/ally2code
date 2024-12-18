import { DashRobot, MicrobitRobot, ToioRobot, type Robot } from './robots';
import {
	moves,
	type Labyrinth,
	type Mode,
	type Movement,
	type Orientation,
	type Position,
	type RobotConnectionState,
	type RobotType
} from './types';

export class RobotState {
	robot!: Robot;
	labyrinth: Labyrinth;
	mode: Mode;
	connectionState: RobotConnectionState = $state('disconnected');
	position: Position = $state({ x: 0, y: 0 });
	orientation: Orientation = $state('north');

	constructor(robot: RobotType, labyrinth: Labyrinth, mode: Mode) {
		if (robot === 'toio') {
			this.robot = new ToioRobot();
		} else if (robot === 'microbit') {
			this.robot = new MicrobitRobot();
		} else if (robot === 'dash') {
			this.robot = new DashRobot();
		}

		this.labyrinth = labyrinth;
		this.mode = mode;
		this.position = labyrinth.initialPosition;
		this.orientation = labyrinth.initialOrientation;
	}

	async connect() {
		await this.robot.connect();
		this.connectionState = 'connected';
	}

	async disconnect() {
		await this.robot.disconnect();
		this.connectionState = 'disconnected';
	}

	canMove(movement: Movement): boolean {
		const moveOffset = moves[this.orientation][movement];
		const newPosition = {
			x: this.position.x + moveOffset.x,
			y: this.position.y + moveOffset.y
		};

		if (
			newPosition.x < 0 ||
			newPosition.x >= this.labyrinth.matrix[0].length ||
			newPosition.y < 0 ||
			newPosition.y >= this.labyrinth.matrix.length
		) {
			console.log('out of bounds');
			return false;
		}

		if (this.labyrinth.matrix[newPosition.y][newPosition.x] === 0) {
			console.log('wall');
			return false;
		}

		return true;
	}

	move(movement: Movement) {
		if (!this.canMove(movement)) {
			return;
		}

		const moveOffset = moves[this.orientation][movement];
		const newPosition = {
			x: this.position.x + moveOffset.x,
			y: this.position.y + moveOffset.y
		};
		const newOrientation = moveOffset.orientation;

		this.robot.move(movement);
		this.position = newPosition;
		this.orientation = newOrientation;

		if (this.reachedTarget()) {
			console.log('target reached');
			this.robot.dance();
		}
	}

	dance() {
		this.robot?.dance();
	}

	speak() {
		this.robot?.speak();
	}

	reachedTarget(): boolean {
		return (
			this.position.x === this.labyrinth.targetPosition.x &&
			this.position.y === this.labyrinth.targetPosition.y
		);
	}
}
