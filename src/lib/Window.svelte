<script lang="ts">
    import {windowManager, WindowState} from "../stores/windowManager.store";

    export let id: UUID;
    $: thisWindow = $windowManager[id];
    let style: string = '';
    $: {
        if (thisWindow) {
            if (thisWindow.state === WindowState.Maximized) {
                style = `top: 0; left: 0; width: 100vw; height: 100vh; z-index: ${thisWindow.zIndex};`
            } else {
                style = `top: ${thisWindow.position.y}px; left: ${thisWindow.position.x}px; width: ${thisWindow.size.x}px; height: ${thisWindow.size.y}px; z-index: ${thisWindow.zIndex};`
            }
        }
    }

    const handleMaximize = () => {
        if (thisWindow.state === WindowState.Normal)
            windowManager.maximize(id);
        else
            windowManager.demaximize(id)
    }
</script>

<div class="window" {style}>
    <div class="titlebar">
        <span>{thisWindow.title}</span>
        <div class="actions">
            <button on:click={handleMaximize}>{thisWindow.state === WindowState.Normal ? "<>" : "><"}</button>
            <button on:click={() => windowManager.close(id)}>X</button>
        </div>
    </div>
    <h1>Hello, SvelteOS</h1>
</div>

<style>
    .window {
        position: absolute;
        background: var(--background);
        display: flex;
        flex-direction: column;
        border: 1px solid var(--primary);
    }

    .titlebar {
        height: 32px;
        color: var(--background);
        background: var(--primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        user-select: none;
    }
</style>