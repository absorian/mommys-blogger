import Heading from './Heading.svelte';
import ImageBox from './ImageBox.svelte';
import Text from './Text.svelte';
import YoutubeEmbed from './YoutubeEmbed.svelte';

export { Heading, Text, YoutubeEmbed, ImageBox };

export interface HeadingData {
	type: 'head';
	text: string;
}

export interface TextData {
	type: 'text';
	text: string;
}

export interface YoutubeEmbedData {
	type: 'youtube';
	url: string;
}

export interface ImageBoxData {
	type: 'imgbox';
	src: string;
	desc: string;
}

export type BlogPostItemData = HeadingData | TextData | YoutubeEmbedData | ImageBoxData;
