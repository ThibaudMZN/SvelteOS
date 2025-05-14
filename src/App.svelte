<script lang="ts">
    import {windowManager} from "./stores/windowManager.store";
    import Window from "./lib/Window.svelte";
</script>

<main class="desktop">
    {#each Object.entries($windowManager) as [id, window] (id)}
        <Window {id}/>
    {/each}
</main>

<style>
    .desktop {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-image: url(/desktop-background.jpg);
        background-size: cover;
        position: relative;
    }
</style>