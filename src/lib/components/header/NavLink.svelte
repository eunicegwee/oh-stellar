<script>
  import { onMount } from "svelte";

  export let href = "#";
  export let content = null;

</script>

  <a
    {href}
    >{content}
  </a>

<style>
  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 20px;
    font-family: "Lato", serif;
  }
  /* a,
  button {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    display: inline-block;
    height: 100%;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    text-decoration: underline transparent;
    text-underline-offset: 6px;
    padding: 5px;
    transition: all var(--nav-animation-duration);
  }

  button {
    background-color: white;
    border: none;
    border-radius: 10px;
    padding-inline: 8px;
    color: var(--primary-color);
  }

  a:hover:not(.dropdown),
  a:focus:not(.dropdown),
  button:hover,
  button:focus {
    text-decoration-color: white;
  }

  button:hover,
  button:focus {
    background-color: var(--primary-color);
    color: white;
  }

  :global(.tooltip) {
    --bs-tooltip-bg: #3e474f;
    --bs-tooltip-max-width: 280px;
    --bs-tooltip-padding-x: 1rem;
    --bs-tooltip-padding-y: 1rem;
  }

  :global(.tooltip-inner) {
    text-align: start;
  } */
</style>
