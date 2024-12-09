import type { Movement } from '$lib/types';
import { Robot } from './robot';

export class MicrobitRobot extends Robot {
	async connect() {}
	async disconnect() {}
	async canMove(movement: Movement): Promise<boolean> {
		console.log(movement);
		return true;
	}
	async move(movement: Movement) {
		console.log(movement);
	}
	async dance() {}
	async speak() {}
}
