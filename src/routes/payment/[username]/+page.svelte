<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

// Extract the username from the route
    let username = "";
    $: username = $page.params.username;
    let donorname = "";
    let donateamount = "";
    let walletaddress ="";
    let email = "";
    let errors = {}; 
    let isLoading = false; 

    function handlePayment(event) {
        event.preventDefault();
        if (Object.keys(errors).length > 0) return; // prevent signup if there's an error
        console.log("Paying with", donorname, donateamount, walletaddress, email);
    }

    function hideInputs(hide) {
        document.querySelectorAll(".input-group").forEach(input => {
            input.classList.toggle("hidden", hide);
        });
    }

    async function checkUser() {
        errors = {}; // reset errors

        if (!donorname.trim()) {
            errors.donorname = "Donor Name cannot be empty!";
        }

        if (!donateamount.trim()) {
            errors.donateamount = "Donate amount cannot be empty!";
        }

        if (!walletaddress.trim()) {
            errors.walletaddress = "Wallet address cannot be empty!";
        }

        if (!email.trim()) {
            errors.email = "Email cannot be empty!";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) { // regular expression syntax
            errors.email = "Invalid email format!";
        }

        // stop if validation errors exist
        if (Object.keys(errors).length > 0) {
            return;
        }

        isLoading = true; // start API loading state
        hideInputs(true);

        try {
            const response = await fetch(`https://olive-walls-cough-103-181-222-27.loca.lt/donation`, {
                method: "POST",
                headers: {
                    "bypass-tunnel-reminder": "HI",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    walletAddress: "https://ilp.interledger-test.dev/addict",
                    amount: "1.00",
                    currency: "USD"
                })
            });

            const data = await response.json(); // Parse JSON response
            console.log("Logged in successfully:", data);
            if(data.username) {
                Cookies.set("username", data.username, { expires: 1, path: "/" });
                goto(`/galaxy/${username}`);
            }

        } catch (err) {
            console.error("Login error:", err);
            if (response.status === 404) {
                errors.email = "User not found!";
                return;
            }
            errors.username = "An error occurred while checking the user.";
        }
    }
</script>

<main>
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>
    <img src="/images/logo.png" alt="Logo" class="logo" />
    <div class="payment-container">
        <form on:submit={handlePayment}>
            <div class="galaxy-name">
                <img src="/images/small-star-1.svg" alt="Star">
                <h2>Donate To Our {username}'s Star! </h2>
                <img src="/images/small-star-1.svg" alt="Star">
            </div>

            <h6> Key in your personal information: </h6>

            <div class="input-group">
                <label for="donorname">Donor's Name</label>
                <input type="text" id="donorname" bind:value={donorname} required />
                <!-- <div class="underline"></div> -->
                 
                {#if errors.donorname}
                    <p class="error-message">{errors.donorname}</p>
                {/if}
            </div>
 
            <div class="input-group">
                <label for="donateamount">Donate Amount</label>
                <input type="donateamount" id="donateamount" bind:value={donateamount} required />
                <!-- <div class="underline"></div> -->

                {#if errors.donateamount}
                    <p class="error-message">{errors.donateamount}</p>
                {/if}
            </div>

            <div class="input-group">
                <label for="walletaddress">Wallet Address</label>
                <input type="walletaddress" id="walletaddress" bind:value={walletaddress} required />
                <!-- <div class="underline"></div> -->

                {#if errors.walletaddress}
                    <p class="error-message">{errors.walletaddress}</p>
                {/if}
            </div>

            <div class="input-group">
                <label for="email">User Email Address</label>
                <input type="email" id="email" bind:value={email} required />
                <!-- <div class="underline"></div> -->

                {#if errors.email}
                    <p class="error-message">{errors.email}</p>
                {/if}
            </div>

            <!-- button to check user before proceeding -->
            <button on:click={checkUser} type="button" class="next-button" disabled={isLoading}>
                {#if isLoading}
                    Checking...
                {:else}
                    Donate here
                {/if}
            </button>

            <!-- show loading text while checking -->
            {#if isLoading}
                <p class="loading-message">Checking user inputs...</p>
            {/if}
            <div class="donate-msg">
                <div class="message-content">
                    <img src="/images/MessageBox/DonateMessageBox.svg" alt="donate-msg" class="donate-box" />
                    <h4>A message from {username}:</h4>
                    <p>Your generosity is more than just money—it’s a lifeline. 
                    Every day I fight to quit, I remember your belief in me. 
                    Thank you for giving me hope and a reason to keep going.</p>
                </div>
            </div>
            <img src="/images/name-pink.svg" alt="OhStellar Logo" class="ohstellar-logo" />
        </form>
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
        width: 150px;
        margin-bottom: 20px;
        z-index: 1;
    }

    .payment-container {
        background-color: #5A3878;
        color: #E2C8DC;
        padding: 3rem;
        border-radius: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        width: 1000px;
        height: 1050px;
        text-align: center;
        z-index: 1;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
    }

    .input-group {
        margin-bottom: 1.5rem;
        text-align: left;
        position: relative;
    }

    label {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 0.5rem 0;
        background-color: transparent;
        color: #E2C8DC;
        border: none;
        border-bottom: 2px solid #E2C8DC;
        outline: none;
        font-size: 1rem;
    }

    input:focus {
        border-bottom-color: #E2C8DC;
    }

    .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #E2C8DC;
    }

    .next-button {
        width: 20%;
        background-color: #E2C8DC;
        color: #5A3878;
        font-weight: bold;
        padding: 0.75rem;
        border-radius: 12px;
        margin-top: 1.5rem;
        cursor: pointer;
    }

    .next-button:hover {
        background-color: #DAB3C8;
    }

    .ohstellar-logo {
        width: 80px;
        display: flex;
        margin: 15px auto 5px auto;
    }

    .stars-image {
        width: 100%;
        max-width: 500px;
        margin-top: 20px;
    }

    .small-star-1-logo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .error-message {
        color: red;
        font-size: 0.9rem;
        margin-top: 5px;
        text-align: center;
    }

    .loading-message {
        color: #E2C8DC;
        font-size: 0.9rem;
        margin-top: 10px;
        text-align: center;
    }

    .input-group, .loading-message, .galaxy-name h2, .message-content, .donate-msg {
        font-family: Lato, serif;
    }

    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5; 
    }

    .galaxy-name img {
        height: 2em;
    }

    .galaxy-name {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .galaxy-name h2 {
        margin: 0;
    }

    .donate-msg {
        position: relative;
        top: 30%;
        right: -65%;
        width: 320px;
        height: auto;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }

/* donate box img */
    .donate-box {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0px;
        left: 0;
        z-index: -1; /* Sends the image to the background */
    }

/* msg content inside the box */
    .message-content {
        position: absolute;
        width: 80%;
        height: 50px;
        color: #5A3878;
        font-size: 0.9rem;
        line-height: 1.4;
        text-align: center;
        padding: 20px;
        z-index: 1; /* ensures text stays above image */
    }

    .message-content h4 {
        font-weight: bold;
        margin-bottom: 8px;
    }

</style>

