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
	let playAudio : HTMLAudioElement | undefined;

	$: processTopCodes(topCodes);

	const notEqualsCheck = (a: number[], b: number[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	async function processTopCodes(topcodes: number[]) {
		// enters pov
		if(mode.value === 'no-awareness'){
			topcodeAudio?.play();
			console.log('in noA');
		}
		else {
			for (let i = 0; i < topcodes.length; i++) {
				console.log(mode.value);
				if (mode.value === 'private') {
						console.log('in PRIVATE');
						// topcodeAudio?.play(); + playtoHeadphones(topcodes[i]);
				}
				else if (mode.value === 'shared') {
						// playtoSpeakers(topcodes[i]);
						console.log('in shared');
				}
			}
		}
	}

	onMount(async () => {
		//navigator.mediaDevices.getUserMedia({ audio: true });
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');
		playAudio = new Audio('/sounds/lucky.wav');

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


	// shared actions and pings
	function playtoSpeakers(code: number){
		if (code === 115 || code === 47){
				//speak
			} else if (code === 155 || code === 589){
				//dance
			} else if (code === 55 || code === 31){
				//forward
			} else if (code === 185 || code === 59){
				//backward
			} else if (code === 205 || code === 61){
				//right
			} else if (code === 285 || code === 79){
				//left
			}
	}

	//play to headphones
	function privateActions(topcodes : number[]){
		for (let i = 0; i < topCodes.length; i++) {
			if (topCodes[i] % 5 === 0){ // Player 1
				switch (topCodes[i]) {
					case 115:
						// speak
						break;
					case 155:
						// fetch(`http://${robotIP}/dance`);
						break;
					case 55:
						// fetch(`http://${robotIP}/move/forward`);
						break;
					case 185:
						// fetch(`http://${robotIP}/move/backward`);
						break;
					case 205:
						// fetch(`http://${robotIP}/move/right`);
						break;
					case 285:
						// fetch(`http://${robotIP}/move/left`);
						break;
				}
			} else {
				switch (topCodes[i]) {
					case 47:
						// speak
						break;
					case 589:
						// fetch(`http://${robotIP}/dance`)
						break;
					case 31:
						// fetch(`http://${robotIP}/move/forward`);
						break;
					case 59:
						// fetch(`http://${robotIP}/move/backward`);
						break;
					case 61:
						// fetch(`http://${robotIP}/move/right`);
						break;
					case 79:
						// fetch(`http://${robotIP}/move/left`);
						break;
				}
			}
	}}

	function play(): void {
		playAudio?.play();
		for (let i = 0; i < topCodes.length; i++) {
			if (topCodes[i] === 115 || topCodes[i] === 47){
				//speak
			} else if (topCodes[i] === 155 || topCodes[i] === 589){
				//dance
				fetch(`http://${robotIP}/dance`);
			} else if (topCodes[i] === 55 || topCodes[i] === 31){
				//forward
				// playtoSpeakers(topCodes[i]);
				fetch(`http://${robotIP}/move/forward`);
			} else if (topCodes[i] === 185 || topCodes[i] === 59){
				//backward
				// playtoSpeakers(topCodes[i]);
				fetch(`http://${robotIP}/move/backward`);
			} else if (topCodes[i] === 205 || topCodes[i] === 61){
				//right
				// playtoSpeakers(topCodes[i]);
				fetch(`http://${robotIP}/move/right`);
			} else if (topCodes[i] === 285 || topCodes[i] === 79){
				//left
				// playtoSpeakers(topCodes[i]);
				fetch(`http://${robotIP}/move/left`);
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
