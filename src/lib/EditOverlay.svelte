<script lang="ts">
	import { base } from '$app/paths';
	import { Button } from '$lib';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let selected = false;
	export let noshow = false;
	function switchSelection() {
		selected = !selected;
		dispatch('selection', {
			state: selected
		});
	}
	function onDelete() {
		dispatch('delete');
	}
</script>

<div class="wrapper">
	<slot />
	{#if !noshow}
		<div class="controls shadow">
			<Button type="button" appearence="inverse" on:click={onDelete}>&#10006;</Button>
			<Button type="button" appearence={selected ? 'solid' : 'inverse'} on:click={switchSelection}
				>&#9679;</Button
			>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
	}
	.controls {
		background-color: white;
		border-radius: var(--round-main);
		padding: 8px;
		position: absolute;
		top: 0;
		right: calc(-6em);
		/* max-height: 3em; */
	}
	.controls > :global(.Button) {
		width: 3em;
		height: 3em;
		line-height: normal;
		margin-right: 5px;
	}
</style>
