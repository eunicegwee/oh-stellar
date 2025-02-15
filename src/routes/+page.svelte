<script>
    import { onMount } from 'svelte';
    import Planet from '$lib/components/galaxy/Planet.svelte';

    let scrollY;
    let planets = [];

    function handleScroll() {
        scrollY = window.scrollY;
        console.log(scrollY);

        const galaxyBg = document.getElementById('galaxy-bg');
        const orbit = document.getElementById('orbit-container');
        const logoName = document.getElementById('logo-name');

        const logo = document.getElementById('logo');

        if(galaxyBg && scrollY <= 100) {
            galaxyBg.style.opacity = (scrollY / 100)*0.5;
            orbit.style.opacity = scrollY / 100;

            const orbitWidth = orbit.clientWidth;

            logo.style.width = `${800 - ((scrollY / 100) * 600)}px`;
            logo.style.left = `${50 + (scrollY / 100) * ((orbitWidth / 2) / window.innerWidth) * 100}%`;
        }

        if (100 < scrollY <= 200) {
            logoName.style.opacity = (scrollY - 100) / 100;
        }

    }
  
    // Update scroll position
    onMount(() => {
        window.addEventListener('scroll', handleScroll);

        const orbit = document.getElementById('orbit-container');

        const radiusX = orbit.clientWidth / 2 - 20;
        const radiusY = orbit.clientHeight / 2 - 20;
        
        const centerX = orbit.clientWidth / 2;
        const centerY = orbit.clientHeight / 2;

        for (let i = 1; i < 6; i++) {
            const angle = (i / 6) * (2 * Math.PI);
            const x = Math.cos(angle) * radiusX + centerX;
            const y = Math.sin(angle) * radiusY + centerY;

            if (planets[i]) {
                planets[i].style.position = "absolute";
                planets[i].style.left = `${x}px`;
                planets[i].style.top = `${y}px`;
                planets[i].style.transform = "translate(-50%, -50%)";
                planets[i].style.visibility = "visible";
                planets[i].style.animation = "none";
            }
        }
    
        return () => window.removeEventListener('scroll', handleScroll);
    });
  
</script>

<div class="scroll-space">
    <div class="bg">
        <img src="/images/logo.png" alt="logo" id="logo" bind:this={planets[0]}/>
    
        <div class="orbit-container" id="orbit-container">
            {#each Array(5) as _, i}
                <Planet i={i + 1} bind:planet={planets[i + 1]} />
            {/each}
        </div>
        <img src="/images/name-pink.svg" alt="OhStellar" id="logo-name"/>
        <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>
    </div>
</div>

<style>
    .scroll-space {
        height: 300vh; /* Creates enough scrollable space */
        overflow-x: hidden;
    }

    .bg {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 80px 140px;
        position: fixed;
        flex-direction: column;
        background-color: #110420;
    }

    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0;
    }

    #logo-name {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 800px;
        transform: translate(-50%, -50%);
        z-index: 1;
        opacity: 0;
    }

    #logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        z-index: 1;
    }

    .orbit-container {
        position: relative;
        width: 90%;
        height: 1000px;
        border-radius: 50%;
        border: 2px dashed rgba(255, 255, 255, 0.3);
        opacity: 0;
        z-index: 1;
    }
</style>