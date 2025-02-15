<script>
    import NavLink from "./NavLink.svelte";
    import { page } from "$app/stores";

    export let navLinks;
    export let header;
    let searchQuery = "";
    
    function handleSearch() {
        if (searchQuery.trim()) {
            window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
        }
    }
</script>

<header bind:this={header}>
    <nav class="nav-links">
        {#each navLinks as { name, href }}
            <NavLink {href} content={name} />
        {/each}
        <label for="galaxy-search" class="searchlabel">
            Galaxy Search:
        </label>
        <div class="search-container">
            <input 
                name="galaxy-search"
                type="text" 
                placeholder="Username" 
                bind:value={searchQuery} 
                on:keydown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button on:click={handleSearch}>🔍</button>
        </div>
        <span class="divider">|</span>
        <NavLink href="/profile" content="Profile" />
        <NavLink href="/galaxy" content="My Galaxy" />
        <NavLink href="/login" content="Login" />
    </nav>

    <div class="leftthings">
         <img src="/images/logo.png" alt="Logo" class="logo">
         <img src="/images/name-pink.svg" alt="Name Pink Logo" class="ohstella"/>
    </div>
</header>

<style>
header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: linear-gradient(to right, #5A3878, #9C528A, #5A3878);
    flex-direction: row-reverse;
}

.searchlabel {
    color: white;
    text-decoration: none;
    margin-left: 15px;
    font-size: 20px;
    font-family: "Lato", serif;
  }

.leftthings {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
}

.ohstella {
    height: 55px;
    position: relative;
}

.logo {
    height: 75px;
}

.nav-links {
    display: flex;
    align-items: center;
}

.divider {
    color: white;
    margin: 0 10px;
}

/* Search bar styles */
.search-container {
    display: flex;
    align-items: center;
    background: white;
    padding: 5px 10px;
    border-radius: 20px;
    margin: 0 15px;
}

.search-container input {
    border: none;
    outline: none;
    padding: 5px;
    width: 150px;
    font-size: 14px;
}

.search-container button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
}
</style>