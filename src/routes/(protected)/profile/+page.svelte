<script>
    // import Star from "$lib/components/galaxy/Star.svelte";
  
    // let star;
  
    let name = "Apple";
  
  </script>
  
  
  <div class="galaxy">
    <div class="star">
      <img class="mainstar" src="/images/galaxy/main-star/main-star-1.svg" alt="main star">
      <img class="smallstar" src="/images/small-star-3.svg" alt="small star">
      <img class="smallstar2" src="/images/small-star-2.svg" alt="small star 2">
    </div>
    <div class="details">
      <div class="profile">
        <img class="profilestar" src="/images/small-star-2.svg" alt="profile star">
        <p>Profile</p>
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
    </div>
  </div>
  
  
  <style>
    .galaxy {
        height: 1000px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 140px;
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
      padding: 40px;
    }
  
    .name, .email, .wallet, .addiction {
      color:#E2C8DC;
      font-family: "Lato";
      font-size: 30px;
      
    }
  
    .profile {
      color: #E2C8DC;
      text-align: center;
      font-family: 'Lato';
      font-size: 40px;
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
  </style>