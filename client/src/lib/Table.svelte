<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Player } from '$lib/types.ts';
	import Seat from '$lib/Seat.svelte';
	import Pot from '$lib/Pot.svelte';

	let ws: WebSocket;
	let players = [
		{
			id: 0,
			name: 'Unknown',
			balance: 0,
			bet: 0,
			folded: false,
			turn: false,
			role: '',
			callAmount: 0,
			numRaises: 0,
			actions: ['Call', 'Raise', 'Fold']
		}
	];
	let pot = { balance: 0, round: 'PreFlop', match: 0 };

	onMount(() => {
		console.log('hi');
		// Connect to WebSocket server
		ws = new WebSocket('ws://localhost:3000');
		ws.onopen = (event) => {
			// ws.send('ping!');
		};

		// Handle incoming messages
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
			// Update local state or perform actions
			players = data.players;
			pot = data.pot;
		};

		// Cleanup on component destroy
		onDestroy(() => {
			ws.close();
		});
	});

	const handleAction = (e: CustomEvent) => {
		console.log(e.detail);
		ws.send(JSON.stringify(e.detail));
	};
</script>

<Pot {pot} />
<div class="players">
	{#each players as player}
		<Seat {player} on:action={handleAction} />
	{/each}
</div>

<style>
</style>
