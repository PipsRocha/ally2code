<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { labyrinths } from '$lib/labyrinths';
	import { maze } from '$lib/mathmaze';
	import { animalmaze } from '$lib/animalmaze';
	import { RobotState } from '$lib/robot-state.svelte';
	import { ToioRobot } from '$lib/robots';
	import type { Labyrinth, Mode, RobotType, Maze, Animals} from '$lib/types';
	import { notEqualsCheck, playAudio } from '$lib/utils';
	import {
		AudioLines,
		Bot,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		ChevronUp,
		Maximize,
		Music
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	const robotOptions: { label: string; value: RobotType }[] = [
		{ label: 'TOIO', value: 'toio' },
		{ label: 'MICROBIT', value: 'microbit' },
		
	];

	const modeOptions: { label: string; value: Mode }[] = [
		//{ label: 'No Awareness', value: 'no-awareness' },
		//{ label: 'Private', value: 'private' },
		{ label: 'Shared', value: 'shared' }
	];

	const labyrinthOptions: { label: string; value: Labyrinth | Maze | Animals}[] = [
		{ label: 'Training', value: labyrinths.labyrinth_train },

		{ label: 'Maze 1', value: maze.maze_p1 },
		{ label: 'Maze 2', value: maze.maze_p2 },
		{ label: 'Maze 3', value: maze.maze_p3 },
		{ label: 'Maze 4', value: maze.maze_p4 },
		{ label: 'Maze 5', value: maze.maze_p5 },
		{ label: 'Maze 6', value: maze.maze_p6 },
	];

	let selectedRobot: { label: string; value: RobotType } = $state(robotOptions[0]);
	let selectedLabyrinth: { label: string; value: Labyrinth | Maze | Animals} = $state(labyrinthOptions[0]);
	let selectedMode: { label: string; value: Mode } = $state(modeOptions[0]);

	let robotState = $derived(
		new RobotState(selectedRobot.value, selectedLabyrinth.value, selectedMode.value)
	);

	/////////////////////////////////////
let topCodesModule: any;
	let topCodes:{ code: number; angle: number | null } [] = [];
	let tempTopCodes: { code: number; angle: number | null }[] | null = null;

	let audiocurr: HTMLAudioElement | undefined;

	let topcodeAudio: HTMLAudioElement | undefined;
	let playButAudio: HTMLAudioElement | undefined;
	let outAudio: HTMLAudioElement | undefined;

	let leftAudio: HTMLAudioElement | undefined;
	let rightAudio: HTMLAudioElement | undefined;
	let frontAudio: HTMLAudioElement | undefined;
	let backwardAudio: HTMLAudioElement | undefined;
	let danceAudio: HTMLAudioElement | undefined;
	let speakAudio: HTMLAudioElement | undefined;

	let noWayAudio: HTMLAudioElement | undefined;
	let movedRobotAudio: HTMLAudioElement | undefined;

	let blockDancar: HTMLAudioElement | undefined;
	let blockRight: HTMLAudioElement | undefined;
	let blockLeft: HTMLAudioElement | undefined;
	let blockSpeak: HTMLAudioElement | undefined;
	let blockForward: HTMLAudioElement | undefined;
	let blockBack: HTMLAudioElement | undefined;

	let congrats: HTMLAudioElement | undefined;

	let audiosInitialized: boolean = false;

	function initializeAudios() {
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');
		playButAudio = new Audio('/sounds/lucky.wav');
		outAudio = new Audio('/sounds/out_sound.wav');
		congrats = new Audio('/sounds/congrats.wav');

		leftAudio = new Audio('/sounds/andar_esquerda.wav');
		rightAudio = new Audio('/sounds/andar_direita.wav');
		frontAudio = new Audio('/sounds/andar_frente.wav');
		backwardAudio = new Audio('/sounds/andar_tras.wav');
		danceAudio = new Audio('/sounds/dance_robot.wav');
		speakAudio = new Audio('/sounds/robot_speak.wav');

		noWayAudio = new Audio('/sounds/sem_passagem.wav');
		movedRobotAudio = new Audio('/sounds/not_here.wav');

		blockDancar = new Audio('/sounds/bloco_dancar.mp3');
		blockRight = new Audio('/sounds/bloco_direita.mp3');
		blockLeft = new Audio('/sounds/bloco_esquerda.mp3');
		blockSpeak = new Audio('/sounds/bloco_falar.mp3');
		blockForward = new Audio('/sounds/bloco_frente.mp3');
		blockBack = new Audio('/sounds/bloco_tras.mp3');
		audiosInitialized = true;
	}



	async function processTopCodes(topcodes: { code: number; angle: number | null }[],
	oldTopCodes: { code: number; angle: number | null }[]) {
			//topcodeAudio?.play();
			
			console.log('in process');
		
			if (oldTopCodes.length > topcodes.length){
				console.log("list is smaller")
				outAudio?.play();

			} else if (oldTopCodes.length < topcodes.length) {
				
				//const addedTopCodes: number[] = [];
				const addedTopCodes: { code: number; angle: number | null }[] = [];

				const oldCount: Record<string, number> = oldTopCodes.reduce((acc, c) => {
					//const key = code.toString();
					//acc[key] = (acc[key] || 0) + 1;
					acc[c.code] = (acc[c.code] || 0) + 1;
					return acc;
				}, {} as Record<number, number>);

				topcodes.forEach((c) => {
					//const key = code.toString();
					if (!oldCount[c.code]) {
						addedTopCodes.push(c);
					} else {
						oldCount[c.code]--;
					}
				});

				console.log("added " + addedTopCodes);
				for (let tc of addedTopCodes) {
					console.log("going through list");
					console.log(modeOptions[0]);
					topcodeAudio?.play();
					await playSounds(tc.code, tc.angle);
				}
			} 
			
			//const removedTopCodes = oldTopCodes.filter((code) => !topcodes.includes(code)); // not used for now
	
	}


	let lastExecutionTime = 0;
	let lowerRight = 45;
	let upperRight = 135;
	let lowerLeft = -135;
	let upperLeft = -45;
	onMount(async () => {
		navigator.mediaDevices.getUserMedia({ audio: true });
		initializeAudios();

		const { TopCodes } = await import('$lib/topcodes');
		topCodesModule = TopCodes;
		topCodesModule.setVideoFrameCallback('video-canvas', function (jsonString: string) {

			const currentTime = Date.now();
			if (currentTime - lastExecutionTime >= 900) {
				var json = JSON.parse(jsonString);
				//const newTopCodes = json.topcodes.map((c: any) => c.code);
				const newTopCodes = json.topcodes.map((c) => ({
					code: c.code,
					angle: c.angle
				}));


				console.log(json.topcodes);

				// If the topcodes are the same as in the previous "frame" and
				// they are different from the previous topcodes, process them
				if (tempTopCodes && notEqualsCheck(topCodes, newTopCodes)) {
					const oldTopCodes = topCodes;
					topCodes = newTopCodes;
					tempTopCodes = null;
					processTopCodes(topCodes, oldTopCodes);
				} else {
					tempTopCodes = newTopCodes;
				}

				// Update the last execution time
				lastExecutionTime = currentTime;
			}
		});
		topCodesModule.startStopVideoScan('video-canvas');
	});


	// shared actions and pings
async function playSounds(code: number | string, angle: number | null) {
	audiocurr = undefined; // reset before setting

	if (angle == null) {
		switch (code) {
			case 'front': audiocurr = frontAudio; break;
			case 'backward': audiocurr = backwardAudio; break;
			case 'left': audiocurr = leftAudio; break;
			case 'right': audiocurr = rightAudio; break;
			case 'noway': audiocurr = noWayAudio; break;
		}
	} else {
		const degrees = normalizeDegrees((angle * 180) / Math.PI);
		console.log("D: " + degrees.toFixed(2));

		

		if (code === 55 || (code === 31 && degrees >= -45 && degrees < 45)) {
			console.log("→ Forward block");
			audiocurr = blockForward;
		} else if (code== 453 || code === 31 && (degrees >= 135 || degrees < -135)) {
			console.log("→ Backward block");
			audiocurr = blockBack;
		} else if (code === 31 && degrees >= lowerRight && degrees < upperRight) {
			console.log("→ Right block");
			audiocurr = blockRight;
		} else if (code === 31 && degrees >= lowerLeft && degrees < upperLeft) {
			console.log("→ Left block");
			audiocurr = blockLeft;
		}
	}

	if (audiocurr) {
		await playAudio(audiocurr);
	} else {
		console.warn('No audio matched for code:', code, 'angle:', angle);
	}
}


	async function play() {
		console.log(topCodes);
		const topcodetoPlay = topCodes;
		playButAudio?.play();

			for (let tc of topcodetoPlay) {
				if (tc.angle === null) return 'unknown';
				const degrees = normalizeDegrees((tc.angle * 180) / Math.PI);

				if (tc.code == 55 || tc.code == 31 && degrees >= -45 && degrees < 45) {
					await playSounds('front', null);
					robotState.move('forward');

				} else if (tc.code== 453 || (tc.code === 31 && (degrees >= 135 || degrees < -135))) {

					await playSounds('backward', null);
					robotState.move('backward');

				} else if (tc.code === 31 && degrees >= lowerRight && degrees < upperRight) {
					await playSounds('right', null);
					robotState.move("right");

				} else if (tc.code === 31 && degrees >= lowerLeft && degrees < upperLeft) {
					await playSounds('left', null);
					robotState.move("left");
				}
		}

	}
	async function handlekey(e: any) {
		if (e.keyCode == 80){ //p
			console.log("Play Button");
			play();
		}
		if (e.keyCode == 68){ //d
			console.log("On Demand Button");
			//onDemand();
		}

		if (e.keyCode == 70){ //f
			console.log("Reached end");
		congrats?.play(); //Congrats	
		}
		
    }

	function normalizeDegrees(deg: number): number {
		let d = ((deg + 180) % 360) - 180;
		if (d < -180) d += 360;
		return d;
	}

	function inverse() {
		console.log("Inverting");
		if (upperRight == 135 && lowerRight === 45) {
			lowerRight = -135;
			upperRight = -45;

			lowerLeft = 45;
			upperLeft = 135;
		} else {
			lowerRight = 45;
			upperRight = 135;

			lowerLeft = -135;
			upperLeft = -45;
		}

	}


</script>

<svelte:window on:keydown|preventDefault={handlekey} />

<div class="flex h-full flex-col">
	<div class="container flex h-16 flex-row items-center justify-between py-4">
		<div class="flex flex-row items-center gap-x-2">
			<Bot class="mb-px h-8 w-8" />
			<h1 class="text-xl font-bold">Inclusive Robots</h1>
		</div>
		<div class="flex flex-row items-center gap-x-2">
			<Select.Root bind:selected={selectedRobot}>
				<Select.Trigger class="w-48">
					<Select.Value placeholder="Select a robot" />
				</Select.Trigger>
				<Select.Content>
					{#each robotOptions as robot}
						<Select.Item value={robot.value} label={robot.label}>
							{robot.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Button on:click={() => robotState.connect()}>Connect</Button>
			<Button on:click={() => robotState.disconnect()}>Disconnect</Button>
			
				
			<Button on:click={() => inverse()}>Inverse</Button>

		
			<Select.Root bind:selected={selectedLabyrinth}>
				<Select.Trigger class="w-48">
					<Select.Value placeholder="Select a puzzle" />
				</Select.Trigger>
				<Select.Content>
					{#each labyrinthOptions as map}
						<Select.Item value={map.value} label={map.label} on:click={() => {}}>
							{map.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<Separator />
	<div class="flex flex-1 items-center justify-center">
		<canvas id="video-canvas" height="480" width="480"></canvas>
		
		
	</div>
	<div class="my-10 flex flex-1 flex-col items-center justify-center gap-y-10">
		<div class="grid">
			{#each robotState.map.matrix as row, y}
				<div class="flex">
					{#each row as cell, x}
						<div
							class="flex h-8 w-8 items-center justify-center border border-border"
							class:bg-muted={cell === 0}
						>
							{#if robotState.position.x === x && robotState.position.y === y}
								<div
									class="text-xl"
									style="transform: rotate({robotState.orientation === 'north'
										? '0deg'
										: robotState.orientation === 'east'
											? '90deg'
											: robotState.orientation === 'south'
												? '180deg'
												: '270deg'});"
								>
									↑
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="grid grid-cols-3 gap-4">
			<Button size="icon" variant="outline" on:click={() => robotState.speak()}>
				<AudioLines class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robotState.move('forward')}>
				<ChevronUp class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robotState.dance()}>
				<Music class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robotState.move('left')}>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robotState.move('backward')}>
				<ChevronDown class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robotState.move('right')}>
				<ChevronRight class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
