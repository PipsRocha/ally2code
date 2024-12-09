<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { labyrinths } from '$lib/labyrinths';
	import { DashRobot, MicrobitRobot, ToioRobot, type Robot } from '$lib/robots';
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

	const robotOptions: { label: string; value: RobotType }[] = [
		{ label: 'TOIO', value: 'toio' },
		{ label: 'MICROBIT', value: 'microbit' },
		{ label: 'DASH', value: 'dash' }
	];

	const modeOptions: { label: string; value: Mode }[] = [
		{ label: 'No Awareness', value: 'no-awareness' },
		{ label: 'Private', value: 'private' },
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

	let selectedRobot: { label: string; value: RobotType } = robotOptions[0];
	let selectedLabyrinth: { label: string; value: Labyrinth } = labyrinthOptions[0];
	let selectedMode: { label: string; value: Mode } = modeOptions[0];

	let robot: Robot;
	$: {
		if (selectedRobot.value === 'toio') {
			robot = new ToioRobot();
		} else if (selectedRobot.value === 'microbit') {
			robot = new MicrobitRobot();
		} else if (selectedRobot.value === 'dash') {
			robot = new DashRobot();
		}
	}
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
			<Button on:click={() => robot.connect()}>Connect</Button>
			<Button on:click={() => robot.disconnect()}>Disconnect</Button>
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
		<div class="my-10 grid grid-cols-3 gap-4">
			<Button size="icon" variant="outline" on:click={() => robot.speak()}>
				<AudioLines class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robot.move('forward')}>
				<ChevronUp class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robot.dance()}>
				<Music class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robot.move('left')}>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robot.move('backward')}>
				<ChevronDown class="h-4 w-4" />
			</Button>
			<Button size="icon" variant="outline" on:click={() => robot.move('right')}>
				<ChevronRight class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
