<script>
    import { onMount } from "svelte";    
    
    // export let data;
    let streak=100;
    let level=2;
    let money_donated_so_far=55;
    let money_contributed_by_donors=15;
    let money_donated_personally=40;
    let total_days_without_addiction=30;
    let days_till_next_mile=10; 
    let widthbar = days_till_next_mile/30 * 70;
    let percentage = Math.round(days_till_next_mile/30 * 1000)/10;
        
    const data = fetch('https://olive-walls-cough-103-181-222-27.loca.lt/milestone-stats?username=jfes', {
        method: "GET",
        headers: {
            "bypass-tunnel-reminder": "HI",
            "Content-Type": "application/json"
        }
    })  
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
    
    // $: if (data) {
    //     level = data.level + 5;  // Assign level after data is fetched
    // }

    onMount(() => {
        const milestoneBar = document.querySelector('.milestone-bar');
        const percentageText = document.getElementById('percentange-text');

        let percentage = 0;

        function increaseWidth() {
            if (percentage < widthbar) {
                percentage++;
                milestoneBar.style.width = `${percentage}%`;
                percentageText.style.opacity = `${percentage / widthbar}`;

                setTimeout(increaseWidth, 10);
            }
        }

        increaseWidth();
    });
</script>

<div class="background">
    <div class="overlay"></div>

    <div class="rectangle">
        <div class="background-bar"></div>
        <div class="milestone-bar"></div>
        <img src="/images/MessageBox/MilestoneBar.svg" alt="BarFrame" class="barframe">
        <div class="text-bar">
            <h1 id="percentange-text">{percentage}%</h1>
        </div>
        <div class="text-box">
            <h2>My Milestones</h2>
        </div>

        <div class="text-box-more">
            <p><strong>Money Donated So Far:</strong> ${money_donated_so_far}</p>
            <p><strong>Money Contributed by Donors:</strong> ${money_contributed_by_donors}</p>
            <p><strong>Money Donated Personally:</strong> ${money_donated_personally}</p>
            <p><strong>Level of Alien:</strong> {level}</p>
            <p><strong>Total Days Without Addiction:</strong> {total_days_without_addiction} days</p>
            <p><strong>Days to next milestone:</strong> {days_till_next_mile} days</p>
        </div>
    </div>

    <div class="container">
        <img src="/images/MessageBox/DonateMessageBox.svg" alt="MessageBox" class="donate-box">
        <img src="/images/alien/Alienbg.png" alt="Alien Background" class="alien-bg" />
        <img src="/images/alien/Baby{level}.png" alt="Alien" class="alien">
      </div>

    <div class="streakcontain">
        <img src="/images/MessageBox/StreakRocket.png" alt="Streaks" class="streaksplannet">
        <input type="text" id="streak" bind:value={streak} readonly />
    </div>

</div>

<style>
.text-bar {
    position: absolute;
    top: 78%;
    left: 42%;
    width: 60%;
    color: #5A3878;
}

.text-box-more {
    position: absolute;
    top: 12%;
    left: 9%;
    width: 60%;
}

p {
    font-size: 1.5vw;
    margin: 1.2vw 0;
    line-height: 1.6;
    color: #E2C8DC;
    display: flex;
    align-items: center;
    gap: 10px;
}

.text-box-more p::before {
    content: "";
    background-image: url('/images/BulletPointStar.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 1.2em; /* Adjust to match text size */
    height: 1.2em;
    margin-right: 10px;
}

.text-box {
    position: absolute;
    top: 4%;
    left: 38%;
}

h2 {
    font-size: 40px;
    font-weight: bold;
    color: #E2C8DC;
    text-decoration: underline;
    text-underline-offset: 5px; /* Adjust underline spacing */
}

.alien {
    position: absolute;
    top: 51%;
    left: 48%;
    transform: translate(-50%, -50%);
    width: 79%;
    height: auto;
    max-width: 100%;
    border-radius: 20px;
    animation: bounce 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes bounce {
    0%   { transform: translate(-50%, -50%); } /* Start Position */
    30%  { transform: translate(-50%, -60%); } /* Upward Peak */
    50%  { transform: translate(-50%, -48%); } /* Slight Overshoot Down */
    70%  { transform: translate(-50%, -52%); } /* Small Rebound */
    100% { transform: translate(-50%, -50%); } /* Back to Center */
}

.streakcontain {
    position: absolute;
    width: 62%;
    height: 68%;
    top: 50%;
    left: 83%;
    transform: translate(-50%, -50%);
}

#percentange-text {
    opacity: 0;
}

.milestone-bar {
    width: 0%;
    position: absolute;
    bottom: 13%;
    left: 11%;
    height: 10%;
    background: linear-gradient(to right, #1EB713, #42E637, #1EB713);;
    transition: width 0.1s ease-in-out;
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
    top: 5%;
    left: -21%;
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
    transform: translate(-50%, -50%);
}

.streaksplannet {
    position: absolute;
    top: 15%;
    left: 11%;
    width: 54%;
    height: 70%;
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
    top: 25%;
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
    height: 66%;
    background: #5A3878;
    top: 50%;
    left: 38%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
}
</style>