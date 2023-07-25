<script lang="ts">
	import { base } from '$app/paths';
	import { Button, Box, ColumnTable, auth, googleProvider } from '$lib';
	import { goto } from '$app/navigation';
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		getAdditionalUserInfo,
		signInWithPopup,
		type UserCredential
	} from 'firebase/auth';

	export let form;

	function clearErr() {
		form = { error: '' };
	}

	async function signWithGoogle() {
		clearErr();

		let userCred: UserCredential;
		try {
			userCred = await signInWithPopup(auth, googleProvider);
			const isnew = getAdditionalUserInfo(userCred)?.isNewUser as boolean;

			if (isnew) {
				let data: FormData = new FormData();
				data.append('uid', userCred.user.uid);
				fetch(`${base}/login?/createUser`, {
					method: 'POST',
					body: data
				});
			}
			goto(`${base}/users/${userCred.user.uid}`);
		} catch (err: any) {
			form = { error: err.code };
		}
	}
	function formSubmited(e: SubmitEvent) {
		const action: string = (e.submitter as HTMLButtonElement).value;
		const formData = new FormData(e.target as HTMLFormElement);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		switch (action) {
			case 'login':
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						clearErr();
						const user = userCredential.user;
						goto(`${base}/users/${user.uid}`);
					})
					.catch((err) => {
						form = { error: err.code };
					});
				break;
			case 'register':
				createUserWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						clearErr();
						const user = userCredential.user;

						let data: FormData = new FormData();
						data.append('uid', user.uid);
						fetch(`${base}/login?/createUser`, {
							method: 'POST',
							body: data
						});
					})
					.catch((err) => {
						form = { error: err.code };
					});
				break;
		}
	}
</script>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38 }]}>
	<Box slot="1">
		<h1>Create</h1>
		<h1 class="mom">& Be</h1>
		<h1>Proud</h1>
	</Box>
	<Box slot="2">
		<form method="POST" on:submit|preventDefault={formSubmited}>
			<h2>Log in</h2>
			<input
				on:change={clearErr}
				type="text"
				placeholder="Email"
				name="email"
				pattern={String.raw`\w+@\w+\.[a-z]{2,}$`}
				title="user@example.com"
				required
			/>
			<input
				on:change={clearErr}
				type="password"
				placeholder="Password"
				name="password"
				pattern={String.raw`(?=.*\d)(?=.*[a-zA-Z]).{8,}`}
				title="At least one number and one lowercase letter, 8 or more characters"
				required
			/>
			<div class="buttonbar">
				<Button type="submit" value="login" appearence="solid">Login</Button>
				<Button type="submit" value="register" appearence="inverse">Register</Button>
				<Button type="button" on:click={signWithGoogle} appearence="transparent">
					<img class="alterlog" src="{base}/google.png" alt="google" />
				</Button>
			</div>
			{#if form?.error}
				<span>{form.error}</span>
			{/if}
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
		max-width: 3em;
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
