import type { Movement } from '$lib/types';
import type { Cube } from '@toio/cube';
import { NearestScanner } from '@toio/scanner';
import { Robot } from './robot';

export class ToioRobot extends Robot {
	private cube: Cube | null = null;
	async connect() {
		if (this.cube) return; // Already connected

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
			this.cube = null;
		}
	}
	
	async canMove(movement: Movement): Promise<boolean> {
		console.log(movement);
		return true;
	}
	
	async move(movement: Movement) {
		if (!this.cube) {
			console.warn('Cube is not connected.');
			return;
		}
		
		console.log(`Moving ${movement}`);
		// then perform the move

		if (this.cube) {
			if (movement === 'forward') {
				this.cube.move(20, 20, 1000);
			} else if (movement === 'backward') {
				this.cube.move(-20, -20, 1000);
			} else if (movement === 'left') {
				this.cube.move(-10, 10, 800);
			} else if (movement === 'right') {
				this.cube.move(10, -10, 800);
			}
		}
	}
	async dance() {}
	async speak() {}
}
