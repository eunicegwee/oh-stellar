<script>
	import { goto } from "$app/navigation";

    export let level;
    export let star;
    export let href;
    export let username;

    function handleClick(event) {
        if (!href || !username) {
            console.error("Navigation error: href or username is missing", {href, username});
            return;
        }

        goto(`${href}/${encodeURIComponent(username)}`);
    }
</script>



<div class="star" bind:this={star}>
    <img src="/images/galaxy/main-star/main-star-{level}.svg" alt="Star" on:click={handleClick}>
</div>

<style>
    .star {
        position: relative;
        width: 400px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        animation: expand-contract 1.5s infinite ease-in-out alternate;
    }


    @keyframes expand-contract {
        0% {
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1.1); /* Expands slightly */
        }
    }

</style>