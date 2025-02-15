<script>
    import { onMount } from 'svelte';
    import Planet from '$lib/components/galaxy/Planet.svelte';

    let username = "user";

    let scrollY;
    let planets = [];

    function handleScroll() {
        scrollY = window.scrollY;
        console.log(scrollY);

        const bg = document.querySelector('.bg');
        const galaxyBg = document.getElementById('galaxy-bg');
        const orbit = document.getElementById('orbit-container');
        const logoName = document.getElementById('logo-name');
        const subtext = document.querySelector('.subtext');

        const logo = document.getElementById('logo');

        if(galaxyBg && scrollY <= 100) {
            galaxyBg.style.opacity = (scrollY / 100)*0.5;
            orbit.style.opacity = scrollY / 100;

            if (orbit.contains(logo)) {
                logo.classList.remove('orbit-container');
                bg.appendChild(logo);
                logo.style.position = "absolute";
                logo.style.left = '50%';
                logo.style.top = '50%';
                logo.style.transform = 'translate(-50%, -50%)';
            }
            
            const orbitWidth = orbit.clientWidth;

            logo.style.width = `${800 - ((scrollY / 100) * 600)}px`;
            logo.style.left = `${50 + (scrollY / 100) * ((orbitWidth / 2) / window.innerWidth) * 100}%`;
            logoName.style.opacity = 0;
            logoName.style.width = "700px";

        } else if (100 < scrollY <= 200) {
            if(scrollY <= 150) {
                logoName.style.opacity = ((scrollY - 100) * 2) / 100;
            } else if(scrollY <= 200){
                logoName.style.width = `${700 + (scrollY - 100)}px`;
            }

            subtext.style.opacity = (scrollY - 100) / 100;
            
            const radiusX = orbit.clientWidth / 2 - 20;
            const radiusY = orbit.clientHeight / 2 - 20;
            
            const centerX = orbit.clientWidth / 2;
            const centerY = orbit.clientHeight / 2;

            if (!orbit.contains(logo)) {
                orbit.appendChild(logo);
                const angle = (1 / 6) * (2 * Math.PI);
                logo.style.position = "relative";
                logo.style.left = `${Math.cos(angle) * radiusX + centerX}px`;
                logo.style.top = `${Math.sin(angle) * radiusY + centerY}px`;
            }

            for (let i = 0; i < 6; i++) {
                const angle = ((((scrollY - 100) / 100) * 1 / 3 ) + (i / 6)) * (2 * Math.PI);
                const x = Math.cos(angle) * radiusX + centerX;
                const y = Math.sin(angle) * radiusY + centerY;

                if (planets[i]) {
                    planets[i].style.left = `${x}px`;
                    planets[i].style.top = `${y}px`;
                }
            }

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
        <img src="/images/logo.png" alt="logo" class="logo" id="logo" bind:this={planets[0]}/>
    
        <div class="orbit-container" id="orbit-container">
            {#each Array(5) as _, i}
                <Planet i={i + 1} bind:planet={planets[i + 1]} />
            {/each}
        </div>
        <img src="/images/name-pink-glow.svg" alt="OhStellar" id="logo-name"/>
        <p class="subtext">
            Overcome addictions together! 
            <a class="highlight" href="/payment/{encodeURIComponent(username)}">Donate</a> or 
            <a class="highlight" href="/login">sign up now!</a>
        </p>
        <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>
    </div>
</div>

<style>
    .scroll-space {
        height: 110vh; /* Creates enough scrollable space */
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
        top: 45%;
        left: 50%;
        width: 700px;
        transform: translate(-50%, -50%);
        z-index: 1;
        opacity: 0;
    }

    .logo {
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
        height: 90%;
        bottom: 5%;
        border-radius: 50%;
        border: 2px dashed rgba(255, 255, 255, 0.3);
        opacity: 0;
        z-index: 1;
    }

    .subtext {
        font-size: 30px;
        color: white;
        z-index: 1;
        top: 60%;
        position: absolute;
        opacity: 0;
    }

    .highlight {
        color: #EE8843;
        font-weight: bold;
        text-decoration: underline;
    }

    @media (max-width: 1300px) {
        #logo-name {
            width: 500px;
        }

        .subtext {
            font-size: 20px;
        }
    }
</style>