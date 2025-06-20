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

		{ label: 'Habitat Pinguim', value: animalmaze.habitat_p},
		{ label: 'Habitat Tartaruga', value: animalmaze.habitat_t},
		{ label: 'Habitat Urso', value: animalmaze.habitat_u},
		{ label: 'Habitat Vaca', value: animalmaze.habitat_v},
		{ label: 'Habitat Baleia', value: animalmaze.habitat_b},
		{ label: 'Habitat Elefante', value: animalmaze.habitat_e},

		{ label: 'Característica Pinguim', value: animalmaze.fur_p },
		{ label: 'Característica Tartaruga', value: animalmaze.fur_t},
		{ label: 'Característica Urso', value: animalmaze.fur_u},
		{ label: 'Característica Vaca', value: animalmaze.fur_v},
		{ label: 'Característica Baleia', value: animalmaze.fur_b},
		{ label: 'Característica Elefante', value: animalmaze.fur_e},

		{ label: 'Alimentação Pinguim', value: animalmaze.food_p },
		{ label: 'Alimentação Tartaruga', value: animalmaze.food_t},
		{ label: 'Alimentação Urso', value: animalmaze.food_u},
		{ label: 'Alimentação Vaca', value: animalmaze.food_v},
		{ label: 'Alimentação Baleia', value: animalmaze.food_b},
		{ label: 'Alimentação Elefante', value: animalmaze.fod_e},
	];

	let selectedRobot: { label: string; value: RobotType } = $state(robotOptions[0]);
	let selectedLabyrinth: { label: string; value: Labyrinth | Maze | Animals} = $state(labyrinthOptions[0]);
	let selectedMode: { label: string; value: Mode } = $state(modeOptions[0]);

	let robotState = $derived(
		new RobotState(selectedRobot.value, selectedLabyrinth.value, selectedMode.value)
	);

	/////////////////////////////////////
let topCodesModule: any;
	let topCodes: number[] = [];
	let tempTopCodes: number[] | null = null;

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

	let audiosInitialized: boolean = false;

	function initializeAudios() {
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');
		playButAudio = new Audio('/sounds/lucky.wav');
		outAudio = new Audio('/sounds/out_sound.wav');

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



	async function processTopCodes(topcodes: number[], oldTopCodes: number[]) {
			//topcodeAudio?.play();
			console.log('in process');
		
			if (oldTopCodes.length > topcodes.length){
				console.log("list is smaller")
				outAudio?.play();
			} else if (oldTopCodes.length < topcodes.length) {
				
				const addedTopCodes: number[] = [];

				const oldCount: Record<string, number> = oldTopCodes.reduce((acc, code) => {
					const key = code.toString();
					acc[key] = (acc[key] || 0) + 1;
					return acc;
				}, {} as Record<string, number>);

				topcodes.forEach((code) => {
					const key = code.toString();
					if (!oldCount[key]) {
						addedTopCodes.push(code);
					} else {
						oldCount[key]--;
					}
				});

				console.log("added " + addedTopCodes);
				for (let i = 0; i < addedTopCodes.length; i++) {
					console.log("going through list");
					console.log(modeOptions[0]);
					topcodeAudio?.play();
					await playSounds(addedTopCodes[i]);
				}
			} else {
				for (let i = 0; i < topCodes.length; i++) {
					console.log("going through list");
					console.log(modeOptions[0]);
					topcodeAudio?.play();
					await playSounds(topCodes[i]);
				}
			}
			
			//const removedTopCodes = oldTopCodes.filter((code) => !topcodes.includes(code)); // not used for now
			
			
	}


	let lastExecutionTime = 0;
	onMount(async () => {
		navigator.mediaDevices.getUserMedia({ audio: true });
		initializeAudios();

		const { TopCodes } = await import('$lib/topcodes');
		topCodesModule = TopCodes;
		topCodesModule.setVideoFrameCallback('video-canvas', function (jsonString: string) {

			const currentTime = Date.now();
			if (currentTime - lastExecutionTime >= 900) {
				var json = JSON.parse(jsonString);
				const newTopCodes = json.topcodes.map((c: any) => c.code);

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
	async function playSounds(code: number | string) {
		switch (code) {
			
			case 47:
				audiocurr = blockSpeak;
				break;
			
			case 589:
				audiocurr = blockDancar;
				break;
			
			case 31:
				audiocurr = blockForward;
				break;
			
			case 59:
				audiocurr = blockBack;
				break;
			
			case 61:
				audiocurr = blockRight;
				break;
			
			case 79:
				audiocurr = blockLeft;
				break;
			case 'front':
				audiocurr = frontAudio;
				break;
			case 'backward':
				audiocurr = backwardAudio;
				break;
			case 'left':
				audiocurr = leftAudio;
				break;
			case 'right':
				audiocurr = rightAudio;
				break;
			case 'dance':
				audiocurr = danceAudio;
				break;
			case 'speak':
				audiocurr = speakAudio;
				break;
			case 'noway':
				audiocurr = noWayAudio;
				break;
			case 'movedme':
			audiocurr = movedRobotAudio;
			break;
		}

		if (audiocurr) {
			await playAudio(audiocurr);
		}
	}

	async function play() {
		console.log(topCodes);
		const topcodetoPlay = topCodes;
		playButAudio?.play();

			for (let i = 0; i < topcodetoPlay.length+1; i++) {
			if (topcodetoPlay[i] === 115 || topcodetoPlay[i] === 47) {
				await playSounds('speak');

			} else if (topcodetoPlay[i] === 155 || topcodetoPlay[i] === 589) {
				await playSounds('dance');

			} else if (topcodetoPlay[i] === 55 || topcodetoPlay[i] === 31) {
				robotState.move('forward');
				playSounds('front');

			} else if (topcodetoPlay[i] === 185 || topcodetoPlay[i] === 59) {
				playSounds('backward');
				robotState.move('backward');

			} else if (topcodetoPlay[i] === 205 || topcodetoPlay[i] === 61) {
				playSounds('right');
				robotState.move("right");

			} else if (topcodetoPlay[i] === 285 || topcodetoPlay[i] === 79) {
				playSounds('left');
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
		if (e.keyCode == 77){ //m
			console.log("Moved Robot");
			await playSounds("movedme");
		}
		if (e.keyCode == 85){ //u
			if(robotOptions[0].value == "toio"){
				//updateRobotPosition();

			}
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
			<Select.Root bind:selected={selectedMode}>
				<Select.Trigger class="w-48">
					<Select.Value placeholder="Select a mode" />
				</Select.Trigger>
				<Select.Content>
					{#each modeOptions as mode}
						<Select.Item value={mode.value} label={mode.label}>{mode.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
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
