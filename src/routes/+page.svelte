<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Box } from '$lib';
	import { BlogPost } from '$lib/BlogPost';

	export let data;
</script>

<svelte:head>
	<title>Main page</title>
	<meta name="description" content="posts feed"/>
	<style>
		body {
			--short-width: 50em;
		}
	</style>
</svelte:head>

<Box>
	<h1>Here's the read</h1>
	{#each data.posts as { post, id }}
		<BlogPost
			{post}
			on:click={() => {
				goto(`${base}/posts/${id}`);
			}}
		/>
	{/each}
</Box>

<style>
	h1 {
		margin-left: 8px;
	}
</style>
