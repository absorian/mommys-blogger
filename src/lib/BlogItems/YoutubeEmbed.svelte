<script lang="ts">
    export let url: string;
    export let editing: boolean = false;

    const breakpoint = /\/|\/v\=/ // /0m5esWx or /v=0m5esWx

    $: tag = url.split(breakpoint).slice(-1);
</script>

{#if editing}
    <input type="url" pattern="(https:\/\/www\.youtube\.com\/watch\?v=\w+)|(https:\/\/youtu\.be\/\w+)|(https:\/\/www\.youtube\.com\/shorts\/\w+)" bind:value={url}>
{/if}

<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/{tag}"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
/>

<style>
    input {
        margin-left: 30px;
        margin-bottom: 10px;
    }
</style>