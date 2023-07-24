<script lang="ts">
	import { base } from '$app/paths';
	import { Button, Box, ColumnTable } from '$lib';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let form;

	function clearErr() {
		if (form) form = { error: '' };
	}
</script>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38 }]}>
	<Box slot="1">
		<h1>Create</h1>
		<h1 class="mom">& Be</h1>
		<h1>Proud</h1>
	</Box>
	<Box slot="2">
		<form method="POST" action="{base}/login?/login">
			<h2>Log in</h2>
			<input on:change={clearErr}
				type="text"
				placeholder="Email"
				name="email"
				pattern={String.raw`\w+@\w+\.[a-z]{2,}$`}
				title="user@example.com"
				required
			/>
			<input on:change={clearErr}
				type="password"
				placeholder="Password"
				name="password"
				pattern={String.raw`(?=.*\d)(?=.*[a-zA-Z]).{8,}`}
				title="At least one number and one lowercase letter, 8 or more characters"
				required
			/>
			<div class="buttonbar">
				<Button type="submit" formaction="{base}/login?/login" appearence="solid">Login</Button>
				<Button type="submit" formaction="{base}/login?/register" appearence="inverse"
					>Register</Button
				>
				<Button type="submit" formaction="{base}/login?/google" appearence="transparent">
					<img class="alterlog" src="{base}/favicon.png" alt="google" />
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
