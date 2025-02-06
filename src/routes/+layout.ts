import { get, writable } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('http://localhost:3000').then((r) => r.json());

	return {
		coordinates: res.data,
		x_label: res.x_label,
		z_label: res.z_label,
		apiCoordinates: res.api
	};
};
