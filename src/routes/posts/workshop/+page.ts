import { db, type UserData, waitForAuthInit, auth } from '$lib';
import type { BlogPostData } from '$lib/BlogPost/index.js';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';

export async function load({ params }) {
	if (!(await waitForAuthInit())) {
		throw error(401, {
			message: 'Sign in to create'
		});
	}
}
