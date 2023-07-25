<script lang="ts">
	export let text: string;
	export let editing = false;
</script>

{#if editing}
	<p contenteditable="plaintext-only" bind:textContent={text} />
{:else}
	<p>{text}</p>
{/if}

<style>
	p {
		display: block;
		font-size: 1em;
		font-weight: normal;
		margin: 0 30px;
		margin-bottom: 0.5em;
	}
	p:empty::before {
		font-size: medium;
		content: 'Your Text';
		color: var(--accent-light-col);
	}
</style>
