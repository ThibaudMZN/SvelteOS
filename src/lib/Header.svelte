<script>
    import Clock from "./widgets/Clock.svelte";
    import {focusedWindow} from "../stores/windowManager.store";
</script>

<header>
    <div>
        {#if $focusedWindow}
            <span><b>{$focusedWindow?.title}</b></span>
        {/if}
    </div>
    <div>
        <Clock/>
    </div>
</header>

<style lang="scss">
  header {
    --padding: 8px;
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: calc(100% - 2 * var(--padding));
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    background: var(--background-with-transparency);
  }
</style>