<script lang="ts">
	import { base } from '$app/paths';
	import { Box, Button, ColumnTable } from '$lib';
	import { ImageBox, Heading } from '$lib/BlogPostItem';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="mommy's blogger about"/>
</svelte:head>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38, min_size: '400px' }]}>
	<Box slot="1">
	</Box>
	<Box slot="2">
	</Box>
</ColumnTable>

<style>
	p,
	ul {
		display: block;
		font-size: 1em;
		font-weight: normal;
		margin: 0 30px 0.8em;
	}
	ul {
		padding-left: 30px;
	}
</style>
