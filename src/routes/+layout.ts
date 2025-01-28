import { get, writable } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('http://localhost:3000').then((r) => r.json());

	return {
		coordinates: res.data,
		apiCoordinates: res.api
	};
};
