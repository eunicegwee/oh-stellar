<script>
    import Header from "$lib/components/header/Header.svelte";

    import { goto } from "$app/navigation";
    import Cookies from "js-cookie";
  
    export let data;
  
    const { navLinks } = data;
    import { onMount } from "svelte";
  
    let main;
    let header;
    let username;

    $: username = Cookies.get("username");

    onMount(() => {
        username = Cookies.get("username");
    });

</script>
  
<Header bind:header={header} {navLinks} {username}/>
<main bind:this={main}>
    <slot />
</main>
  
<style>
    html {
        margin: 0;
    }

    main {
      flex-grow: 1;
      background-color: #110420;
    }
  
    @media (max-width: 992px) {
      main {
        display: flex;
        flex-direction: column;
      }
    }
</style>  

