<script>
	import { base } from '$app/paths';
	import { Button, Box, ColumnTable } from '$lib';
</script>

<ColumnTable sizes={[{ percentage: 62 }, { percentage: 38 }]}>
	<Box slot="1">
		<h1>Create</h1>
		<h1 class="mom">& Be</h1>
		<h1>Proud</h1>
	</Box>
	<Box slot="2">
		<form>
            <h2>Log in</h2>
            <input type="text" placeholder="Login">
            <input type="password" placeholder="Password">
			<div class="buttonbar">
				<Button type="submit" value="login" appearence="solid">Login</Button>
				<Button type="submit" value="register" appearence="inverse">Register</Button>
				<Button type="submit" value="google" appearence="transparent">
					<img class="alterlog" src="{base}/favicon.png" alt="google" />
				</Button>
			</div>
		</form>
	</Box>
</ColumnTable>

<style>
    h2 {
        margin-left: 10px;
        margin-bottom: 25px;
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
