<script lang="ts">
	import { onMount } from 'svelte';
	import type { BlogPostData } from '.';
	import type { ImageBoxData, HeadingData, TextData, BlogPostItemData } from '$lib/BlogPostItem';

	export let post: BlogPostData;

	let imgs: ImageBoxData[] = [];
	let head: HeadingData = {
		type: 'head',
		text: ''
	};
	let text: TextData | undefined;

	let img_width: number;
	let slide_offset = 0;
	onMount(() => {
		if (!post.contents) {
			console.log('No Contents!');
		}
		imgs = post.contents.filter((val: BlogPostItemData) => {
			return val.type === 'imgbox';
		}) as ImageBoxData[];

		head = post.contents[0] as HeadingData; // heading at 0 is req
		text = post.contents.find((val: BlogPostItemData) => {
			return val.type === 'text';
		}) as TextData | undefined;

		let slide_counter = 0;
		setInterval(() => {
			if (slide_counter++ < imgs.length - 1) {
				slide_offset += img_width;
				return;
			}
			slide_offset = 0;
			slide_counter = 0;
		}, 5000);
	});
</script>

<div class="wrapper shadow" role="button" aria-pressed="false" tabindex="0" on:click on:keydown>
	{#if imgs.length}
		<div class="imgviewport" bind:clientWidth={img_width}>
			<div class="imgslider" style="left: {-slide_offset}px;">
				{#each imgs as i}
					<div class="imgcontainer">
						<img src={i.src} alt="" />
						<div class="imgbackground" style:background-image="url('{i.src}')" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<div class="texts">
		<h1>{head.text}</h1>
		{#if text}
			<p>{text.text}</p>
		{:else if imgs.length}
			<p class="emptyp">Left blank intentionally</p>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		border: 8px solid white;
		border-radius: var(--round-main);
		width: 100%;
		margin: 20px 0;
		overflow: hidden;
		display: flex;
		justify-content: left;
		/* gap: 15px; */

		--imgviewport-height: 10em;
		--imgviewport-width: calc(var(--imgviewport-height) * 1.618);

		transition: all 150ms ease-in-out;
		cursor: pointer;
	}
	.wrapper:hover {
		box-shadow: 0px 0px 25px var(--background-second-col);
	}
	.imgviewport {
		position: relative;
		border-radius: var(--round-main);
		overflow: hidden;

		width: var(--imgviewport-width);
		height: var(--imgviewport-height);

		flex-shrink: 0;
	}

	.texts {
		width: 100%;
		background-color: white;
		/* width: 100%; */
		margin-left: 15px;
		margin-right: 30px;
		max-height: var(--imgviewport-height);
		overflow: hidden;
	}
	p {
		/* display: contents; */
		font-size: 1em;
		font-weight: normal;
		padding-bottom: 8px;
		/* text-overflow: ellipsis; */
	}
	.emptyp {
		color: rgb(167, 167, 167);
	}
	h1 {
		width: 100%;
		font-size: 1.5em;
		font-weight: bolder;
		margin-bottom: 10px;
		padding-bottom: 5px;
		border-bottom: 3px solid var(--accent-col);
	}

	.imgslider {
		position: absolute;
		top: 0;
		height: inherit;
		display: flex;
		transition: all 400ms ease-in-out;
	}
	.imgslider > .imgcontainer {
		position: relative;
		height: inherit;

		width: var(--imgviewport-width);
	}
	.imgcontainer > img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		max-width: 100%;
		max-height: 100%;

		width: fit-content;
		height: fit-content;
		aspect-ratio: auto;
		z-index: 48;
	}
	.imgbackground {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		filter: blur(8px) brightness(70%);
		-webkit-filter: blur(8px) brightness(70%);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
