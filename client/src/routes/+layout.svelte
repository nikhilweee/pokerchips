<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../styles/global.css';
</script>

<Header />
<slot></slot>
<Footer />
