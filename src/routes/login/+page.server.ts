import { base } from '$app/paths';
import { fail, redirect } from '@sveltejs/kit';
import { auth, googleProvider } from '$lib';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
    type UserCredential
} from 'firebase/auth';

export const actions = {
	async register({ request }) {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

        let userCred: UserCredential;
        try {
            userCred = await createUserWithEmailAndPassword(auth, email, password)
        } catch (err: any) {
            return fail(422, {
                error: err.code
            });
        }
        throw redirect(302, `${base}/users/${userCred.user.uid}`);
	},
	async login({ request }) {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

        let userCred: UserCredential;
        try {
            userCred = await signInWithEmailAndPassword(auth, email, password)
        } catch (err: any) { // Catch clause variable type annotation must be 'any' or 'unknown' if specified. ts(1196)
            return fail(422, {
                error: err.code
            });
        }
        throw redirect(302, `${base}/users/${userCred.user.uid}`);
	},
	async google({ request }) {
        let userCred: UserCredential;
        try {
            userCred = await signInWithPopup(auth, googleProvider)
        } catch (err: any) {
            return fail(422, {
                error: err.code
            });
        }
        throw redirect(302, `${base}/users/${userCred.user.uid}`);
	}
};

// let email: string;
// let password: string;
// let error: string = '';
// function formSubmited(e: SubmitEvent) {
// 	const action: string = (e.submitter as HTMLButtonElement).value;
// 	switch (action) {
// 		case 'login':
// 			signInWithEmailAndPassword(auth, email, password)
// 				.then((userCredential) => {
// 					error = '';
// 					const user = userCredential.user;
// 					goto(`${base}/users/${user.uid}`);
// 				})
// 				.catch((err) => {
// 					const errorCode = err.code;
// 					const errorMessage: string = err.message;
// 					error = errorMessage.split('Firebase: Error ')[1];
// 				});
// 			break;
// 		case 'register':
// 			createUserWithEmailAndPassword(auth, email, password)
// 				.then((userCredential) => {
// 					error = '';
// 					const user = userCredential.user;
// 					goto(`${base}/users/${user.uid}`);
// 				})
// 				.catch((err) => {
// 					const errorCode = err.code;
// 					const errorMessage: string = err.message;
// 					error = errorMessage.split('Firebase: Error ')[1];
// 				});
// 			break;
// 	}
// }
// function signWithGoogle() {
// 	signInWithPopup(auth, googleProvider)
// 		.then((result) => {
// 			error = '';
// 			const user = result.user;
// 			goto(`${base}/users/${user.uid}`);
// 		})
// 		.catch((err) => {
// 			const errorCode = err.code;
// 			const errorMessage: string = err.message;
// 			error = errorMessage.split('Firebase: Error ')[1];
// 		});
// }
