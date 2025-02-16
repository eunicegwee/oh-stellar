<script>
    import ProfileInput from "$lib/components/form/ProfileInput.svelte";
    import Star from "$lib/components/galaxy/Star.svelte";
    let name = "apple";
    let email;
    let wallet;
    let addiction;
    let donationMessage;
    let userLevel = 1;
    let star;
    let username = "name";
    import {onMount} from "svelte";

    let editStatus = false;

    function changeEditStatus(){
        editStatus = !editStatus;
    }

    onMount(() => {
        const starContainer = document.querySelector('.star-container');

        if (star) {
            star.style.position = "relative";
            star.style.height="100%";
            star.style.width="60%";
            star.style.transform = "translate(-50%, -50%)";
            star.style.visibility = "visible";
            star.style.top="50%";
            star.style.left="50%";
        }

    })
</script>
  
  
<div class="galaxy">
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg" >
    <div class="star-container">
        <div class="star">
            <Star level={userLevel} bind:star={star}/>  
            <img class="smallstar" src="/images/small-star-3.svg" alt="small star">
            <img class="smallstar2" src="/images/small-star-2.svg" alt="small star 2">  
        </div>
        <p class="username">{username}'s Star</p> 
    </div>
    
    <div class="details">
      <div class="profile">
        <div class="profile-title">
            <img src="/images/BulletPointStar.svg" alt="profile star">
            <p>Profile</p>
        </div>
        <button class="edit-button" on:click={changeEditStatus}>
            {#if editStatus}
                <img src="/images/Vector.svg" alt="tick">              
            {:else}
                <img src="/images/EditButton.svg" alt="edit button">
            {/if}
        </button>
      </div>
      <ProfileInput id="name" title="Name" {editStatus} input={name}/>
      <ProfileInput id="email" title="Email" {editStatus} input={email}/>
      <ProfileInput id="wallet" title="Wallet Address" {editStatus} input={wallet}/>
      <ProfileInput id="addiction" title="Addiction" {editStatus} input={addiction}/>
      <ProfileInput id="donationMessage" title="Donation Message" {editStatus} input={donationMessage}/>
      <img class="logo "src="/images/name-pink.svg" alt="OhStellar">
    </div>
  </div>
  
  
  <style>
    .galaxy {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 140px;
        gap: 20px;
        position: relative;
      }
  
  
    .smallstar{
      height: 30%;
      position: relative;
      width: 15%;
      left: 20%;
      bottom: 100%;
    }
  
    .smallstar2{
      height: auto;
      width: 15%;
      position: relative;
      left: 50%;
      bottom: 30%;
    }
  
    .details {
      background-color: #583878;
      border-radius: 20px;
      width: 50%;
      box-sizing: border-box; 
      display: flex;
      flex-direction: column;
      padding: 50px;
      z-index: 1;
    }
 
    .profile {
        color: #E2C8DC;
        text-align: center;
        font-family: 'Lato';
        font-size: 3vw;
        font-weight: bolder;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .profile-title {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: center;
        height: 3vw;
    }

    .profile-title img {
        height: 3vw;
    }

    .profile-title p {
        margin: 0;
    }

    .star-container {
        height: 100%;
        width: 50%;
        z-index: 1;
        position: relative;
    }
  
    .star {
        height: 80%;
    }

    .username {
        font-family: "Lato";
        font-size: 50px;
        font-weight: bold;
        color: #E2C8DC;
        position: relative;
        display: flex;
        z-index: 1;
        flex-wrap: wrap;
        align-content: flex-end;
        justify-content: space-evenly;
        /* top: 30%;
        right: 5%; */
    }

    .edit-button {
        position: relative; 
        left: 30%;
        height: 50%;
        background: none;
        border: none;
    } 

    .edit-button img {
        position: relative;
        width: 100%;
        display: flex;
    }
    
    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5;   
        z-index: 0;
        background-size: 100% 100%;
    }

    .logo {
        position: relative;
        height: 20%;
        width: 20%;
        top: 5%;
        margin: auto;
    }
  </style>