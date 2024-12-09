import { sveltekit } from '@sveltejs/kit/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [nodePolyfills(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'noble-mac': 'noble' // Redirect 'noble-mac' to 'noble'
		}
	}
});
