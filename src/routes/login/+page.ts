import { base } from '$app/paths';
import { db, waitForAuthInit, type UserData } from '$lib';
import { error, redirect } from '@sveltejs/kit';

export async function load() {
	let user = await waitForAuthInit();
	if (user?.uid) {
		throw redirect(302, `${base}/users/${user?.uid}`);
	}
}
