<script lang="ts">
    export let text: string;
    export let editing: boolean = false;
</script>

<p contenteditable="{editing ? "plaintext-only" : "false"}" >{text}</p>

<style>
    p {
        display: block;
        font-size: 1em;
		font-weight: normal;
        margin: 0;
        margin-bottom: 0.5em;
    }
    p:empty::before {
		font-size: medium;
		content: 'Your Text';
		color: var(--accent-light-col);
	}
</style>