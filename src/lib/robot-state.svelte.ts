import { MicrobitRobot, ToioRobot, type Robot } from './robots';
import {
	moves,
	type Labyrinth,
	type Maze,
	type Mode,
	type Movement,
	type Orientation,
	type Position,
	type RobotConnectionState,
	type RobotType,
	type Animals
} from './types';
import { playAudio } from './utils';

export class RobotState {
	robot!: Robot;
	map: Labyrinth | Maze | Animals;
	mode: Mode;
	connectionState: RobotConnectionState = $state('disconnected');
	position: Position = $state({ x: 0, y: 0 });
	orientation: Orientation = $state('north');
	path : number;

	constructor(robot: RobotType, map: Labyrinth | Maze | Animals, mode: Mode) {
		if (robot === 'toio') {
			this.robot = new ToioRobot();
		} else if (robot === 'microbit') {
			this.robot = new MicrobitRobot();
		}

		this.map = map;
		this.mode = mode;
		this.position = map.initialPosition;
		this.orientation = map.initialOrientation;
		this.path = this.map.matrix[map.initialPosition.y][map.initialPosition.x];
	}

	setLabyrinth(newLabyrinth: Labyrinth | Maze | Animals) {
		this.map = { ...newLabyrinth };
		this.position = newLabyrinth.initialPosition;
		this.orientation = newLabyrinth.initialOrientation;
		this.path = this.map.matrix[newLabyrinth.initialPosition.y][newLabyrinth.initialPosition.x];
	}

	setMode(mode: Mode) {
		this.mode = mode;
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
		console.log("I can move");

		const moveOffset = moves[this.orientation][movement];
			const newPosition = {
				x: this.position.x + moveOffset.x,
				y: this.position.y + moveOffset.y
			};
			const newOrientation = moveOffset.orientation;

			this.robot.move(movement);
			this.position = newPosition;
			this.orientation = newOrientation;

		if (this.map.type !== 'animalmaze') {
			console.log("Math maze");

			this.path += this.map.matrix[newPosition.y][newPosition.x];
			console.log('PATH: '+ this.path);

			if (this.reachedTarget() && this.map.type === 'maze') {
				console.log('target reached');
				let target: HTMLAudioElement;
				console.log('PATH: '+ this.path);

				if (this.map.targetResult === this.path) {
					const realValue = new Audio('/sounds/' + this.map.targetResult + '.wav');
					playAudio(realValue);
				}
			}
			console.log("Not target!");
		} else {
		
			if (this.reachedNonTarget()) {
				const wrongAudio = new Audio('/sounds/not_belonging.wav');
				playAudio(wrongAudio);
				return;
			}

			if (this.reachedTarget()) {
				const correctAudio = new Audio('/sounds/belongs.wav');
				playAudio(correctAudio);
			}
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

	reachedNonTarget(): boolean {
		if (this.map.type !== 'animalmaze') return false;

		const animalMap = this.map as Animals;

		return animalMap.nonTargetPositions.some(
			(pos) => pos.x === this.position.x && pos.y === this.position.y
		);
	}

	resetMap() {
		this.position = this.map.initialPosition;
		this.orientation = this.map.initialOrientation;
		this.path = this.map.matrix[this.position.y][this.position.x];
	}

}
