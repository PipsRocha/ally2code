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

	$: processTopCodes(topCodes);

	const notEqualsCheck = (a: number[], b: number[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	async function processTopCodes(topcodes: number[]) {
		console.log('HERE');
		// enters pov
		for (let i = 0; i < topcodes.length; i++) {
			//if(mode.value == 'shared')
			//play earcon to speakers
			//if play
			if (topcodes[i] == 681) {
				//playRobotSound(681);
				console.log('do something');
				await new Promise((r) => setTimeout(r, 2000));
			}
		}
	}

	onMount(async () => {
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


	function playRobotSound(arg1: number, angle = 0) {
		if ( arg1 === 681) {
			// earcon sound

		} else if( arg1 === 115) {
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

	function privateActions(topcodes: TopCode[]) {

	}

	function sharedActions() {

	}

	function noAwarenessActions() {
		
	}


	function checkOutputs() {
        navigator.mediaDevices.getUserMedia({ audio: true });
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            devices.forEach(function (device) {
                console.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId);
            });
        });
    }

	function playtoSpeakers(){

	}

	function playtoHeadphones(){

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
			<Button variant="outline" on:click={checkOutputs}>Devices</Button>
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
