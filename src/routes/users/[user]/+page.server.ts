import { db } from '$lib';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { UserData } from '$lib';
import { error } from '@sveltejs/kit';
import type { BlogPostData } from '$lib/BlogPost/index.js';
import type { BlogPostPreviewData } from '$lib/BlogPostPreview';
import type { BlogPostItemData, HeadingData, ImageBoxData, TextData } from '$lib/BlogPostItem';

export async function load({ params }) {
	const docRef = doc(db, 'users', params.user);

	const taskUserData = async () => {
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw error(404, {
				message: 'No such user'
			});
		}
		return docSnap.data() as UserData;
	};

	const taskPosts = async () => {
		const q = query(collection(db, 'posts'), where('author', '==', params.user));
		const docs = await getDocs(q);

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

	return {
		user: taskUserData(),
		posts: taskPosts()
	};
}
