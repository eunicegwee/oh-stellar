<script>
    import { goto } from "$app/navigation";
    import Cookies from "js-cookie";

    let username = "";
    let email = "";
    let password = "";
    let errors = {}; // store multiple input errors
    let isLoading = false; // track loading state

    function handleSignup(event) {
        event.preventDefault();
        if (Object.keys(errors).length > 0) return; // prevent signup if there's an error
        console.log("Signing up with", username, email, password);
    }

    function hideInputs(hide) {
        document.querySelectorAll(".input-group").forEach(input => {
            input.classList.toggle("hidden", hide);
        });
    }

    async function checkUser() {
        errors = {}; // reset errors

        if (!username.trim()) {
            errors.username = "Username cannot be empty!";
        }

        if (!password.trim()) {
            errors.password = "Password cannot be empty!";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long!";
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
            // simulated API request (Replace this with real API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // example API response (Simulating user exists)
            let data = { exists: Math.random() < 0.5 }; // Replace with real API response

            if (data.exists) {
                errors.email = "User already exists!";
                hideInputs(false);
            } else if (data.ok) {
                Cookies.set("username", data.username, { expires: 1 });
                window.location.reload(true);
            }
        } catch (err) {
            errors.email = "An error occurred while checking the user.";
            hideInputs(false);
        } finally {
            isLoading = false; // stop loading state
        }
    }
</script>

<main>
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>
    <img src="/images/logo.png" alt="Logo" class="logo" />
    <div class="login-container">
        <form on:submit={handleSignup} class="galaxy-name">
            <div class="signup-star">
                <img src="/images/small-star-1.svg" alt="Star">
                <h2>Sign Up</h2>
                <img src="/images/small-star-1.svg" alt="Star">
            </div>

            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" bind:value={username} required />
                <!-- <div class="underline"></div> -->
                 
                {#if errors.username}
                    <p class="error-message">{errors.username}</p>
                {/if}
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" bind:value={password} required />
                <!-- <div class="underline"></div> -->

                {#if errors.password}
                    <p class="error-message">{errors.password}</p>
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
                    Next
                {/if}
            </button>

            <!-- show loading text while checking -->
            {#if isLoading}
                <p class="loading-message">Checking user inputs...</p>
            {/if}

            <img src="/images/name-pink.svg" alt="OhStellar Logo" class="ohstellar-logo" />
            <p class="signup-text">Already have an account? <a href="/login">Log in here!</a></p>
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
        /* to bring img up */
    }

    .logo {
        width: 150px;
        margin-bottom: 20px;
        z-index: 1;
    }

    .login-container {
        background-color: #5A3878;
        color: #E2C8DC;
        padding: 3rem;
        border-radius: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        width: 420px;
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
        width: 100%;
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

    .signup-text {
        font-size: 0.75rem;
        margin-top: 5px;
        margin-bottom: 10px;
    }

    .signup-text a {
        color: #E2C8DC;
        text-decoration: underline;
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

    .input-group, .signup-text, .signup-star, .loading-message {
        font-family: Lato, serif;
    }

    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5; 
    }

    .signup-star img {
        height: 3em;
    }

    .signup-star {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .signup-star h2 {
        margin: 0;
    }
</style>

