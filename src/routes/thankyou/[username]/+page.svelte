<script>
    import { page } from '$app/stores';
    let username = "";
    $: username = $page.params.username;
</script>

<main>
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>

    <div class="thankyou-container">
        <div class="thankyou-name">
            <img src="/images/small-star-1.svg" alt="Star">
            <h2>Thank you for donating to {username}'s Star! </h2>
            <img src="/images/small-star-1.svg" alt="Star">
        </div>

        <h6> Your payment will be processed and completed shortly. </h6>

        <div class="thankyou-message">
            <img src="/images/logo.png" alt="Logo" class="logo" />
            <img src="/images/MessageBox/ThankYouMessage.svg" alt="Thank You"/>
        </div>

        <img src="/images/name-pink.svg" alt="OhStellar Logo" class="ohstellar-logo" />
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: black;
        position: relative;
    }

    .logo {
        margin-bottom: 20px;
        z-index: 1;
    }

    .thankyou-container {
        background-color: #5A3878;
        color: #E2C8DC;
        padding: 3rem;
        border-radius: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        width: 1000px;
        text-align: center;
        z-index: 1;
        display: flex;
        flex-direction: column;
    }

    .thankyou-message {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        position: relative;
    }

    .thankyou-message img {
        max-width: 50%;
        height: auto;
        object-fit: contain;
    }

    .ohstellar-logo {
        width: 80px;
        display: flex;
        margin: 15px auto 5px auto;
    }

    .thankyou-container, .thankyou-container h6 {
        font-family: Lato, serif;
    }

    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5; 
    }

    .thankyou-name img {
        height: 2em;
    }

    .thankyou-name {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .thankyou-name h2 {
        margin: 0;
    }

    .planet-message-box {
        display: flex;
        align-items: center; /* Vertically aligns items */
        justify-content: center; /* Centers items horizontally */
        gap: 10px; /* Adds space between elements */
        margin-top: 20px;
    }

    .logo {
        margin-right: 30px;
    }

    .message-image {
        margin-left: -100px;
    }
</style>

