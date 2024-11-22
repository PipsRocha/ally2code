<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { DashRobot, MicrobitRobot, ToioRobot } from '$lib/robots';
	import type { Labyrinth, Mode } from '$lib/types';
	import { onMount } from 'svelte';

	const modes: { label: string; value: Mode }[] = [
		{ label: 'No Awareness', value: 'no-awareness' },
		{ label: 'Private', value: 'private' },
		{ label: 'Shared', value: 'shared' }
	];

	const labyrinths: { label: string; value: Labyrinth }[] = [
		{ label: 'Training', value: 'labyrinth_train' },
		{ label: 'Puzzle 1', value: 'labyrinth_p1' },
		{ label: 'Puzzle 2', value: 'labyrinth_p2' },
		{ label: 'Puzzle 3', value: 'labyrinth_p3' },
		{ label: 'Puzzle 4', value: 'labyrinth_p4' },
		{ label: 'Puzzle 5', value: 'labyrinth_p5' },
		{ label: 'Puzzle 6', value: 'labyrinth_p6' }
	];

	let mode: { label: string; value: Mode } = modes[0];
	let lab: { label: string; value: Labyrinth } = labyrinths[0];

	let microbit: MicrobitRobot;
	let toio: ToioRobot;
	let dash: DashRobot;

	onMount(async () => {
		microbit = new MicrobitRobot();
		toio = new ToioRobot();
		dash = new DashRobot();
	});
</script>

<div class="flex h-full flex-col">
	<div class="container flex h-16 flex-row items-center justify-between py-4">
		<h1 class="text-xl font-bold">Inclusive Robots</h1>
		<div class="flex flex-row items-center gap-x-2">
			<Button on:click={() => toio.discover()}>TOIO</Button>
			<Button on:click={() => microbit.discover()}>MICROBIT</Button>
			<Button on:click={() => dash.discover()}>DASH</Button>
			<Select.Root bind:selected={mode}>
				<Select.Trigger class="w-48">
					<Select.Value placeholder="Select a mode" />
				</Select.Trigger>
				<Select.Content>
					{#each modes as mode}
						<Select.Item value={mode.value} label={mode.label}>{mode.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Select.Root bind:selected={lab}>
				<Select.Trigger class="w-48">
					<Select.Value placeholder="Select a puzzle" />
				</Select.Trigger>
				<Select.Content>
					{#each labyrinths as lab}
						<Select.Item value={lab.value} label={lab.label} on:click={() => {}}>
							{lab.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<Separator />
	<div class="flex flex-1 items-center justify-center"></div>
</div>
