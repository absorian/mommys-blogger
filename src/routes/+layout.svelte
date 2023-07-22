<script>
	import { base } from "$app/paths";
	import { Button } from '$lib';

	const stickyOffset = 25; // space between content and header
	const headerHeight = 86;
	let scrollPos = 0;
</script>

<svelte:window bind:scrollY={scrollPos} />

<header>
	<div class="headercontent {scrollPos > stickyOffset ? 'sticky' : 'shadow'}">
		<nav>
			<Button appearence="solid" href="{base}/login">Log in</Button>
            <Button appearence="transparent" href="{base}/about">About</Button>
		</nav>
		<Button href="{base}/" appearence="transparent">
			Mommys Blogger
		</Button>
	</div>
</header>

<div id="contents">
	<main style="margin-top: {stickyOffset + headerHeight}px;">
		<slot />
	</main>

	<footer class="shadow">
	</footer>
</div>

<style>
    @font-face { 
        font-family: AlloyInk; 
        src: url('AlloyInk.otf'); 
    }

	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
			Cantarell, 'Helvetica Neue', sans-serif; 
        /* hue: 254 */
		--accent-col: rgb(112, 69, 255);
		--accent-light-col: rgb(165, 139, 252);
		--accent-darker-col: rgb(62, 38, 141);
		--background-col: rgb(246, 246, 246);
		--background-second-col: rgb(220, 209, 255);
		--accent-light-tint: rgba(220, 209, 255, 0.6);

		--round-main: 1.4em;
		--main-width: 80em;
        --short-width: 50em;
	}

	:global(html, body) {
		position: relative;
		width: 100%;
		height: 100%;
	}

	:global(body) {
		background-color: var(--background-col);
		padding: 0 40px;
	}

	#contents {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	main {
		flex-grow: 1;
		flex-shrink: 0;

		margin: 0 auto;
		max-width: var(--short-width);
	}

	footer {
		flex-grow: 0;
		flex-shrink: 1;

		max-width: var(--main-width);
		margin: 0 auto;
		width: 100%;

		border-radius: var(--round-main) var(--round-main) 0 0;
		background-color: white;
		padding: 20px 30px;

		display: flex;
		justify-content: center;
	}

	footer > :global(.Button) {
		margin-left: 30px;
	}

	.contactico {
		max-height: 3em;
	}

	header {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		width: 100%;
		padding: 0 40px;
		z-index: 99;
	}

	.headercontent {
		background-color: white;
		border-radius: 0 0 var(--round-main) var(--round-main);
		padding: 20px 30px;
		display: flex;
		justify-content: space-between;

		max-width: var(--main-width);
		margin: 0 auto;

		transition: all 250ms ease-out;
	}

	.headercontent.sticky {
		box-shadow: 0 0 20px #0000001a;
		transform: scale(1.005, 1.01);
	}

	.headercontent > nav {
		margin: auto 0;
		display: inline-block;
	}

	.headercontent > nav > :global(.Button) {
		text-align: center;
		margin: auto 0;
		margin-right: 60px;
	}

    /* logo */
	.headercontent > :global(.Button) { 
		margin-left: auto;
        margin-right: 15px;
        color: var(--accent-col);
        font-family: AlloyInk;
        font-size: 2em;
        padding-top: 5px;
        -webkit-font-smoothing: subpixel-antialiased;
        will-change: transform;
    }

    :global(input, [contenteditable="plaintext-only"]) {
        background-color: transparent;
        border: none;

        padding: 10px;
    }
    :global(input) {
        height: 2em;
    }
    :global(::placeholder) { 
        color: var(--accent-light-col);
    }
    :global(input:focus, [contenteditable]:focus) {
        border-radius: 10px;
        /* border: none; */
        outline: none;
        /* outline: solid 3px var(--accent-col); */
        box-shadow: 0 0 10px var(--accent-light-tint);
    }



	:global(:not(img).shadow) {
		box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.01);
	}
	:global(img.shadow) {
		filter: drop-shadow(0 0 0.5em rgba(0, 0, 0, 0.05));
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(::-webkit-scrollbar) {
		width: 7px;
		height: 7px;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--background-col);
		border-radius: 5px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: var(--accent-light-col);
		border-radius: 5px;
	}
</style>
