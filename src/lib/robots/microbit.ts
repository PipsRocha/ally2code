import type { Movement } from '$lib/types';
import * as microbit from 'microbit-web-bluetooth';
import { Robot } from './robot';

export class MicrobitRobot extends Robot {
	private device: BluetoothDevice | null = null;
	async connect() {
		const device = await microbit.requestMicrobit(window.navigator.bluetooth);
		if (device) {
			this.device = device;
			await microbit.getServices(device!);
		}
	}
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
