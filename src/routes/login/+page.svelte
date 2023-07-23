<script lang="ts">
	import { base } from '$app/paths';
	import { Button, Box, ColumnTable } from '$lib';

	import { onMount } from 'svelte';
	import { auth, googleProvider } from '$lib';
	import { goto } from '$app/navigation';
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signInWithPopup,
		GoogleAuthProvider,
		OAuthCredential
	} from 'firebase/auth';

	onMount(() => {

	});

	let email: string;
	let password: string;
	let error: string = '';
	function formSubmited(e: SubmitEvent) {
		const action: string = (e.submitter as HTMLButtonElement).value;
		switch (action) {
			case 'login':
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						error = '';
						const user = userCredential.user;
						goto(`${base}/`);
					})
					.catch((err) => {
						const errorCode = err.code;
						const errorMessage: string = err.message;
						error = errorMessage.split('Firebase: Error ')[1];
					});
				break;
			case 'register':
				createUserWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						error = '';
						const user = userCredential.user;
						goto(`${base}/`);
					})
					.catch((err) => {
						const errorCode = err.code;
						const errorMessage: string = err.message;
						error = errorMessage.split('Firebase: Error ')[1];
					});
				break;
		}
	}
	function signWithGoogle() {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				error = '';
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential;
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
				goto(`${base}/`);
			})
			.catch((err) => {
				// Handle Errors here.
				const errorCode = err.code;
				const errorMessage: string = err.message;
				error = errorMessage.split('Firebase: Error ')[1];
				// The email of the user's account used.
				const email = err.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(err);
				// ...
			});
	}
</script>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38 }]}>
	<Box slot="1">
		<h1>Create</h1>
		<h1 class="mom">& Be</h1>
		<h1>Proud</h1>
	</Box>
	<Box slot="2">
		<form on:submit|preventDefault={formSubmited}>
			<h2>Log in</h2>
			<input
				type="text"
				placeholder="Email"
				bind:value={email}
				pattern={String.raw`\w+@\w+\.[a-z]{2,}$`}
				title="user@example.com"
				required
			/>
			<input
				type="password"
				placeholder="Password"
				bind:value={password}
				pattern={String.raw`(?=.*\d)(?=.*[a-zA-Z]).{8,}`}
				title="At least one number and one lowercase letter, 8 or more characters"
				required
			/>
			<div class="buttonbar">
				<Button type="submit" value="login" appearence="solid">Login</Button>
				<Button type="submit" value="register" appearence="inverse">Register</Button>
				<Button type="button" value="google" appearence="transparent" on:click={signWithGoogle}>
					<img class="alterlog" src="{base}/favicon.png" alt="google" />
				</Button>
			</div>
			<span>{error}</span>
		</form>
	</Box>
</ColumnTable>

<style>
	h2 {
		margin-left: 10px;
		margin-bottom: 25px;
	}
	span {
		display: block;
		color: var(--accent-col);
		margin-top: 10px;
		margin-left: 10px;
	}
	input {
		border-radius: 30px;
		border: 2px solid var(--accent-col);
		margin-bottom: 15px;
		height: 3em;
		width: 100%;
	}
	.buttonbar {
		display: flex;
		justify-content: left;
		gap: 20px;
	}
	.buttonbar > ::global(*) {
		margin: auto 0;
	}
	.alterlog {
		max-width: 2em;
	}
	h1 {
		font-family: AlloyInk;
		font-size: 6em;
		text-align: center;
		color: var(--accent-col);
	}
	h1.mom {
		color: var(--accent-light-col);
		font-size: 9em;
	}
</style>
