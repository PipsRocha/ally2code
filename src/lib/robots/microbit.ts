import type { Movement } from '$lib/types';
import { Robot } from './robot';
import { requestMicrobit, getServices } from 'microbit-web-bluetooth';

export class MicrobitRobot extends Robot {

	private device: BluetoothDevice | null = null;
	private txCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;

	async connect() {
		const device = await navigator.bluetooth.requestDevice({
			filters: [{ namePrefix: "BBC micro:bit" }],
			optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e'] // UART service UUID
		});

		this.device = device;

		const server = await device.gatt?.connect();
		if (!server) throw new Error("Failed to connect to GATT server");

		const service = await server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e'); // UART
		//const tx = await service.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e'); // TX (write)
		const rx = await service.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e'); // RX (write)
		this.txCharacteristic = rx;

		const characteristics = await service.getCharacteristics();
		
		for (const c of characteristics) {
			console.log("Characteristic UUID:", c.uuid);
			console.log("Writable:", c.properties.write, "Write w/o response:", c.properties.writeWithoutResponse);
		}


		//this.txCharacteristic = tx;
		console.log("Microbit connected with UART RX ready.");
		console.log('RX props:', this.txCharacteristic?.properties);

	}


	async disconnect() {
		if (this.device?.gatt?.connected) {
			this.device.gatt.disconnect();
			console.log("Microbit disconnected.");
		}
		this.device = null;
		this.txCharacteristic = null;
	}

	async canMove(): Promise<boolean> {
		return this.device?.gatt?.connected ?? false;
	}

	private async sendUART(command: string) {
		if (!this.txCharacteristic) {
			console.warn("TX characteristic not available");
			return;
		}
		const encoder = new TextEncoder();
		await this.txCharacteristic.writeValue(encoder.encode(command + '\n'));
		console.log("Sent to micro:bit:", command);
	}

	async move(movement: Movement) {

		const commandMap: Record<Movement, string> = {
			forward: "forward",
			backward: "backward",
			left: "left",
			right: "right"
		};
		await this.sendUART(commandMap[movement] ?? "stop");
	}

	dance(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	speak(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
