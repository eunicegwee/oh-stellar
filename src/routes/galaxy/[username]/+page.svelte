<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";

    import Planet from "$lib/components/galaxy/Planet.svelte";
    import Star from "$lib/components/galaxy/Star.svelte";

    import { onMount, onDestroy } from "svelte";

    let planetNo = 12;
    let planets = [];
    let star;

    let userLevel = 3;
    let username = "";
    $: username = $page.params.username;

    onMount(() => {

        const orbit = document.getElementById('orbit-container');
        const radiusX = orbit.clientWidth / 2 - 20;
        const radiusY = orbit.clientHeight / 2 - 20;
        
        const centerX = orbit.clientWidth / 2;
        const centerY = orbit.clientHeight / 2;

        for (let i = 0; i < planetNo; i++) {
            const angle = (i / planetNo) * (2 * Math.PI);
            const x = Math.cos(angle) * radiusX + centerX;
            const y = Math.sin(angle) * radiusY + centerY;

            if (planets[i]) {
                planets[i].style.position = "absolute";
                planets[i].style.left = `${x}px`;
                planets[i].style.top = `${y}px`;
                planets[i].style.transform = "translate(-50%, -50%)";
                planets[i].style.visibility = "visible";
                planets[i].style.animationDelay = `${i * 0.5}s`;
            }
        }

        // Set star to center of orbit
        if (star) {
            star.style.position = "absolute";
            star.style.left = `${centerX}px`;
            star.style.top = `${centerY}px`;
            star.style.transform = "translate(-50%, -50%)";
            star.style.visibility = "visible";
        }

    })
</script>

<div class="galaxy">
    <div class="galaxy-name">
        <img src="/images/small-star-1.svg" alt="Star">
        <h2>{username}'s Galaxy</h2>
        <img src="/images/small-star-1.svg" alt="Star">
    </div>
    <p>Click on star to DONATE!</p>

    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>
    <div class="orbit-container" id="orbit-container">
        {#each Array(planetNo) as _, i}
            <Planet i={i + 1} bind:planet={planets[i]} userTag="user123"/>
        {/each}
        <!-- <Star level={userLevel} bind:star={star} username={username}/> -->
        <Star level={userLevel} bind:star={star} username={username} href="/payment"/>

    </div>

</div>

<style>
    .galaxy-name {
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1;
    }

    .galaxy-name img {
        height: 5em;
    }

    h2 {
        color: white;
        font-size: 2.5rem;
        z-index: 1;
        font-family: Lato, serif;
    }

    p {
        color: white;
        font-size: 1.5rem;
        z-index: 1; 
        margin-bottom: 60px;
        font-style: italic;
        font-family: Lato, serif;
    }

    .galaxy {
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 80px 140px;
        position: relative;
        flex-direction: column;
    }

    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5;   
    }

    .orbit-container {
        position: relative;
        width: 90%;
        height: 80%;
        border-radius: 50%;
        border: 2px dashed rgba(255, 255, 255, 0.3);
    }
</style>
