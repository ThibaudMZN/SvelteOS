<script lang="ts">
    import {windowManager, WindowState} from "../../stores/windowManager.store";
    import Titlebar from "./Titlebar.svelte";
    import ResizeAnchors from "./ResizeAnchors.svelte";

    export let id: UUID;

    let dragged = false;
    let resized = false;
    let style: string = '';

    $: thisWindow = $windowManager[id];
    $: {
        if (thisWindow) {
            if (thisWindow.state === WindowState.Maximized) {
                style = `transform: translate(0, 0); width: 100vw; height: 100vh; z-index: ${thisWindow.zIndex};`
            } else {
                style = `transform: translate(${thisWindow.position.x}px, ${thisWindow.position.y}px); width: ${thisWindow.size.x}px; height: ${thisWindow.size.y}px; z-index: ${thisWindow.zIndex};`
            }
        }
    }
</script>

<div class="window" {style} class:moving={dragged || resized} on:focusin={() => windowManager.bringToFront(id)}>
    <Titlebar bind:thisWindow bind:id bind:dragged />
    <div class="window-content">
        <svelte:component this={thisWindow.component} />
    </div>
    <ResizeAnchors bind:thisWindow bind:id bind:resized />
</div>

<style lang="scss">
    .window {
        position: absolute;
        will-change: transform;
        background: var(--background);
        display: flex;
        flex-direction: column;
        outline: 1px solid var(--primary);
        top: 0;
        left: 0;
        border-radius: 4px;
    }

    .window:not(.moving) {
      transition: all 0.1s ease-out;
    }

    .window-content {
      user-select: text;
      width: 100%;
      height: 100%;
    }
</style>