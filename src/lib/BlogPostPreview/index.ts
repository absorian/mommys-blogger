import BlogPostPreview from './BlogPostPreview.svelte';
import type { HeadingData, ImageBoxData, TextData } from '$lib/BlogPostItem';

export interface BlogPostPreviewData {
    imgs: ImageBoxData[];
    head: HeadingData;
    text: TextData | undefined;
    id: string;
}

export { BlogPostPreview };
