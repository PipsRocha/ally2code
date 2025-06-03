import type { Movement } from '$lib/types';
// @ts-expect-error WonderJS types are not available
import WonderJS from '@wonderworkshop/wwjs';
import { Robot } from './robot';

export class DashRobot extends Robot {
	private robot: any = null;

	async connect() {
		WonderJS.connect();
		WonderJS.addEventListener('onconnect', (robot: any) => {
			console.log('Connected to Dash:', robot);

			this.robot = robot;

			if (this.robot?.command?.linearAngular) {
				// Now safe to use
				this.robot.command.linearAngular(10, 0);
				setTimeout(() => this.robot.command.linearAngular(0, 0), 1000);
			} else {
				console.warn("Connected robot doesn't support linearAngular.");
			}
		});}

	async move(movement: Movement) {
		if (!this.robot || !this.robot.command?.linearAngular) return;

		const speed = 20;
		switch (movement) {
			case 'forward':
				this.robot.command.linearAngular(speed, 0);
				break;
			case 'backward':
				this.robot.command.linearAngular(-speed, 0);
				break;
			case 'left':
				this.robot.command.linearAngular(0, speed);
				break;
			case 'right':
				this.robot.command.linearAngular(0, -speed);
				break;
			default:
				this.robot.command.linearAngular(0, 0);
		}
	}

	async disconnect() {
		this.robot = null;
	}

	async canMove(): Promise<boolean> {
		return !!this.robot;
	}

	async dance() {}
	async speak() {}
}
