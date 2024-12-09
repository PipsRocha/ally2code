import type { Movement } from '$lib/types';
// @ts-expect-error WonderJS types are not available
import WonderJS from '@wonderworkshop/wwjs';
import { Robot } from './robot';

export class DashRobot extends Robot {
	private robot: unknown | null = null;
	async connect() {
		WonderJS.connect();
		WonderJS.addEventListener('onconnect', (rbt: unknown) => {
			console.log('connected', rbt);
		});
	}
	async disconnect() {}
	async canMove(movement: Movement): Promise<boolean> {
		console.log(movement);
		return true;
	}
	async move(movement: Movement) {
		if (this.robot) {
			if (movement === 'forward') {
				// pose
			} else if (movement === 'backward') {
				// pose
			} else if (movement === 'left') {
				// pose
			} else if (movement === 'right') {
				// pose
			}
		}
	}
	async dance() {}
	async speak() {}
}
