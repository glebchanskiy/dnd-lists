import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '192.168.185.48'
	},
	resolve: {
		alias: {
				'@': path.resolve(__dirname, './src'),
				'@assets': path.resolve(__dirname, './src/assets'),
				'@models': path.resolve(__dirname, './src/models'),
				'@redux': path.resolve(__dirname, './src/redux'),
				'@components': path.resolve(__dirname, './src/components'),
				'@pages': path.resolve(__dirname, './src/pages'),
		},
},
	plugins: [
		preact(),
	],
});
