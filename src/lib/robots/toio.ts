import type { Movement } from '$lib/types';
import type { Cube } from '@toio/cube';
import { NearestScanner } from '@toio/scanner';
import { Robot } from './robot';

export class ToioRobot extends Robot {
	private cube: Cube | null = null;
	async connect() {
		console.log('discover');
		const cubesFound = await new NearestScanner().start();
		if (!cubesFound) {
			throw new Error('No toio device found');
		}
		const cube = Array.isArray(cubesFound) ? cubesFound[0] : cubesFound;
		this.cube = await cube.connect();
	}
	async disconnect() {
		if (this.cube) {
			await this.cube.disconnect();
		}
	}
	async canMove(movement: Movement): Promise<boolean> {
		console.log(movement);
		return true;
	}
	async move(movement: Movement) {
		if (this.cube) {
			if (movement === 'forward') {
				this.cube.move(30, 30, 1000);
			} else if (movement === 'backward') {
				this.cube.move(-30, -30, 1000);
			} else if (movement === 'left') {
				this.cube.move(-30, 30, 1000);
			} else if (movement === 'right') {
				this.cube.move(30, -30, 1000);
			}
		}
	}
	async dance() {}
	async speak() {}
}
