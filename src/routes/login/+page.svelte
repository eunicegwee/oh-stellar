<script>
	import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";

    let username = "";
    let password = "";
    let errors = {};
    let isLoading = false;
  
    function handleLogin(event) {
      event.preventDefault();
      if (Object.keys(errors).length > 0) return;
      console.log("Logging in with", username, password);
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

        // stop if validation errors exist
        if (Object.keys(errors).length > 0) {
            return;
        }

        isLoading = true; // start API loading state
        hideInputs(true);

        try {
            const response = await fetch(`https://olive-walls-cough-103-181-222-27.loca.lt/login-check?username=${username}&password=${password}`, {
                method: "GET",
                headers: {
                    "bypass-tunnel-reminder": "HI",
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json(); // Parse JSON response
            console.log("Logged in successfully:", data);
            if(data.username) {
                Cookies.set("username", data.username, { expires: 1, path: "/" });
                goto(`/galaxy/${username}`);
            }
            
            // if (data.exists) {
            //     errors.email = "User already exists!";
            // } else if (data.username) {
            //     // Store username in cookies (1-day expiration)
            //     Cookies.set("username", data.username, { expires: 1, path: "/" });

            //     // Reload the page to apply session changes
            //     window.location.reload(true);
            // } else {
            //     errors.email = "Unexpected response from server.";
            // }
        } catch (err) {
            console.error("Login error:", err);
            if (response.status === 404) {
                errors.email = "User not found!";
                return;
            }
            errors.username = "An error occurred while checking the user.";
        } finally {
            isLoading = false; // Stop loading state
        }

        // try {
        //     // Simulated API request (Replace this with real API call)
        //     await new Promise(resolve => setTimeout(resolve, 2000));

        //     // Example API response (Simulating user exists)
        //     let data = { exists: Math.random() < 0.5 }; // Replace with real API response

        //     if (data.exists) {
        //         errors.email = "User already exists!";
        //         hideInputs(false);
        //     } else if (data.ok) {
        //         Cookies.set("username", data.username, { expires: 1 });
        //         window.location.reload(true);
        //     }
        // } catch (err) {
        //     errors.email = "An error occurred while checking the user.";
        //     hideInputs(false);
        // } finally {
        //     isLoading = false; // Stop loading state
        // }
    }

    //Test cookies
    // function checkUser() {
    // //Testing
    // Cookies.set("username", "apple", { expires: 1, path: "/", secure: false });
    // console.log("username", Cookies.get("username"));
    // setTimeout(() => {
    //         window.location.reload(true);
    //     }, 1000);
    // }

    // function debugCookies() {
    //     console.log("Reading cookie AFTER reload:", Cookies.get("username"));
    // }

    // debugCookies();
  </script>
  
  <main>
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg"/>
    <img src="/images/logo.png" alt="Logo" class="logo" />
    <div class="login-container">
      <form on:submit={handleLogin}>
        <div class="galaxy-name">
            <img src="/images/small-star-1.svg" alt="Star">
            <h2 class = "login-head">Log In</h2>
            <img src="/images/small-star-1.svg" alt="Star">
        </div>

        <div class="input-group">
            <label for="username">Username</label>
            <input type="username" id="username" bind:value={username} required />
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

        <button on:click={checkUser} type="button" class="login-button" disabled={isLoading} >
            {#if isLoading} 
                Checking...
            {:else} 
                Log in
            {/if}
        </button>

        {#if isLoading}
            <p class="loading-message">Checking user inputs... </p>
        {/if}

        <img src="/images/name-pink.svg" alt="OhStellar Logo" class="ohstellar-logo" />
        <p class="signup-text">No account? <a href="/signup" class="signup-text">Sign up here!</a></p>
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

    .login-button {
      width: 100%;
      background-color: #E2C8DC;
      color: #5A3878;
      font-weight: bold;
      padding: 0.75rem;
      border-radius: 12px;
      margin-top: 1.5rem;
      cursor: pointer;
    }

    .login-button:hover {
      background-color: #DAB3C8;
    }

    .ohstellar-logo {
      width: 80px;
      display: block;
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
      z-index: 1;
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

    .input-group, .login-button, .signup-text, .login-head {
        font-family: Lato, serif;
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

    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5; 
    }

    .galaxy-name {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .galaxy-name img {
        height: 3em;
    }

    .galaxy-name h2 {
        margin: 0;
    }

  </style>

  