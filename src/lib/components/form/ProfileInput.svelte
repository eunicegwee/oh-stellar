<script>

    export let id;
    export let title;
    export let editStatus;
    export let input;
</script>

<div class="input">
    <p>{title}:</p>
    {#if editStatus}
        <input bind:value={input} type="text" {id} name={id}>
    {:else}
        <p>{input}</p>
    {/if}
  </div>

  <style>
    .input {
      color:#E2C8DC;
      font-family: "Lato";
      font-size: 2vw;
      margin-top: 2%;
      display: flex;
      flex-direction: row;
      gap: 5%;
      position: relative;
    }

    .input input {
        padding: 5px 10px;
        border-radius: 30px;
    }


  </style>

