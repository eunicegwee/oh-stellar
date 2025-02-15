<script>
    import NavLink from "./NavLink.svelte";
    import { page } from "$app/stores";

    export let navLinks;
</script>

<header>
    <nav class="nav-links">
        {#each navLinks as { name, href }}
            <NavLink {href} content={name} />
        {/each}
        <span class="divider">|</span>
        <!-- Page access yet to be implemented -->
        <!-- {#if $page.data.access} -->
          <NavLink href="/profile" content="Profile" />
          <NavLink href="/galaxy" content="My Galaxy" />
        <!-- {:else} -->
          <NavLink href="/login" content="Login" />
        <!-- {/if} --> 
    </nav>
    <img src="/images/logo.png" alt="Logo" class="logo">
</header>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: linear-gradient(to right, #5A3878, #9C528A, #5A3878);
    flex-direction: row-reverse;
    z-index: 1;
}

.logo {
    height: 50px;
}

.nav-links {
    display: flex;
    align-items: center;
}

.divider {
    color: white;
    margin: 0 10px;
}

</style>