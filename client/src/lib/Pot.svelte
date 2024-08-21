<script lang="ts">
	export let pot = {
		balance: 0,
		round: 'Pre-Flop',
		match: 0
	};
	console.log(pot);
</script>

<div class="table">
	<div class="name"><strong>Pot</strong></div>
	<div class="balance">{pot.balance}</div>
	<div class="round">{pot.round}</div>
</div>

<style>
	.table {
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		border: 1px solid white;
	}
</style>
