import { DashRobot, MicrobitRobot, ToioRobot, type Robot } from './robots';
import {
	moves,
	type Labyrinth,
	type Maze,
	type Mode,
	type Movement,
	type Orientation,
	type Position,
	type RobotConnectionState,
	type RobotType
} from './types';
import { playAudio } from './utils';

export class RobotState {
	robot!: Robot;
	map: Labyrinth | Maze;
	mode: Mode;
	connectionState: RobotConnectionState = $state('disconnected');
	position: Position = $state({ x: 0, y: 0 });
	orientation: Orientation = $state('north');
	path : number;

	constructor(robot: RobotType, map: Labyrinth | Maze, mode: Mode) {
		if (robot === 'toio') {
			this.robot = new ToioRobot();
		} else if (robot === 'microbit') {
			this.robot = new MicrobitRobot();
		} else if (robot === 'dash') {
			this.robot = new DashRobot();
		}

		this.map = map;
		this.mode = mode;
		this.position = map.initialPosition;
		this.orientation = map.initialOrientation;
		this.path = 0;
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
			newPosition.x >= this.map.matrix[0].length ||
			newPosition.y < 0 ||
			newPosition.y >= this.map.matrix.length
		) {
			console.log('out of bounds');
			return false;
		}

		if (this.map.matrix[newPosition.y][newPosition.x] === 0) {
			console.log('wall');
			return false;
		}
		return true;
	}

	move(movement: Movement) {
		if (!this.canMove(movement)) {
			const noWayAudio = new Audio('/sounds/sem_passagem.wav');
			playAudio(noWayAudio);
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
		this.path += this.map.matrix[newPosition.y][newPosition.x];
		console.log('PATH: '+ this.path);

		if (this.reachedTarget() && this.map.type === 'maze') {
			console.log('target reached');
			let target: HTMLAudioElement;
			console.log('PATH: '+ this.path);

			if (this.map.targetResult == this.path) {
				target = new Audio('/sounds/lucky.wav');
				playAudio(target);
			} else {
				target = new Audio('/sounds/not_here');
				const realValue = new Audio('/sounds/' + this.map.targetResult + '.wav');
				playAudio(realValue);
			}
			
		} else {
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
			this.position.x === this.map.targetPosition.x &&
			this.position.y === this.map.targetPosition.y
		);
	}
}
