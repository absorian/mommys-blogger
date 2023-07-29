<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { EditOverlay, Box, Button, user, auth, storage } from '$lib';
	import type { BlogPostData } from '$lib/BlogPost';
	import type { BlogPostItemData, ImageBoxData } from '$lib/BlogPostItem';
	import { Heading, Text, YoutubeEmbed, ImageBox } from '$lib/BlogPostItem';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { onMount } from 'svelte';
	import { BarLoader } from 'svelte-loading-spinners';

	export let data;
	// export let form;

	let posts: { item: BlogPostItemData; selected: boolean }[] = [];

	let stickyEditOffsetElem: HTMLElement;
	let stickyEditOffset = 0;

	onMount(() => {
		pullData();
		stickyEditOffset = stickyEditOffsetElem?.getBoundingClientRect().top; // set once
	});

	function pullData() {
		posts.length = data.post.contents.length;
		let i = 0;
		data.post.contents.forEach((v) => {
			posts[i++] = { item: v, selected: false };
		});
	}

	function addElement(e: SubmitEvent) {
		const formData = new FormData(e.target as HTMLFormElement);
		posts = [
			...posts,
			{
				item: {
					type: formData.get('type') as 'head' | 'text' | 'imgbox' | 'youtube',
					src: '',
					desc: '',
					text: '',
					url: ''
				},
				selected: false
			}
		];
		fullSelect = false;
	}
	let fullSelect = false;
	function selectAll() {
		fullSelect = !fullSelect;
		posts.forEach((v) => {
			v.selected = fullSelect;
		});
		posts[0].selected = false;
		posts = posts;
	}
	function deleteElement(idx: number) {
		if (idx == 0) return;
		posts.splice(idx, 1);
		posts = posts;
		if (posts.length === 1) fullSelect = false;
	}
	function deleteSelected() {
		posts = posts.filter((v) => !v.selected);
		if (posts.length === 1) fullSelect = false;
	}

	function makeId(length: number) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	async function checkIfFileExists(path: string) {
		const storageRef = ref(storage, path);
		let result = false;
		await getDownloadURL(storageRef)
			.then((url) => {
				result = true;
			})
			.catch((error) => {
				if (error.code === 'storage/object-not-found') {
					result = false;
				} else {
					console.log('error while searching for file');
				}
			});
		return result;
	}

	let publishError = '';
	let loadingSpinner = false;
	async function publishPost() {
		if (posts[0].item.type !== 'head') return;
		if (!posts[0].item.text) {
			publishError = 'Please, fill the header';
			return;
		}
		loadingSpinner = true;

		fullSelect = false;
		let cool = true;

		posts.forEach((v) => {
			v.selected = false;
			const check = (p: any) => {
				if (p) return;
				cool = false;
				v.selected = true;
			};
			switch (v.item.type) {
				case 'head':
					check(v.item.text);
					break;
				case 'text':
					check(v.item.text);
					break;
				case 'youtube':
					check(v.item.url);
					break;
				case 'imgbox':
					check(v.item.src);
					break;
			}
		});
		if (!cool) {
			loadingSpinner = false;
			publishError = 'Selected elements are not filled';
			posts = posts;
			return;
		}

		for (let i = 0; i < posts.length; i++) {
			if (posts[i].item.type !== 'imgbox') continue;

			if ((posts[i].item as ImageBoxData).src.includes('mommys-blogger.appspot.com')) continue;

			let src = (posts[i].item as ImageBoxData).src;
			let blob = await fetch(src).then((r) => r.blob());

			// const type = src.substring(src.lastIndexOf('.') + 1, src.length);

			// check collision and make name
			let exists = true;
			let name = '';
			while (exists) {
				name = makeId(10) + '.' + blob.type.split('/')[1];
				exists = await checkIfFileExists(name);
			}

			// upload and get firebase's url
			const res = await uploadBytes(ref(storage, 'images/' + name), blob);
			const db_src = await getDownloadURL(res.ref);
			(posts[i].item as ImageBoxData).src = db_src;
		}

		publishError = '';
		let container: FormData = new FormData();
		let data: BlogPostData = {
			contents: posts.map((v) => v.item),
			author: auth.currentUser?.uid as string
		};
		container.append('data', JSON.stringify(data));
		container.append('id', $page.params.post);
		const response = await fetch(`${base}/posts/workshop?/update`, {
			method: 'POST',
			redirect: 'follow',
			body: container
		});
		const res = await response.json();

		loadingSpinner = false;
		goto(res.location, {
			invalidateAll: true
		});
	}
	async function deletePost() {
		let container: FormData = new FormData();
		container.append('uid', $page.params.post);
		const response = await fetch(`${base}/posts/workshop?/delete`, {
			method: 'POST',
			redirect: 'follow',
			body: container
		});
		const res = await response.json();

		goto(res.location, {
			invalidateAll: true
		});
	}

</script>

<Box>
	<span bind:this={stickyEditOffsetElem}></span>
	<div class="controls shadow" style="top: {stickyEditOffset}px">
		<form on:submit|preventDefault={addElement}>
			<Button appearence="solid" type="submit">Add</Button>
			<select name="type">
				<option value="head">Heading</option>
				<option value="text">Text</option>
				<option value="imgbox">Image</option>
				<option value="youtube">Youtube</option>
			</select>
		</form>
		<div>
			<Button appearence="solid" type="button" on:click={selectAll}
				>{fullSelect ? 'Deselect all' : 'Select all'}</Button
			>
			<Button appearence="inverse" type="button" on:click={deleteSelected}>Delete selected</Button>
		</div>
	</div>
	{#each posts as { item, selected }, i}
		<EditOverlay
			noshow={!i}
			bind:selected
			on:delete={() => deleteElement(i)}
			on:selection={() => {
				fullSelect = fullSelect ? !selected : false;
			}}
		>
			{#if item.type === 'head'}
				<Heading editing bind:text={item.text} />
			{:else if item.type === 'text'}
				<Text editing bind:text={item.text} />
			{:else if item.type === 'youtube'}
				<YoutubeEmbed editing bind:url={item.url} />
			{:else if item.type === 'imgbox'}
				<ImageBox editing bind:src={item.src} bind:desc={item.desc} />
			{/if}
		</EditOverlay>
	{/each}
	<div class="bottomcontrols">
		<div>
			<Button appearence="inverse" type="button" on:click={deletePost}>Delete</Button>
			<!-- <Button
				appearence="inverse"
				type="button"
				on:click={pullData}>Revert</Button
			> -->
		</div>
		<span>{publishError}</span>
		{#if loadingSpinner}
			<BarLoader color="#7045ff" />
		{/if}
		<Button appearence="solid" type="button" on:click={publishPost}>Update</Button>
	</div>
</Box>

<style>
	.bottomcontrols {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin-top: 20px;
	}
	.bottomcontrols > :global(*) {
		margin: auto 0;
	}
	.bottomcontrols > div > :global(*) {
		margin-right: 5px;
	}

	.bottomcontrols > span {
		font-size: large;
		/* margin-right: 10px; */
	}

	.controls {
		background-color: white;
		border-radius: var(--round-main);
		outline: 8px solid white;
		position: sticky;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		z-index: 52;
	}
	.controls > div > :global(*) {
		margin-left: 5px;
	}
	.controls > form > select {
		/* text-align: center; */
		border: 0;
		background-color: transparent;

		border-radius: 35px;
		padding: 9px 10px;

		cursor: pointer;

		max-height: inherit;
		max-width: inherit;
		/* font-weight: 600; */

		line-height: 1.2em;
		font-size: 0.9em;
	}
	.controls > form > select:focus {
		outline: none;
	}
</style>
