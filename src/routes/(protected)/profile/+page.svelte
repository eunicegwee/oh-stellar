<script>
    // import Star from "$lib/components/galaxy/Star.svelte";
  
    // let star;
  
    let name = "Apple";
  
  </script>
  
  
  <div class="galaxy">
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg" >
    <div class="star">
      <img class="mainstar" src="/images/galaxy/main-star/main-star-1.svg" alt="main star">
      <img class="smallstar" src="/images/small-star-3.svg" alt="small star">
      <img class="smallstar2" src="/images/small-star-2.svg" alt="small star 2">
    </div>
    <div class="details">
      <div class="profile">
        <img src="/images/BulletPointStar.svg" alt="profile star" style="padding: 20px; margin-bottom: 10px">
        <p>Profile</p>
        <button class="edit-button">
            <img src="/images/EditButton.svg" alt="edit button">
        </button>
      </div>
      <div class="name">
        <p>Name: {name} </p>
      </div>
      <div class="email">
        <p>Email:</p>
      </div>
      <div class="wallet">
        <p>Wallet Address:</p>
      </div>
      <div class="addiction">
        <p>Addiction: </p>
      </div>
      <div class="donation-message">
        <p>Donation Message: </p>
      </div>
      <img class="logo "src="/images/name-pink.svg" alt="OhStellar">
    </div>
  </div>
  
  
  <style>
    .galaxy {
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 140px;
        position: relative;
      }
  
  
    .smallstar{
      height: auto;
      position: relative;
      width: 20%;
      bottom: 90%;
      left: 10%;
      
    }
  
    .smallstar2{
      height: auto;
      width: 20%;
      position: relative;
      bottom: 40%;
      left: 50%;
    }
  
    .details {
      background-color: #583878;
      border-radius: 20px;
      height: 600px;
      width: 50%;
      box-sizing: border-box; 
      display: flex;
      flex-direction: column;
      padding: 30px;
      z-index: 1;
    }
  
    .name, .email, .wallet, .addiction, .donation-message {
      color:#E2C8DC;
      font-family: "Lato";
      font-size: 30px;
      margin-top: 10px;
    }
  
    .profile {
      color: #E2C8DC;
      text-align: center;
      font-family: 'Lato';
      font-size: 50px;
      font-weight: bolder;
      display: flex;
      flex-direction: row;
      justify-content: center;
      
    }
  
    .star {
      height: 100%;
      width: 50%;
      z-index: 1;
      padding-right: 40px;
      position: relative;
    }

    .edit-button{
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
    }

    .logo {
        position: relative;
        height: 20%;
        width: 20%;
        top: 5%;
        margin: auto;
    }
  </style>