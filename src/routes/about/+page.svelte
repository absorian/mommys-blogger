<script lang="ts">
	import { onMount } from 'svelte';

	import { base } from '$app/paths';
	import { Box, Button, ColumnTable } from '$lib';
	import { ImageBox, Heading, Text } from '$lib/BlogItems';

</script>

<svelte:head>
	<style>
		:root {
			--short-width: 80em;
		}
	</style>
</svelte:head>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38, min_size: '400px' }]}>
	<Box slot="1">
		<Heading text="This project is presented by the team Scavs" />
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. <br> Et reiciendis iusto recusandae? Enim
			facere explicabo praesentium officia est maiores quae officiis, sint, minima perspiciatis
			temporibus sequi quam nostrum incidunt odit? 
		</p>
		<Heading text="Members" />
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Et reiciendis iusto recusandae? Enim
			facere explicabo praesentium officia est maiores quae officiis, sint, minima perspiciatis
			temporibus sequi quam nostrum incidunt odit?
			<Button href="" appearence="transparent">Github</Button>
		</p>
	</Box>
	<Box slot="2">
		<ImageBox src="{base}/svelte_fill.jpg" desc="Scavs" />
	</Box>
</ColumnTable>

<style>
	p {
		display: block;
		font-size: 1em;
		font-weight: normal;
		margin: 0 30px;
		margin-bottom: 0.5em;
	}
</style>
