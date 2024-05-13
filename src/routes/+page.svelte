<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import type { Mode } from '$lib/types';
	import { notEqualsCheck, playAudio } from '$lib/utils';
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

	let audiocurr: HTMLAudioElement | undefined;

	let topcodeAudio: HTMLAudioElement | undefined;
	let playButAudio: HTMLAudioElement | undefined;
	let leftAudio: HTMLAudioElement | undefined;
	let rightAudio: HTMLAudioElement | undefined;
	let forwardAudio: HTMLAudioElement | undefined;
	let backwardAudio: HTMLAudioElement | undefined;

	let blockDancar: HTMLAudioElement | undefined;
	let blockRight: HTMLAudioElement | undefined;
	let blockLeft: HTMLAudioElement | undefined;
	let blockSpeak: HTMLAudioElement | undefined;
	let blockForward: HTMLAudioElement | undefined;
	let blockBack: HTMLAudioElement | undefined;

	let blockDancarP2: HTMLAudioElement | undefined;
	let blockRightP2: HTMLAudioElement | undefined;
	let blockLeftP2: HTMLAudioElement | undefined;
	let blockSpeakP2: HTMLAudioElement | undefined;
	let blockForwardP2: HTMLAudioElement | undefined;
	let blockBackP2: HTMLAudioElement | undefined;

	let audiosInitialized: boolean = false;

	let urbanistaId = 'c85a0b94138e7a55dddb182f2b9bca9153c4b874b1e567e46c17a4edc2b0a951';
	let phonesId = '399953c8604d26bb8193f9ca003da9ca9242da85f6dfcdf303bcffa34d604ac2'; //SWITCH BACK
	let jblId = '20fbf631595a2899481151da2842a8a352b84700d52e318e51a4ceb1979efa67'; //SWITCH BACK

	async function processTopCodes(topcodes: number[], oldTopCodes: number[]) {
		// enters pov
		if (mode.value === 'no-awareness') {
			topcodeAudio?.play();
			console.log('in noA');
		} else {
			const addedTopCodes = topcodes.filter((code) => !oldTopCodes.includes(code));
			for (let i = 0; i < addedTopCodes.length; i++) {
				console.log(mode.value);
				if (mode.value === 'private') {
					console.log('in PRIVATE');
					if (addedTopCodes[i] % 5 === 0) {
						topcodeAudio?.play();
						await playSounds(addedTopCodes[i]);
					} else {
						await playSounds(addedTopCodes[i]);
					}
				} else if (mode.value === 'shared') {
					await playSounds(addedTopCodes[i]);
					console.log('in shared');
				}
			}
		}
	}

	function initializeAudios() {
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');
		playButAudio = new Audio('/sounds/lucky.wav');

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

		blockDancarP2 = new Audio('/sounds/bloco_dancar_2.mp3');
		blockRightP2 = new Audio('/sounds/bloco_direita_2.mp3');
		blockLeftP2 = new Audio('/sounds/bloco_esquerda_2.mp3');
		blockSpeakP2 = new Audio('/sounds/bloco_falar_2.mp3');
		blockForwardP2 = new Audio('/sounds/bloco_frente_2.mp3');
		blockBackP2 = new Audio('/sounds/bloco_tras_2.mp3');

		audiosInitialized = true;
	}

	$: if (audiosInitialized) {
		if ('setSinkId' in HTMLAudioElement.prototype) {
			switch (mode.value) {
				case 'no-awareness':
					topcodeAudio?.setSinkId(jblId);
					playButAudio?.setSinkId(jblId);
					break;
				case 'private':
					topcodeAudio?.setSinkId(jblId);
					playButAudio?.setSinkId(jblId);

					blockDancar?.setSinkId(urbanistaId);
					blockRight?.setSinkId(urbanistaId);
					blockLeft?.setSinkId(urbanistaId);
					blockSpeak?.setSinkId(urbanistaId);
					blockForward?.setSinkId(urbanistaId);
					blockBack?.setSinkId(urbanistaId);

					blockDancarP2?.setSinkId(urbanistaId);
					blockRightP2?.setSinkId(urbanistaId);
					blockLeftP2?.setSinkId(urbanistaId);
					blockSpeakP2?.setSinkId(urbanistaId);
					blockForwardP2?.setSinkId(urbanistaId);
					blockBackP2?.setSinkId(urbanistaId);
					break;
				case 'shared':
					playButAudio?.setSinkId(jblId);
					blockDancar?.setSinkId(jblId);
					blockRight?.setSinkId(jblId);
					blockLeft?.setSinkId(jblId);
					blockSpeak?.setSinkId(jblId);
					blockForward?.setSinkId(jblId);
					blockBack?.setSinkId(jblId);

					blockDancarP2?.setSinkId(jblId);
					blockRightP2?.setSinkId(jblId);
					blockLeftP2?.setSinkId(jblId);
					blockSpeakP2?.setSinkId(jblId);
					blockForwardP2?.setSinkId(jblId);
					blockBackP2?.setSinkId(jblId);
					break;
			}
		}
	}

	let lastExecutionTime = 0;
	onMount(async () => {
		//navigator.mediaDevices.getUserMedia({ audio: true });
		initializeAudios();

		const { TopCodes } = await import('$lib/topcodes');
		topCodesModule = TopCodes;
		topCodesModule.setVideoFrameCallback('video-canvas', function (jsonString: string) {
			const currentTime = Date.now();
			if (currentTime - lastExecutionTime >= 1000) {
				var json = JSON.parse(jsonString);
				const newTopCodes = json.topcodes.map((c: any) => c.code);
				if (notEqualsCheck(topCodes, newTopCodes)) {
					const oldTopCodes = topCodes;
					topCodes = newTopCodes;
					processTopCodes(topCodes, oldTopCodes);
				}
				// Update the last execution time
				lastExecutionTime = currentTime;
			}
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
	async function playSounds(code: number | string) {
		switch (code) {
			case 115:
				audiocurr = blockSpeakP2;
				break;
			case 47:
				audiocurr = blockSpeak;
				break;
			case 155:
				audiocurr = blockDancarP2;
				break;
			case 589:
				audiocurr = blockDancar;
				break;
			case 55:
				audiocurr = blockForwardP2;
				break;
			case 31:
				audiocurr = blockForward;
				break;
			case 185:
				audiocurr = blockBackP2;
				break;
			case 59:
				audiocurr = blockBack;
				break;
			case 205:
				audiocurr = blockRightP2;
				break;
			case 61:
				audiocurr = blockRight;
				break;
			case 285:
				audiocurr = blockLeftP2;
				break;
			case 79:
				audiocurr = blockLeft;
				break;
			case 'forward':
				audiocurr = forwardAudio;
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
				// little music
				break;
			case 'speak':
				// robot speak
				break;
		}

		if (audiocurr) {
			await playAudio(audiocurr);
		}
	}

	async function play() {
		topCodesModule.startStopVideoScan();
		playButAudio?.play();

		for (let i = 0; i < topCodes.length; i++) {
			if (topCodes[i] === 115 || topCodes[i] === 47) {
				await Promise.all([playSounds('speak'), fetch(`http://${robotIP}/speak`)]);
			} else if (topCodes[i] === 155 || topCodes[i] === 589) {
				await Promise.all([playSounds('dance'), fetch(`http://${robotIP}/dance`)]);
			} else if (topCodes[i] === 55 || topCodes[i] === 31) {
				await Promise.all([playSounds('forward'), fetch(`http://${robotIP}/move/forward`)]);
			} else if (topCodes[i] === 185 || topCodes[i] === 59) {
				await Promise.all([playSounds('backward'), fetch(`http://${robotIP}/move/backward`)]);
			} else if (topCodes[i] === 205 || topCodes[i] === 61) {
				await Promise.all([playSounds('right'), fetch(`http://${robotIP}/move/right`)]);
			} else if (topCodes[i] === 285 || topCodes[i] === 79) {
				await Promise.all([playSounds('left'), fetch(`http://${robotIP}/move/left`)]);
			}
		}
		topCodesModule.startStopVideoScan();
	}
</script>

<div class="flex h-full flex-col">
	<div class="container flex h-16 flex-row items-center justify-between py-4">
		<h1 class="text-xl font-bold">Inclusive Robots</h1>
		<div class="flex flex-row items-center gap-x-2">
			<Button on:click={() => fetch(`http://${robotIP}/connect`)}>Connect to toio</Button>
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
			<Button on:click={play}>PLAY</Button>
		</div>
	</div>
	<Separator />
	<div class="flex flex-1 items-center justify-center">
		<canvas id="video-canvas" height="480" width="640"></canvas>
		<div class="ml-auto h-[800px] w-96">
			<pre>{JSON.stringify(topCodes, null, 2)}</pre>
		</div>
	</div>
</div>
