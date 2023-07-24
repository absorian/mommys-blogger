<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Box, Button } from '$lib';
	import { Heading, Text, YoutubeEmbed, ImageBox } from '$lib/BlogPostItem';

	export let data;
</script>

<Box>
	{#each data.post.contents as item}
		{#if item.type === 'head'}
			<Heading {...item} />
		{:else if item.type === 'text'}
			<Text {...item} />
		{:else if item.type === 'youtube'}
			<YoutubeEmbed {...item} />
		{:else if item.type === 'imgbox'}
			<ImageBox {...item} />
		{/if}
	{/each}
	<span />
	<Button appearence="transparent" href="{base}/users/{data.post.author}">@{data.nick}</Button>
</Box>

<style>
	span + :global(.Button) {
		font-size: large;
		margin-top: 1em;
		margin-left: 30px;
	}
</style>
