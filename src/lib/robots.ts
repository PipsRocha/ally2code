import { NearestScanner } from '@toio/scanner';
import * as Microbit from 'microbit-web-bluetooth';

type Direction = 'front' | 'backward' | 'right' | 'left';

abstract class Robot {
	abstract discover(): Promise<void>;
	abstract connect(): Promise<void>;
	abstract canMove(direction: Direction): Promise<boolean>;
	abstract move(direction: Direction): Promise<void>;
	abstract dance(): Promise<void>;
	abstract speak(): Promise<void>;
}

export class MicrobitRobot extends Robot {
	private device: BluetoothDevice | null = null;
	async discover() {
		const device = await Microbit.requestMicrobit(window.navigator.bluetooth);

		if (!device) {
			throw new Error('No microbit device found');
		}
	}
	async connect() {}
	async canMove(direction: Direction): Promise<boolean> {
		console.log(direction);
		return true;
	}
	async move(direction: Direction): Promise<void> {
		console.log(direction);
	}
	dance(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	speak(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

export class ToioRobot extends Robot {
	private device: BluetoothDevice | null = null;
	async discover() {
		new NearestScanner().start();
	}
	async connect() {}
	async canMove(direction: Direction): Promise<boolean> {
		console.log(direction);
		return true;
	}
	async move(direction: Direction): Promise<void> {
		console.log(direction);
	}
	dance(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	speak(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

export class DashRobot extends Robot {
	private device: BluetoothDevice | null = null;
	async discover() {
		//WonderJS.connect();
	}
	async connect() {}
	async canMove(direction: Direction): Promise<boolean> {
		console.log(direction);
		return true;
	}
	async move(direction: Direction): Promise<void> {
		console.log(direction);
	}
	dance(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	speak(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
