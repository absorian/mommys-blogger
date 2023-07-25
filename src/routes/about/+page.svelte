<script lang="ts">
	import { onMount } from 'svelte';

	import { base } from '$app/paths';
	import { Box, Button, ColumnTable } from '$lib';
	import { ImageBox, Heading, Text } from '$lib/BlogPostItem';

</script>

<!-- <svelte:head>
	<style>
		:root {
			--short-width: 80em;
		}
	</style>
</svelte:head> -->

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38, min_size: '400px' }]}>
	<Box slot="1">
		<Heading text="This project is presented by the team Scavs" />
		<p>
			Our project provides users with a seamless experience of registering, creating, managing, and deleting posts and videos.
			Designed with user-friendliness and versatility in mind, our platform offers
			a dynamic and engaging space for individuals to express themselves through posts and videos.
		</p>

		<Heading text="Members" />
		<ul>
			<li>Ismagil Iskakov, i.iskakov@innopolis@university, @absorian</li>
			<li>Koncheva Darya, d.koncheva@innopolis.university, @darrpyy</li>
		</ul>

		<Heading text="Tech Stack" />
		<ul>
			<li>SvelteKit</li>
			<li>TypeScript</li>
			<li>Vite</li>
			<li>Prettier</li>
		</ul>

		<Heading text="Link to GitHub Repository" />
		<p><Button appearence="inverse" href="https://github.com/absorian/mommys-blogger">Github</Button></p>

	</Box>
	<Box slot="2">
		<ImageBox src="{base}/about_icon.jpg" desc="Express yourself !" />
	</Box>
</ColumnTable>


<style>
	p, ul {
		display: block;
		font-size: 1em;
		font-weight: normal;
		margin: 0 30px;
		margin-bottom: 0.8em;
	}
	ul {
		padding-left: 30px;
		/* list-style: none; */
	}
</style>
