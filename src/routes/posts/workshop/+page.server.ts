import { base } from '$app/paths';
import { db, user, type UserData, waitForAuthInit, auth } from '$lib';
import type { BlogPostData } from '$lib/BlogPost/index.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// export async function load({ params }) {
// 	console.log(await waitForAuthInit());
// }

export const actions = {
	async create({ request }) {
		const data = (await request.formData()).get('data');

		const newDoc = await addDoc(collection(db, 'posts'), JSON.parse(data));

		throw redirect(302, `${base}/posts/${newDoc.id}`);
	},
	async update({ request }) {
		const contaner = await request.formData();
		const data = contaner.get('data');
		const id = contaner.get('id');

		await updateDoc(doc(db, 'posts', id), JSON.parse(data));

		throw redirect(302, `${base}/posts/${id}`);
	},
	async delete({ request }) {
		const contaner = await request.formData();
		const uid = contaner.get('uid');

		await deleteDoc(doc(db, 'posts', uid));

		throw redirect(302, `${base}/`);
	}
};
