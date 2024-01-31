import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { addDynamicIconSelectors } from '@iconify/tailwind';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		addDynamicIconSelectors(),
		skeleton({
			themes: { preset: ['crimson'] }
		})
	]
} satisfies Config;

export default config;
