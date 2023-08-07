import { db } from '$lib';
import type { BlogPostData } from '$lib/BlogPost';
import type { BlogPostItemData, HeadingData, ImageBoxData, TextData } from '$lib/BlogPostItem';
import type { BlogPostPreviewData } from '$lib/BlogPostPreview';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export async function load() {
	const taskPosts = async () => {
		console.log("begin");
		
		const col = collection(db, 'posts');
		const docs = await getDocs(col);
		console.log("getDocs done");

		return docs.docs.map((v): BlogPostPreviewData => {
			const post = v.data() as BlogPostData;
			return {
				imgs: post.contents.filter((val: BlogPostItemData) => {
					return val.type === 'imgbox';
				}) as ImageBoxData[],
				head: post.contents[0] as HeadingData, // heading at 0 is req
				text: post.contents.find((val: BlogPostItemData) => {
					return val.type === 'text';
				}) as TextData | undefined,
				id: v.id
			}
		});
	};

	return { posts: taskPosts() };
}
