<script lang="ts">
	import type { Player } from '$lib/types.ts';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	export let player: Player = {
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
	};

	let error = '';
	let amount = 10;

	$: {
		if (player) {
			error = '';
		}
	}

	const handleCall = () => {
		if (player.balance < player.callAmount) {
			error = `Not enough balance to ${player.actions[0]}`;
			return false;
		} else {
			dispatch('action', {
				id: player.id,
				action: 'call',
				amount: player.callAmount
			});
		}
	};
	const handleRaise = () => {
		if (player.balance < amount + player.callAmount) {
			error = `Not enough balance to ${player.actions[1]}`;
			return false;
		} else {
			dispatch('action', { id: player.id, action: 'raise', amount: amount });
		}
	};
	const handleFold = () => {
		dispatch('action', { id: player.id, action: 'fold' });
	};
</script>

<div class="table" class:turn={player.turn} class:folded={player.folded}>
	<div class="details">
		<div class="name"><strong>{player.name}</strong> {player.role}</div>
		<div class="balance">BAL: {player.balance}</div>
		<div class="bet">BET: {player.bet}</div>
	</div>
	<div class="actions">
		<button on:click={handleCall} disabled={!player.turn}
			>{`${player.actions[0]} (${player.callAmount})`}</button
		>
		<input type="number" disabled={!player.turn} bind:value={amount} />
		<button on:click={handleRaise} disabled={!player.turn}
			>{player.actions[1]}</button
		>
		<button on:click={handleFold} disabled={!player.turn}
			>{player.actions[2]}</button
		>
	</div>
	<div class="error">{error}</div>
</div>

<style>
	button {
		padding: 0.5em;
		margin: 0.2em;
		cursor: pointer;
		color: var(--text-primary);
		border: 1px solid var(--text-primary);
		background-color: rgba(0, 0, 0, 0.2);
	}
	input {
		padding: 0.5em;
		margin: 0.2em;
		width: 3em;
		border: 1px solid var(--text-primary);
	}
	button[disabled] {
		border: 1px solid gray;
		cursor: default;
	}
	.table {
		padding: 1em 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
		box-sizing: border-box;
		margin: 1em auto;
		border: 1px solid var(--text-primary);
	}
	.details > div {
		display: inline-block;
		margin: auto 1em;
	}
	.actions {
		text-align: center;
		padding: 1em;
	}
	.error {
		color: var(--text-error);
	}
	.turn {
		border: 2px solid green;
	}
	.folded {
		color: gray;
		border: 2px solid gray;
	}
	.folded button {
		color: gray;
	}
</style>
