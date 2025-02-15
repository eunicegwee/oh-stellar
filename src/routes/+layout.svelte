<script>
    import Header from "$lib/components/header/Header.svelte";
  
    export let data;
  
    const { navLinks } = data;
    import { onMount } from "svelte";
  
    let main;

</script>
  
<Header {navLinks} />
<main bind:this={main}>
    <slot />
</main>
  
<style>
    html {
        margin: 0;
    }

    main {
      flex-grow: 1;
      background-color: #110420
    }
  
    @media (max-width: 992px) {
      main {
        display: flex;
        flex-direction: column;
      }
    }
</style>  

