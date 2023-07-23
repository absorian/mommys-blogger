<script lang="ts">
	import { Box } from '$lib';
	import type { BlogPostData } from '$lib/BlogPost';
	import { Heading, Text, YoutubeEmbed, ImageBox } from '$lib/BlogPostItem';

	export let data: { post: BlogPostData };
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
	<h2>@{data.post.author}</h2>
</Box>

<style>
	h2 {
		text-align: end;
		margin-right: 2em;
	}
</style>
