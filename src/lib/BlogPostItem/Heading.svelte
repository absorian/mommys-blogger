<script lang="ts">
	export let text: string;
	export let editing = false;
</script>

{#if editing}
	<input type="text" bind:value={text} placeholder="Heading" />
{:else}
	<h1>{text}</h1>
{/if}

<style>
	input,
	h1 {
		width: calc(100% - 60px);
		font-size: 2em;
		font-weight: bolder;
		margin: 0 30px 0.5em;
		padding-bottom: 5px;
		border-bottom: 3px solid var(--accent-col);
	}

	input::placeholder {
		color: var(--background-second-col);
	}
</style>
