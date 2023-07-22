<script lang="ts">
	import { base } from "$app/paths";

	export let id: string;
	export let src: string;
	export let alt: string = "post image";
	export let desc: string = '';

	export let shadow: boolean = false;
	export let selectable: boolean = true;
	export let sharp_edges: boolean = false;

	export let editing: boolean = false;

	
	function input_select(e: { currentTarget: HTMLInputElement }) {
		const files = e.currentTarget.files;
		if(files) {
			src = URL.createObjectURL(files[0]);
		}
	}
</script>

<div class="wrapper">
	<!-- {#if editing}
	<div class="editor">
		<label for="{id}_file" >Select an image</label>
		<input id="{id}_file" type="file" accept="image/*" name="img" on:change={input_select} />
		<label for="{id}_desc">Description:</label>
		<input id="{id}_desc" type="text" name="title" bind:value={desc} placeholder="Type here"/>
	</div>
	{/if} -->
	<div class="imgbox" class:shadow>
		{#if selectable}
			<input type="checkbox" {id} class="selectimghelper" />
			<label for={id} class="selectableimglabel">
				<img class="selectableimg" class:sharp_edges {src} {alt} />
			</label>
			<img class="selectableimgdouble" class:sharp_edges {src} {alt} />
		{:else}
			<img class="selectableimg" class:sharp_edges {src} {alt} />
		{/if}
		{#if editing}
			<label class="srcedit" for="{id}_srcedit">
				<img src="{base}/favicon.png" alt="edit">
			</label>
			<input id="{id}_srcedit" type="file" name="img" on:change={input_select}>
		{/if}
		<p contenteditable="{editing ? "plaintext-only" : "false"}">{desc}</p>
	</div>
</div>

<style>

	.srcedit {
		margin: 10px;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 51;
	}
	.srcedit > img {
		width: 50px;
	}

	input[type="file"] {
		display: none;
	}

	.sharp_edges {
		border-radius: 0 !important;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 25px;
	}

	.imgbox {
		position: relative;
		background-color: var(--accent-light-tint);
		border-radius: var(--round-main);
	}
	.imgbox > p {
		margin: 10px 30px;
        padding: 10px;

		font-size: 1em;
		font-weight: normal;
	}
	.imgbox > p:empty::before {
		font-size: medium;
		content: 'Image Title';
		color: var(--accent-light-col);
	}

	.imgbox img {
		border-radius: var(--round-main);
		max-width: 100%;
		max-height: 400px;
	}

	.selectableimgdouble {
		display: none;
	}

	.selectableimg {
		transition: transform 250ms ease-in-out;

		opacity: 1;
	}

	.selectableimglabel {
		transition: opacity 250ms ease-in-out, background-color 300ms ease-in-out;

		display: flex;
		border-radius: var(--round-main);
		line-height: 0;
		justify-content: center;
		z-index: 50;
	}

	.selectimghelper {
		display: none;
	}

	:not(.selectimghelper:checked) + .selectableimglabel > .selectableimg:hover {
		/* transform: scale(0.99, 0.99); */
		transform: scale(1.01, 1.01);
	}

	:not(.selectimghelper:checked) + .selectableimglabel:hover {
		opacity: 0.9;
	}

	.selectimghelper:checked + .selectableimglabel {
		opacity: 1;

		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 0;

		transform: translate(-50%, -50%);
		position: fixed;
		top: 50%;
		left: 50%;

		width: 100%;
		height: 100%;
		z-index: 100;
	}

	.selectimghelper:checked + .selectableimglabel > .selectableimg {
		transform: scale(1, 1);

		max-height: none;
		height: 70vmin;
		width: auto;

		margin: auto;
	}

	.selectimghelper:checked + .selectableimglabel + .selectableimgdouble {
		margin: 0 auto;
		display: block;
	}
</style>
