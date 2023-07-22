<script lang="ts">
    export let text: string;
    export let editing: boolean = false;
</script>

{#if editing}
<input type="text" bind:value={text} placeholder="Heading">
{:else}
<h1>{text}</h1>
{/if}

<style>
    input, h1 {
        width: calc(100% - 60px);
        font-size: 2em;
        font-weight: bolder;
        margin: 0 30px;
        margin-bottom: 0.5em;
    }
</style>