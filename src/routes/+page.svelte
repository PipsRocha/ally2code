<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import type { Mode } from '$lib/types';
	import { onMount } from 'svelte';


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
	let leftAudio: HTMLAudioElement | undefined;
	let rightAudio : HTMLAudioElement | undefined;
	let forwardAudio : HTMLAudioElement | undefined;
	let	backwardAudio : HTMLAudioElement | undefined;
	let audiosInitialized: boolean = false;
	let urbanistaId = 'c85a0b94138e7a55dddb182f2b9bca9153c4b874b1e567e46c17a4edc2b0a951';
	let jblId = '399953c8604d26bb8193f9ca003da9ca9242da85f6dfcdf303bcffa34d604ac2';

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
						if (topcodes[i]%5 === 0) {
							topcodeAudio?.play();
							playtoHeadphones(topcodes[i]);
						} else{
							playtoHeadphones(topcodes[i]);
						}
				}
				else if (mode.value === 'shared') {
						playtoSpeakers(topcodes[i]);
						console.log('in shared');
				}
			}
		}
	}

	function initializeAudios(){
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');
		playAudio = new Audio('/sounds/lucky.wav');
		leftAudio = new Audio('/sounds/esquerda.wav');
		rightAudio = new Audio('/sounds/direita.wav');
		forwardAudio = new Audio('/sounds/frente.wav');
		backwardAudio = new Audio('/sounds/tras.wav');
		audiosInitialized = true;
	}

	$: if (audiosInitialized) {
		if ('setSinkId' in HTMLAudioElement.prototype) {
			switch (mode.value) {
				case 'private':
					//audioBlock?.setSinkId(urbanistaId);
					break;
				case 'shared':
					//audioBlock?.setSinkId(jblId);
					break;
			}
		}
	}


	onMount(async () => {
		//navigator.mediaDevices.getUserMedia({ audio: true });
		initializeAudios();

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
	function playtoSpeakers(code : number | string){
		if (code === 115 || code === 47){
				//speak block
		} else if (code === 155 || code === 589){
			//dance block
		} else if (code === 55 || code === 31){
			//forward block
		} else if (code === 185 || code === 59){
			//backward block
		} else if (code === 205 || code === 61){
			//right block
		} else if (code === 285 || code === 79){
			topcodeAudio?.play();
			//left block
		} else if (code === "forward"){
			// robot speak forward
			forwardAudio?.play();
		} else if (code === "bacward"){
			// robot speak backward
			backwardAudio?.play();
		} else if (code === "left"){
			// robot speak left
			leftAudio?.play();
		} else if (code === "right"){
			// robot speak right
			rightAudio?.play();
		} else if (code === "dance"){
			// // robot speak
		} else if (code === "speak"){
			// little music
		}
	}

	//play to headphones
	function playtoHeadphones(code: number){
		if (code === 115 || code === 47){
				//speak block
			} else if (code === 155 || code === 589){
				//dance block
			} else if (code === 55 || code === 31){
				//forward block
			} else if (code === 185 || code === 59){
				//backward block
			} else if (code === 205 || code === 61){
				//right block
			} else if (code === 285 || code === 79){
				//left block	
	}
}

	function play(): void {
		playAudio?.play();
		for (let i = 0; i < topCodes.length; i++) {
			if (topCodes[i] === 115 || topCodes[i] === 47){
				playtoSpeakers("speak");
			} else if (topCodes[i] === 155 || topCodes[i] === 589){
				playtoSpeakers("dance");
				fetch(`http://${robotIP}/dance`);
			} else if (topCodes[i] === 55 || topCodes[i] === 31){
				playtoSpeakers("forward");
				fetch(`http://${robotIP}/move/forward`);
			} else if (topCodes[i] === 185 || topCodes[i] === 59){
				playtoSpeakers("backward");
				fetch(`http://${robotIP}/move/backward`);
			} else if (topCodes[i] === 205 || topCodes[i] === 61){
				playtoSpeakers("right");
				fetch(`http://${robotIP}/move/right`);
			} else if (topCodes[i] === 285 || topCodes[i] === 79){
				playtoSpeakers("left");
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
	<div class="flex-1 flex items-center justify-center">
		<canvas id="video-canvas" height="480" width="640"></canvas>
		<div class="ml-auto h-[800px] w-96">
			<pre>{JSON.stringify(topCodes, null, 2)}</pre>
		</div>
	</div>
</div>
