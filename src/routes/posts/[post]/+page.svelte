<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { Box, Button, user } from '$lib';
	import { type HeadingData, Heading, Text, YoutubeEmbed, ImageBox } from '$lib/BlogPostItem';

	export let data;

	$: name = (data.post.contents[0] as HeadingData).text
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content="{data.nick}'s' post"/>
</svelte:head>

<span />
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
	<div class="bottom">
		<Button appearence="transparent" href="{base}/users/{data.post.author}">By: {data.nick}</Button>
		{#if $user?.uid === data.post.author}
			<Button appearence="transparent" href="{base}/posts/workshop/{$page.params.post}">Edit</Button
			>
		{/if}
	</div>
</Box>

<style>
	span + :global(.Box) {
		min-width: 50em;
	}
	/* .bottom {
		
	} */
	.bottom > :global(.Button) {
		font-size: large;
		margin-top: 1em;
		margin-left: 30px;
	}
</style>
