<script lang="ts">
	import '../app.pcss';
	import { onMount, onDestroy } from 'svelte';

	// Trigger key events based on ?simulate=abc in URL
	function simulateKeysFromURL() {
		const url = new URL(window.location.href);
		const keys = url.searchParams.get('simulate');

		if (keys) {
			for (const key of keys) {
				const event = new KeyboardEvent('keydown', {
					key,
					code: `Key${key.toUpperCase()}`,
					keyCode: key.toUpperCase().charCodeAt(0),
					which: key.toUpperCase().charCodeAt(0),
					bubbles: true,
				});
				document.dispatchEvent(event);
			}
		}
	}

	function setupGlobalKeyListener(callback: (key: string) => void) {
		const handler = (event: KeyboardEvent) => {
			callback(event.key);
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}

	onMount(() => {
		simulateKeysFromURL();

		const unsubscribe = setupGlobalKeyListener((key) => {
			console.log('Global key press:', key);

			if (key === 'p') {
				// 🚨 Replace this with your desired behavior:
				console.log("You pressed 'p' globally!");
			}
		});

		onDestroy(unsubscribe);
	});
</script>

<slot></slot>
