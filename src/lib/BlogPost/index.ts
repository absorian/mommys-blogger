import type { BlogPostItemData } from "$lib/BlogPostItem"

export interface BlogPostData {
    contents: BlogPostItemData[];
    author: string;
}