<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import type { Mode, TopCode } from '$lib/types';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';


	const modes: { label: string; value: Mode }[] = [
		{ label: 'No Awareness', value: 'no-awareness' },
		{ label: 'Private', value: 'private' },
		{ label: 'Shared', value: 'shared' }
	];

	let mode: { label: string; value: Mode } = modes[0];
	let robotIP: string = '127.0.0.1:5000';

	let topCodesModule: any;
	let topCodes: number[] = [];
	let topcodeAudio : HTMLAudioElement | undefined;
	//const audio1 = new Audio('/sounds/1.wav');

	$: processTopCodes(topCodes);

	const notEqualsCheck = (a: number[], b: number[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	async function processTopCodes(topcodes: number[]) {
		// enters pov
		if(mode.value === 'no-awareness'){
			playtoSpeakers(1);
			console.log('in noA');
		}
		else {
			for (let i = 0; i < topcodes.length; i++) {
				console.log(mode.value);
				if (mode.value === 'private') {
						console.log('in PRIVATE');
						// playtoSpeakers(1) + playtoHeadphones(topcodes[i]);
				}
				else if (mode.value === 'shared') {
						// playtoSpeakers(topcodes[i]);
						console.log('in shared');
				}
			}
		}
	}

	onMount(async () => {
		navigator.mediaDevices.getUserMedia({ audio: true });
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');

		const { TopCodes } = await import('$lib/topcodes');
		topCodesModule = TopCodes;
		topCodesModule.setVideoFrameCallback('video-canvas', function (jsonString: string) {
			var json = JSON.parse(jsonString);
			const newTopCodes = json.topcodes.map((c: any) => c.code);
			if (notEqualsCheck(topCodes, newTopCodes)) {
				topCodes = newTopCodes;
			}
			//topCodes = json.topcodes;
		});
		topCodesModule.startStopVideoScan('video-canvas');
	});

	function checkOutputs() {
        navigator.mediaDevices.getUserMedia({ audio: true });
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            devices.forEach(function (device) {
                console.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId);
            });
        });
    }

	function playRobotSound(arg1: number, angle = 0) {
		if( arg1 === 115) {
			//say something

		} else if( arg1 === 589) {
			// dance sound

		} else if( arg1 === 31) {
			switch(angle){
				case 1:
					// sound for forward
					break;
				case 2:
					// sound for backward
					break;
				case 3:
					// sound for left
					break;
				case 4:
					// sound for right
					break;
			}
		}
	}

	function playtoSpeakers(code: number){
		switch(code){
				case 1:
				topcodeAudio?.play();
					// earcon
					break;
				case 115:
					// sound for speak
					break;
				case 31:
					// sound for move
					break;
				case 589:
					// sound for dance
					break;
			}
	}

	function playtoHeadphones(code: number){
		switch(code){
				case 115:
					// sound for speak
					break;
				case 31:
					// sound for move
					break;
				case 589:
					// sound for dance
					break;
			}

	}

	function play(): void {
		topcodeAudio?.play();
		for (let i = 0; i < topCodes.length; i++) {
			if( topCodes[i] === 115) {
				// playRobotSound(topCodes[i]);
				// fetch(`http://${robotIP}/speak`)
			} else if( topCodes[i] === 589) {
				// playRobotSound(topCodes[i]);
				// fetch(`http://${robotIP}/dance`)
			} else if( topCodes[i] === 31) {
				// playRobotSound(topCodes[i]);
				// fetch(`http://${robotIP}/move/forward`)
			}
		}
	}
</script>

<div class="flex h-full flex-col">
	<div class="container flex h-16 flex-row items-center justify-between py-4">
		<h1 class="text-xl font-bold">Inclusive Robots</h1>
		<div class="flex flex-row items-center gap-x-2">
			<Button on:click={()=>fetch(`http://${robotIP}/connect`)}>
				Connect to toio
			</Button>
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
			<Input class="w-48" bind:value={robotIP} placeholder="192.168.1.1" />
			<Button on:click={checkOutputs}>Devices</Button>
			<Button on:click={play}> PLAY </Button>
		</div>
	</div>
	<Separator />
	<div class="flex flex-1 flex-row overflow-y-auto">
		<canvas id="video-canvas" width="600" height="600"></canvas>
		<div class="ml-auto h-[800px] w-96">
			<pre>{JSON.stringify(topCodes, null, 2)}</pre>
		</div>
	</div>
</div>
