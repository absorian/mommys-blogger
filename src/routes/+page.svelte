<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Box } from '$lib';
	import { BlogPost, type BlogPostData } from '$lib/BlogPost';

	export let data;
	let posts: { post: BlogPostData; id: string }[] = [];

	data.posts.forEach((doc) => {
		posts = [{ post: doc.data() as BlogPostData, id: doc.id }, ...posts];
	});
</script>

<Box>
	{#each posts as { post, id }}
		<BlogPost
			{post}
			on:click={() => {
				goto(`${base}/posts/${id}`);
			}}
		/>
	{/each}
</Box>
