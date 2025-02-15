<script>
    export let level;
    export let star;
</script>

<div class="star" bind:this={star}>
    <img src="/images/galaxy/main-star/main-star-{level}.svg" alt="Star">
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