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
	let blockDancar : HTMLAudioElement | undefined;
	let blockRight : HTMLAudioElement | undefined;
	let blockLeft : HTMLAudioElement | undefined;
	let blockSpeak : HTMLAudioElement | undefined;
	let blockForward : HTMLAudioElement | undefined;
	let blockBack : HTMLAudioElement | undefined;

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
		blockDancar = new Audio('/sounds/bloco_dancar.mp3');
		blockRight = new Audio('/sounds/bloco_direita.mp3');
		blockLeft = new Audio('/sounds/bloco_esquerda.mp3');
		blockSpeak = new Audio('/sounds/bloco_falar.mp3');
		blockForward = new Audio('/sounds/bloco_frente.mp3');
		blockBack = new Audio('/sounds/bloco_tras.mp3');
		audiosInitialized = true;
	}

	$: if (audiosInitialized) {
		if ('setSinkId' in HTMLAudioElement.prototype) {
			switch (mode.value) {
				case 'private':
					blockDancar?.setSinkId(urbanistaId);
					blockRight?.setSinkId(urbanistaId);
					blockLeft?.setSinkId(urbanistaId);
					blockSpeak?.setSinkId(urbanistaId);
					blockForward?.setSinkId(urbanistaId);
					blockBack?.setSinkId(urbanistaId);
					break;
				case 'shared':
					blockDancar?.setSinkId(jblId);
					blockRight?.setSinkId(jblId);
					blockLeft?.setSinkId(jblId);
					blockSpeak?.setSinkId(jblId);
					blockForward?.setSinkId(jblId);
					blockBack?.setSinkId(jblId);
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
			blockSpeak?.play();
		} else if (code === 155 || code === 589){
			//dance block
			blockDancar?.play();
		} else if (code === 55 || code === 31){
			//forward block
			blockForward?.play();
		} else if (code === 185 || code === 59){
			//backward block
			blockBack?.play();
		} else if (code === 205 || code === 61){
			//right block
			blockRight?.play();
		} else if (code === 285 || code === 79){
			//left block
			blockLeft?.play();
		} else if (code === "forward"){
			// robot speak forward
			forwardAudio?.play();
		} else if (code === "backward"){
			// robot speak backward
			backwardAudio?.play();
		} else if (code === "left"){
			// robot speak left
			leftAudio?.play();
		} else if (code === "right"){
			// robot speak right
			rightAudio?.play();
		} else if (code === "dance"){
			// little music
		} else if (code === "speak"){
			// robot speak
		}
	}

	//play to headphones
	function playtoHeadphones(code: number){
		if (code === 115 || code === 47){
				//speak block
				blockSpeak?.play();
			} else if (code === 155 || code === 589){
				//dance block
				blockDancar?.play();
			} else if (code === 55 || code === 31){
				//forward block
				blockForward?.play();
			} else if (code === 185 || code === 59){
				//backward block
				blockBack?.play();
			} else if (code === 205 || code === 61){
				//right block
				blockRight?.play();
			} else if (code === 285 || code === 79){
				//left block
				blockLeft?.play();
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
