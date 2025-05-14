<script lang="ts">
    import {windowManager, WindowState, type Window} from "../../stores/windowManager.store.js";
    import ExpandIcon from "../../assets/icons/expand.svg";
    import CompressIcon from "../../assets/icons/compress.svg";
    import CloseIcon from "../../assets/icons/close.svg";
    import Icon from "../Icon.svelte";
    import {onDestroy} from "svelte";

    export let thisWindow: Window;
    export let id: UUID;
    export let dragged: boolean;

    let lastOffset: Vector2 = {x: 0, y: 0};

    const handleMaximize = () => {
        if (thisWindow.state === WindowState.Normal)
            windowManager.maximize(id);
        else
            windowManager.demaximize(id)
    }

    const handleMouseDown = (event: MouseEvent) => {
        dragged = true;
        lastOffset = {
            x: event.clientX,
            y: event.clientY
        };
        windowManager.bringToFront(id)

        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', stopDrag);
    }

    function onDrag(event: MouseEvent) {
        if (!dragged) return;
        const offset = {
            x: event.x - lastOffset.x,
            y: event.y - lastOffset.y,
        }
        windowManager.move(id, offset)
        lastOffset = {
            x: event.clientX,
            y: event.clientY
        };
    }

    function stopDrag() {
        dragged = false;
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
    }

    onDestroy(() => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
    });
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
        class="titlebar"
        role="dialog"
        on:mousedown={handleMouseDown}
>
    <span>{thisWindow.title}</span>
    <div class="actions">
        <button on:click={handleMaximize}>
            <Icon src={thisWindow.state === WindowState.Normal ? ExpandIcon : CompressIcon} alt={thisWindow.state === WindowState.Normal ? "Expand" : "Reduce"} color="White" />
        </button>
        <button on:click={() => windowManager.close(id)}>
            <Icon src={CloseIcon} alt="Close" color="White" />
        </button>
    </div>
</div>

<style lang="scss">
    .titlebar {
        height: 32px;
        background: var(--primary);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        user-select: none;
    }

    .actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;

        button {
            border: none;
            background: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
        }
    }
</style>