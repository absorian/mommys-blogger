<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Box, Button, user } from '$lib';
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
	<img class="profileimg" src={data.user.img} alt="profile" />
	<div class="profileinfo">
		<div>
			<h1>@{data.user.nickname}</h1>
			{#if $user?.uid === data.uid}
				<Button appearence="inverse">Edit</Button>
			{/if}
		</div>
		<p>
			{data.user.desc}
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero saepe praesentium officia aut
			iure inventore illum eum, ipsa ratione! Earum sequi ad exercitationem voluptatum reiciendis nam
			delectus labore vero temporibus.
		</p>
	</div>
</Box>

<Box>
	<div class="postshead">
		<h1>History</h1>
		{#if $user?.uid === data.uid}
			<Button appearence="solid">Add</Button>
		{/if}
	</div>
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
	.postshead > h1 {
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
		height: 10em;
		overflow: hidden;
	}

	.profileinfo > div,
	.postshead {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	
	.profileinfo > p {
		word-wrap:break-word;
		word-break: break-all;
	}

	h1 + :global(.Button) {
		margin: auto 0;
	}
</style>
