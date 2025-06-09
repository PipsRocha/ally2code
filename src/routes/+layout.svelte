<script lang="ts">
	import '../app.pcss';

import { onMount } from 'svelte';

function simulateKeyPressesFromHash(hash: string) {
  const match = hash.match(/^#simulate=([a-zA-Z]+)(?:&|$)/);
  if (match) {
    const keys = match[1];
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

    // Optional: Clear the hash after simulating
    history.replaceState(null, '', window.location.pathname);
  }
}

onMount(() => {
  simulateKeyPressesFromHash(window.location.hash);

  // Also listen for hash changes (e.g. simulate=p&t=2)
  window.addEventListener('hashchange', () => {
    simulateKeyPressesFromHash(window.location.hash);
  });
});

</script>

<slot></slot>
