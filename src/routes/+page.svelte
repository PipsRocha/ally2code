<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import type { Mode } from '$lib/types';
	import type { Labyrinth } from '$lib/types';
	import { notEqualsCheck, playAudio } from '$lib/utils';
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

	let robotIP: string = '127.0.0.1:5000';

	let topCodesModule: any;
	let topCodes: number[] = [];
	let lastTopcodes: number[] = [];

	let audiocurr: HTMLAudioElement | undefined;

	let topcodeAudio: HTMLAudioElement | undefined;
	//let playButAudio: HTMLAudioElement | undefined;
	let outAudio: HTMLAudioElement | undefined;

	let leftAudio: HTMLAudioElement | undefined;
	let rightAudio: HTMLAudioElement | undefined;
	let frontAudio: HTMLAudioElement | undefined;
	let backwardAudio: HTMLAudioElement | undefined;
	let danceAudio: HTMLAudioElement | undefined;
	let speakAudio: HTMLAudioElement | undefined;
	let noWayAudio: HTMLAudioElement | undefined;

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
	let phonesId = '20fbf631595a2899481151da2842a8a352b84700d52e318e51a4ceb1979efa67';
	let jblId = "399953c8604d26bb8193f9ca003da9ca9242da85f6dfcdf303bcffa34d604ac2";

	function initializeAudios() {
		topcodeAudio = new Audio('/sounds/cartoon_wink.wav');
		//playButAudio = new Audio('/sounds/lucky.wav');
		outAudio = new Audio('/sounds/out_sound.wav');

		leftAudio = new Audio('/sounds/andar_esquerda.wav');
		rightAudio = new Audio('/sounds/andar_direita.wav');
		frontAudio = new Audio('/sounds/andar_frente.wav');
		backwardAudio = new Audio('/sounds/andar_tras.wav');
		danceAudio = new Audio('/sounds/dance_robot.wav');
		speakAudio = new Audio('/sounds/robot_speak.wav');
		noWayAudio = new Audio('/sounds/sem_passagem.wav');

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

	function blocks_setSink(deviceId : string){
		blockDancar?.setSinkId(deviceId);
		blockRight?.setSinkId(deviceId);
		blockLeft?.setSinkId(deviceId);
		blockSpeak?.setSinkId(deviceId);
		blockForward?.setSinkId(deviceId);
		blockBack?.setSinkId(deviceId);

		blockDancarP2?.setSinkId(deviceId);
		blockRightP2?.setSinkId(deviceId);
		blockLeftP2?.setSinkId(deviceId);
		blockSpeakP2?.setSinkId(deviceId);
		blockForwardP2?.setSinkId(deviceId);
		blockBackP2?.setSinkId(deviceId);
	}

	$: if (audiosInitialized) {
		if ('setSinkId' in HTMLAudioElement.prototype) {
			leftAudio?.setSinkId(phonesId);
			rightAudio?.setSinkId(phonesId);
			frontAudio?.setSinkId(phonesId);
			backwardAudio?.setSinkId(phonesId);
			danceAudio?.setSinkId(phonesId);
			speakAudio?.setSinkId(phonesId);
			noWayAudio?.setSinkId(phonesId);

			//playButAudio?.setSinkId(phonesId);
			outAudio?.setSinkId(phonesId);
			topcodeAudio?.setSinkId(phonesId);

			switch (mode.value) {
				case 'private':
					//playButAudio?.setSinkId(phonesId);
					outAudio?.setSinkId(phonesId);
					topcodeAudio?.setSinkId(phonesId);

					blocks_setSink(urbanistaId);
					break;
				case 'shared':
					//playButAudio?.setSinkId(phonesId);
					outAudio?.setSinkId(phonesId);
					topcodeAudio?.setSinkId(phonesId);

					blocks_setSink(phonesId);
					break;
			}
		}
	}

	async function processTopCodes(topcodes: number[], oldTopCodes: number[]) {
		// enters pov

		//const addedTopCodes = topcodes.filter((code) => !oldTopCodes.includes(code));

		const addedTopCodes = [];
		if (topcodes.length < oldTopCodes.length){
			outAudio?.play();

			for (let i = 0; i < topcodes.length; i++) {
				if(oldTopCodes[i] != topcodes[i]){
					addedTopCodes.push(topcodes[i]);
				}
			} //playSounds(addedTopCodes);

		} else if (topcodes.length == oldTopCodes.length){
			// Diferent elements
			if (!(JSON.stringify(topcodes) === JSON.stringify(oldTopCodes))){
				outAudio?.play();
			}
			for (let i = 0; i < topcodes.length; i++) {
				if(oldTopCodes[i] != topcodes[i]){
					addedTopCodes.push(topcodes[i]);
				}
			}
		} else {
			topcodeAudio?.play();
			let i
			for (i = 0; i < oldTopCodes.length; i++) {
				if(oldTopCodes[i] != topcodes[i]){
					addedTopCodes.push(topcodes[i]);
				}
			} for (let l =i+1; l < topcodes.length; l++) {
				addedTopCodes.push(topcodes[l]);
			}
		}

		// if(array1.sort().join(',')=== array2.sort().join(',')){
    	//alert('same members');
		//}
		//else alert('not a match');

		for (let i = 0; i < addedTopCodes.length; i++) {
			console.log(mode.value);

			if (mode.value === 'no-awareness') {
				topcodeAudio?.play();
			} else {
				console.log(mode.value);
				topcodeAudio?.play();
				await playSounds(addedTopCodes[i]);
				
			}
		}
	}


	let lastExecutionTime = 0;
	onMount(async () => {
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
		}

		if (audiocurr) {
			await playAudio(audiocurr);
		}
	}

	async function play() {
		const topcodetoPlay = topCodes;
		//playButAudio?.play();

		for (let i = 0; i < topcodetoPlay.length+1; i++) {
			console.log(topCodes);

			if (topcodetoPlay[i] === 115 || topcodetoPlay[i] === 47) {
				await playSounds('speak');
			} else if (topcodetoPlay[i] === 155 || topcodetoPlay[i] === 589) {
				await Promise.all([playSounds('dance'), fetch(`http://${robotIP}/dance`)]);
			} else if (topcodetoPlay[i] === 55 || topcodetoPlay[i] === 31) {
				const res = await fetch(`http://${robotIP}/can_move/front`);
				console.log(res);
				if (res.ok) {
					await Promise.all([playSounds('front'), fetch(`http://${robotIP}/move/front`)]);	
				} else {
					
					playSounds('noway');
				}
			} else if (topcodetoPlay[i] === 185 || topcodetoPlay[i] === 59) {
				const res = await fetch(`http://${robotIP}/move/backward`);
				console.log(res);
				if (res.ok) {
					await Promise.all([playSounds('backward'), fetch(`http://${robotIP}/move/backward`)]);	
				} else {
					
					playSounds('noway');
				}
			} else if (topcodetoPlay[i] === 205 || topcodetoPlay[i] === 61) {
				const res = await fetch(`http://${robotIP}/move/right`);
				console.log(res);
				if (res.ok) {
					await Promise.all([playSounds('right'), fetch(`http://${robotIP}/move/right`)]);	
				} else {
					
					playSounds('noway');
				}
			} else if (topcodetoPlay[i] === 285 || topcodetoPlay[i] === 79) {
				const res = await fetch(`http://${robotIP}/move/left`);
				console.log(res);
				if (res.ok) {
					await Promise.all([playSounds('left'), fetch(`http://${robotIP}/move/left`)]);	
				} else {
					
					playSounds('noway');
				}
			}
		}
	}

	function checkOutputs() {
		navigator.mediaDevices.getUserMedia({ audio: true });
		navigator.mediaDevices.enumerateDevices().then(function (devices) {
			devices.forEach(function (device) {
				console.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId);
			});
		});
	}

	async function onDemand() {
		console.log("ON DEMAND")
		blocks_setSink(phonesId);
		for (let i = 0; i < topCodes.length; i++) {
			console.log(i);
			console.log(topCodes[i]);
			await playSounds(topCodes[i]);
		}
		if(mode.value == 'private'){
			blocks_setSink(urbanistaId);
		}
	}

	async function handlekey(e) {
		console.log("HHHHHHHHHHH-1");
	
		if (e.keyCode == 80){
			console.log("HHHHHHHHHHH-2");
			play();
		}
		if (e.keyCode == 79){
			console.log("HHHHHHHHHHH-2");
			onDemand();
		}
    }

</script>

<svelte:window on:keydown|preventDefault={handlekey} />

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
			<Select.Root bind:selected={lab}>
				<Select.Trigger class="w-48">
					<Select.Value placeholder="Select a puzzle" />
				</Select.Trigger>
				<Select.Content>
					{#each labyrinths as lab}
						<Select.Item value={lab.value} label={lab.label} on:click={() => fetch(`http://${robotIP}/puzzle/${lab.value}`)}> {lab.label} </Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Input class="w-48" bind:value={robotIP} placeholder="192.168.1.1" />
			<Button on:click={checkOutputs}>Devices</Button>
			<!-- <Button on:click={onDemand}>On Demand</Button>
			<Button on:click={play}>PLAY</Button> -->
			
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
