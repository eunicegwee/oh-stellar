<script>
    let name = "hi";
</script>

<div class="galaxy">
    <img src="/images/galaxy/galaxy-bg.jpg" alt="galaxy" id="galaxy-bg">
    <div class="message-box">
        <div class="title">
            <img class="bulletpoint" src="/images/BulletPointStar.svg" alt="bulletpoint star" style="margin-bottom: 2%; width:3%;">
            <p><u>Confirmation by Accountability Partner</u></p>
        </div>
        <div class="message">
            <p>Your confirmation is important in supporting <u>{name}'s</u> journey toward recovery.</p>
            <p>If confirmed, the allocated funds will be released to encourage their continued progress.<br>
                We thank you for your support which plays a crucial role in their commitment to change!</p>
        </div>
        <div class="confirmation">
            <div class="message2">I can confirm, to the best of my ability, that user <u>{name}</u> has successfully refrained from his addiction on 15/02/2025.</div>
        </div>
        <div class="buttons">
            <img class="button" src="/images/YesButton.svg" alt="yes button">
            <img class="button" src= "/images/NoButton.svg" alt="no button">
        </div>
        <img class="logo"src="/images/name-pink.svg" alt="OhStellar">
    </div>
</div>

<style>
    .logo {
        height: auto;
        width: 10%;
        margin: auto;
        display: flex;
        justify-content: center;
    }

    .buttons {
        display: flex;
        gap: 5%;
        justify-content: center;
        padding: 5%;
        container-name: message-box;
        align-items: center;
    }

    .button {
        position: relative;
        width: 20%;
        height: 5%;
    }

    .message-box {
        background-color: #583878;
        height: auto;
        width: 70%;
        border-radius: 20px;
        z-index: 1;
        position: absolute;
        font-size: 6em;
        padding: 30px;

    }

    .title {
        font-family: "Lato";
        font-weight: bolder;
        color: #E2C8DC;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: 3vw;
        gap: 2%;
        container-name: message-box;
    }

    .message, .message2, .bulletpoint {
        position: relative;
        text-align: center;
        color: #E2C8DC;
        font-size: 2vw;
        container-name: message-box;
    }

    .message2 {
        color: black;
        container-name: confirmation;
    }

    .confirmation {
        position: relative;
        background-color: #D9D9D9;
        font-size: 6em;
        width: 110%;
        border-radius: 20px;
        right: 5%;
        box-shadow: 0px 5px;
        padding: 2px;
        container-name: message-box;
    }


    #galaxy-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        opacity: 0.5;   
        z-index: 0;
        
    }

    .galaxy {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 140px;
        position: relative;
    }


</style>