<script>
    let percentage = 20; // Initial percentage
    let streak = 20;
    let level = 1;

    function increaseStreak() {
        streak += 1; // Increment the streak by 1
    }

    function resetStreak() {
        streak = 0;
    }
</script>

<div class="background">
    <div class="overlay"></div>

    <div class="rectangle">
        <div class="background-bar"></div>
        <div class="milestone-bar" style="width: {percentage}%"></div>
        <img src="/images/MessageBox/MilestoneBar.svg" alt="BarFrame" class="barframe">
      </div>
    
    <div class="streakcontain">
        <img src="/images/MessageBox/StreaksPlannet.svg" alt="Streaks" class="streaksplannet">
        <label for="streak">Streak: </label>
        <input type="text" id="streak" bind:value={streak} readonly />
    </div>

    <div class="container">
        <img src="/images/MessageBox/DonateMessageBox.svg" alt="MessageBox" class="donate-box">
        <img src="/images/alien/Alienbg.png" alt="Alien Background" class="alien-bg" />
        <img src="/images/alien/Baby{level}.png" alt="Alien" class="alien">
      </div>
</div>

<style>

.alien {
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 88%;
    height: auto;
    max-width: 100%;
    border-radius: 20px;
    animation: bounce 0.8s ease-in-out;
}

.alien:hover {
    animation: bounce 0.6s ease-in-out; /* Restart bounce */
}

@keyframes bounce {
    0%, 100% { transform: translate(-50%, -50%); } /* Stay centered */
    50% { transform: translate(-50%, -55%); } /* Move up slightly */
}

.streakcontain {
    position: absolute;
    width: 62%;
    height: 68%;
    top: 50%;
    left: 39%;
    transform: translate(-50%, -50%);
}

.milestone-bar {
    position: absolute;
    bottom: 13%;
    left: 11%;
    height: 10%;
    background-color: #4caf50;
    transition: width 0.5sease;
  }

.background-bar {
    position: absolute;
    bottom: 13%;
    left: 11%;
    height: 10%;
    width: 70%;
    background-color: #D9D9D9;
    transition: width 0.5sease;
}

input {
    position: absolute;
    top: 4%;
    left: -29%;
    width: 80%;
    text-align: center;
    font-family: 'Arial', sans-serif;
    font-size: 80px;
    font-weight: 800;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    background-color: transparent;
    border: none;
    color: #EE8843;
  }

/* Background Styling */
.background {
    width: 100vw;
    height: 100vh;
    background: #120A23; /* Dark purple background */
    position: relative;
    overflow: hidden;
}

.barframe {
    position: absolute;
    top: 83%;
    left: 46%;
    width: 78%;
    height: 100%;
    transform: translate(-50%, -50%);
}

.streaksplannet {
    position: absolute;
    top: 16%;
    left: 11%;
    width: 41%;
    height: 100%;
    transform: translate(-50%, -50%);
}


/* Overlay Image */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/galaxy/galaxy-bg.jpg') center/cover no-repeat;
    opacity: 0.5; /* 50% opacity */
}

.container {
    position: relative;
    display: inline-block;
    top: 24%;
    left: 64%;
    width: 30%;
}

.donate-box {
  display: block;
  width: 100%; /* Set width to 100% of the container */
  height: auto;
  position: relative; /* Makes the donate box a reference for the alien-bg */
}

.alien-bg {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 88%;
    height: auto;
    max-width: 100%;
    border-radius: 20px;
}

/* Purple Rectangle */
.rectangle {
    position: absolute;
    width: 62%;
    height: 68%;
    background: #5A3878;
    top: 50%;
    left: 39%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
}
</style>