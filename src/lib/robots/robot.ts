import type { Movement } from '$lib/types';

export abstract class Robot {
	abstract connect(): Promise<void>;
	abstract disconnect(): Promise<void>;
	abstract canMove(movement: Movement): Promise<boolean>;
	abstract move(movement: Movement): Promise<void>;
	abstract dance(): Promise<void>;
	abstract speak(): Promise<void>;
}
