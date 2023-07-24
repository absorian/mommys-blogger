<script lang="ts">
	import { page } from '$app/stores';
	import { Box } from '$lib';
	import { Heading } from '$lib/BlogPostItem';
</script>

<Box >
	<Heading text="{$page.status}: {$page.error?.message}"/>
</Box>
