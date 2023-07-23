import BlogPost from "./BlogPost.svelte";
import type { BlogPostItemData } from "$lib/BlogPostItem"

export interface BlogPostData {
    contents: BlogPostItemData[];
    author: string;
}

export { BlogPost }