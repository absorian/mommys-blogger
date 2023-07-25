import { db, type UserData, waitForAuthInit, auth } from '$lib';
import type { BlogPostData } from '$lib/BlogPost/index.js';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';

export async function load({ params }) {
	const docRef = doc(db, 'posts', params.post);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		throw error(404, {
			message: 'No such post'
		});
	}
	const res = { post: docSnap.data() as BlogPostData, nick: '' };

	await waitForAuthInit();
	if (!auth.currentUser?.uid) {
		throw error(401, {
			message: 'Not allowed to modify'
		});
	}

	const userRef = doc(db, 'users', res.post.author);
	const userSnap = await getDoc(userRef);
	res.nick = (userSnap.data() as UserData).nickname;

	return res;
}
