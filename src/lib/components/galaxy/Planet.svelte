<script>

    export let i;
    export let planet;
    export let userTag;
</script>

<div bind:this={planet} class="planet" id="planet-{i}">
    <img src="/images/galaxy/planets/planet-{i % 4 === 0 ? 4 : i % 4}.svg" alt="Planet {i}"/>
    <span class="tooltip">{userTag}</span>
</div>

<style>
    .planet {
        position: relative;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        /* background: radial-gradient(circle, rgba(229, 199, 222, 1) 0%, rgba(207, 174, 199, 0) 100%); */
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        animation: bounce 1s infinite ease-in-out alternate;
    }

    @keyframes bounce {
        0% {
            transform: translate(-50%, -50%) translateY(-3px);
        }
        100% {
            transform: translate(-50%, -50%) translateY(3px);
        }
    }

    .tooltip {
        position: absolute;
        bottom: 110%; /* Position it above the planet */
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        color: black;
        padding: 6px 10px;
        border-radius: 20px;
        font-size: 14px;
        font-family: "Lato", serif;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
    }

    /* Show tooltip on hover */
    .planet:hover .tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-5px);
        z-index: 1;
    }

    /* .circle {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        display: flex;
    }

    #planet-1 .circle {
        background: linear-gradient(to bottom, #AEC0CF, #92397C);
    }

    #planet-2 .circle {
        background: linear-gradient(to bottom, #AECFB1, #A76B3D);
    }

    #planet-3 .circle {
        background: linear-gradient(to bottom, #CFAEC7, #6D3CD8);
    }

    #planet-4 .circle {
        background: linear-gradient(to bottom, #CFAEC7, #92397C);
    } */
</style>