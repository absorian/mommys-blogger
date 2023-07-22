<script lang="ts">
    export let text: string;
    export let editing: boolean = false;
</script>

{#if editing}
<input type="text" bind:value={text}>
{:else}
<p>{text}</p>
{/if}

<style>
    input, p {
        font-size: 1em;
		font-weight: normal;
        margin: 0;
        margin-bottom: 0.5em;
    }
</style>