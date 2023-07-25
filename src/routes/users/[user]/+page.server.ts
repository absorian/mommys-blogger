import { db } from '$lib';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { UserData } from '$lib';
import { error } from '@sveltejs/kit';
import type { BlogPostData } from '$lib/BlogPost/index.js';

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

	const taskUserPosts = async () => {
		const q = query(collection(db, 'posts'), where('author', '==', params.user));
		return (await getDocs(q)).docs.map((v) => ({ post: v.data() as BlogPostData, id: v.id }));
	};

	return {
		user: taskUserData(),
		posts: taskUserPosts()
	};
}
