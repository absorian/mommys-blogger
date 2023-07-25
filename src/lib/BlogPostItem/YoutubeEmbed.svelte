<script lang="ts">
	export let url: string;
	export let editing = false;

	const breakpoint = /\/|watch\?v=/; // /0m5esWx or /watch?v=0m5esWx

	$: tag = url.split(breakpoint).slice(-1)[0];
</script>

<div class="wrapper">
	<div>
		{#if editing}
			<input
				type="url"
				pattern="(https:\/\/www\.youtube\.com\/watch\?v=\w+)|(https:\/\/youtu\.be\/\w+)|(https:\/\/www\.youtube\.com\/shorts\/\w+)"
				bind:value={url}
				placeholder="Youtube URL"
			/>
		{/if}
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/{tag}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		/>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		margin: 25px 0;
	}

	input {
		display: block;
		margin-left: 30px;
		width: calc(100% - 60px);
		margin-bottom: 15px;
	}
	iframe {
		border-radius: var(--round-main);
		/* margin: 0 auto; */
	}
</style>
