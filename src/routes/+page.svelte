<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { labyrinths } from '$lib/labyrinths';
	import { RobotState } from '$lib/robot-state.svelte';
	import type { Labyrinth, Mode, RobotType } from '$lib/types';
	import {
		AudioLines,
		Bot,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		ChevronUp,
		Music
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	const robotOptions: { label: string; value: RobotType }[] = [
		{ label: 'TOIO', value: 'toio' },
		{ label: 'MICROBIT', value: 'microbit' },
		{ label: 'DASH', value: 'dash' }
	];

	const modeOptions: { label: string; value: Mode }[] = [
		//{ label: 'No Awareness', value: 'no-awareness' },
		//{ label: 'Private', value: 'private' },
		{ label: 'Shared', value: 'shared' }
	];

	const labyrinthOptions: { label: string; value: Labyrinth }[] = [
		{ label: 'Training', value: labyrinths.labyrinth_train },
		{ label: 'Puzzle 1', value: labyrinths.labyrinth_p1 },
		{ label: 'Puzzle 2', value: labyrinths.labyrinth_p2 },
		{ label: 'Puzzle 3', value: labyrinths.labyrinth_p3 },
		{ label: 'Puzzle 4', value: labyrinths.labyrinth_p4 },
		{ label: 'Puzzle 5', value: labyrinths.labyrinth_p5 },
		{ label: 'Puzzle 6', value: labyrinths.labyrinth_p6 }
	];

	let selectedRobot: { label: string; value: RobotType } = $state(robotOptions[0]);
	let selectedLabyrinth: { label: string; value: Labyrinth } = $state(labyrinthOptions[0]);
	let selectedMode: { label: string; value: Mode } = $state(modeOptions[0]);

	let robotState = $derived(
		new RobotState(selectedRobot.value, selectedLabyrinth.value, selectedMode.value)
	);

	let topCodesModule: any;
	let topCodes: number[] = [];
	let tempTopCodes: number[] | null = null;

	async function processTopCodes(topcodes: number[], oldTopCodes: number[]) {
		
		const addedTopCodes = topcodes.filter((code) => !oldTopCodes.includes(code));
		//const removedTopCodes = oldTopCodes.filter((code) => !topcodes.includes(code)); // not used for now
		
		for (let i = 0; i < addedTopCodes.length; i++) {
			console.log(modeOptions[0]);
			//topcodeAudio?.play();
			//await playSounds(addedTopCodes[i]);
		}
	}
	


	let lastExecutionTime = 0;
	onMount(async () => {
		//navigator.mediaDevices.getUserMedia({ audio: true });
		//initializeAudios();

		const { TopCodes } = await import('$lib/topcodes');
		topCodesModule = TopCodes;
		topCodesModule.setVideoFrameCallback('video-canvas', function (jsonString: string) {
			const currentTime = Date.now();
			if (currentTime - lastExecutionTime >= 900) {
				var json = JSON.parse(jsonString);
				const newTopCodes = json.topcodes.map((c: any) => c.code);

				// If the topcodes are the same as in the previous "frame" and
				// they are different from the previous topcodes, process them
				if (
					tempTopCodes &&
					//equalsCheck(tempTopCodes, newTopCodes) &&
					//notEqualsCheck(topCodes, newTopCodes)
					console.log("Equals Check")
				) {
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
</script>

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
					{#each labyrinthOptions as labyrinth}
						<Select.Item value={labyrinth.value} label={labyrinth.label} on:click={() => {}}>
							{labyrinth.label}
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
			{#each robotState.labyrinth.matrix as row, y}
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
