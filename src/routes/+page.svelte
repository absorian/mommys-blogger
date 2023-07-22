<script lang="ts">
	import { Box } from '$lib';
	import { Heading, Text, YoutubeEmbed, ImageBox } from '$lib/BlogItems';

	let editing = false;
</script>

<Box>
	<Heading {editing} text="Hello lorem" />
	<Text
		{editing}
		text="Lorem ipsum dolor sit amet consectetur adipisicing elit. A, perferendis saepe. Pariatur perferendis soluta provident necessitatibus officiis cum nesciunt consectetur vero! Excepturi autem a nostrum accusantium accusamus provident perspiciatis debitis?"
	/>
	<YoutubeEmbed {editing} url="https://www.youtube.com/watch?v=D9-voINFkCg" />
	<Heading {editing} text="Hello lorem" />
	<ImageBox
		{editing}
		id="https://www.subhe.com/img/clips/INPUTTYPE2(19)722.jpg"
		src="https://www.subhe.com/img/clips/INPUTTYPE2(19)722.jpg"
		alt="test"
		desc="Test lorem"
	/>
</Box>

<style>
</style>
