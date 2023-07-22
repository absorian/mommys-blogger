import ImageBox from "./ImageBox.svelte";

export { ImageBox }

export type ImageBoxOpts = {
	src: string;
	title: string;

	shadow?: boolean;
	selectable?: boolean;
	sharp_edges?: boolean;
};

export type ImageData = {
    src: string;
    alt: string;
    title?: string;
}