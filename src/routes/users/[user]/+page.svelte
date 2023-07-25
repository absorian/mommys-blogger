<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { Box, Button, user } from '$lib';
	import { BlogPost, type BlogPostData } from '$lib/BlogPost';
	import { onMount } from 'svelte';

	export let data;

	let editing = false;
	async function toggleEdit() {
		editing = !editing;
		if(editing) return;

		let container: FormData = new FormData();
		container.append('user', JSON.stringify(data.user));
		container.append('uid', $page.params.user);
		const response = await fetch(`${base}/users?/edit`, {
			method: 'POST',
			redirect: "manual",
			body: container
		});
	}
	function parConstrain(e: KeyboardEvent) {
		if (data.user.desc.length > 220) {
			e.preventDefault();
		}
	}
	function hConstrain(e: KeyboardEvent) {
		if (data.user.nickname.length > 25) {
			e.preventDefault();
		}
	}
</script>

<svelte:head>
	<style>
		body {
			--short-width: 50em;
		}
	</style>
</svelte:head>

<span class="profile" />
<Box>
	<img class="profileimg" src={data.user.img} alt="profile" />
	<div class="profileinfo">
		<div>
			{#if editing}
				<h1 contenteditable="plaintext-only" bind:textContent={data.user.nickname} on:keypress={hConstrain} />
			{:else}
				<h1>{data.user.nickname}</h1>
			{/if}
			{#if $user?.uid === $page.params.user}
				<Button appearence={editing ? 'solid' : 'inverse'} on:click={toggleEdit}
					>{editing ? 'Done' : 'Edit'}</Button
				>
			{/if}
		</div>
		{#if editing}
			<p
				contenteditable="plaintext-only"
				bind:textContent={data.user.desc}
				on:keypress={parConstrain}
			/>
		{:else}
			<p>{data.user.desc}</p>
		{/if}
	</div>
</Box>

<Box>
	<div class="postshead">
		<h1>Your posts</h1>
		{#if $user?.uid === $page.params.user}
			<Button appearence="solid" href="{base}/posts/workshop/">Add</Button>
		{/if}
	</div>
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
		/* overflow: hidden; */
	}

	.profileinfo > div,
	.postshead {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.profileinfo > p {
		word-wrap: break-word;
		word-break: break-all;
	}

	h1 + :global(.Button) {
		margin: auto 0;
	}
</style>
