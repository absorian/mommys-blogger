<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Box, Button } from '$lib';
	import { BlogPost, type BlogPostData } from '$lib/BlogPost';

    export let data;

    let posts: { post: BlogPostData; id: string }[] = [];
    data.posts.forEach((doc) => {
		posts = [{ post: doc.data() as BlogPostData, id: doc.id }, ...posts];
	});
</script>

<svelte:head>
	<style>
		:root {
			--short-width: 50em;
		}
	</style>
</svelte:head>

<span class="profile" />
<Box>
	<img
		class="profileimg"
		src={data.user.img}
		alt="profile"
	/>
	<div class="profileinfo">
		<div>
			<h1>@{data.user.nickname}</h1>
			<Button appearence="inverse">Edit</Button>
		</div>
		<p>sdifsdfbs@gmail.com</p>
	</div>
</Box>

<Box>
	<h1 class="postshead">History</h1>
    {#each posts as { post, id }}
		<BlogPost
			{post}
			on:click={() => {
				goto(`${base}/posts/${id}`);
			}}
		/>
	{/each}
</Box>

<style>
	.postshead {
		margin-left: 8px;
	}
	.profile + :global(.Box) {
		display: flex;
		gap: 20px;
		min-width: 50em;
		width: 100%;
	}
	.profileimg {
		max-width: 10em;
		height: 10em;
		aspect-ratio: auto;
		border-radius: 10em;
	}
	.profileinfo {
		flex: 1 1 auto;
	}
	.profileinfo > div {
		display: flex;
		justify-content: space-between;
        margin-bottom: 10px;
	}
    h1 + :global(.Button) {
        margin: auto 0;
    }
</style>
