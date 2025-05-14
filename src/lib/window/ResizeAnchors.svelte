<script lang="ts">
    import {windowManager, WindowState, type Window} from "../../stores/windowManager.store.js";

    export let thisWindow: Window;
    export let id: UUID;
    export let resized: boolean;

    type Direction = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'sw' | 'se';

    let startResizePosition: Vector2;
    let startSize: Vector2;
    let startPosition: Vector2;
    let direction: Direction;

    function startResize(event: MouseEvent, dir: Direction) {
        resized = true;
        direction = dir;
        startResizePosition = {
            x: event.clientX,
            y: event.clientY
        }
        startSize = {
            x: thisWindow.size.x,
            y: thisWindow.size.y,
        }
        startPosition = {
            x: thisWindow.position.x,
            y: thisWindow.position.y,
        }

        window.addEventListener('mousemove', onResizing);
        window.addEventListener('mouseup', stopResize);
    }

    function onResizing(event: MouseEvent) {
        if (!resized) return;

        let offset = {
            x: event.clientX - startResizePosition.x,
            y: event.clientY - startResizePosition.y
        }

        let newW = startSize.x;
        let newH = startSize.y;
        let newX = startPosition.x;
        let newY = startPosition.y;

        if (direction.includes('e')) newW += offset.x;
        if (direction.includes('s')) newH += offset.y;
        if (direction.includes('w')) {
            newW -= offset.x;
            newX += offset.x;
        }
        if (direction.includes('n')) {
            newH -= offset.y;
            newY += offset.y;
        }

        newW = Math.max(200, newW);
        newH = Math.max(160, newH);

        windowManager.resize(id, {x: newX, y: newY}, {x: newW, y: newH});
    }

    function stopResize() {
        resized = false;
        window.removeEventListener('mousemove', onResizing);
        window.removeEventListener('mouseup', stopResize);
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle top" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'n')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle bottom" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 's')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle left" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'w')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle right" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'e')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle topleft" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'nw')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle topright" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'ne')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle bottomleft" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'sw')}></div>
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="resize-handle bottomright" role="separator" on:mousedown|preventDefault={(e) => startResize(e, 'se')}></div>

<style>
    .resize-handle {
        position: absolute;
        z-index: 10;
        background: transparent;
    }

    .resize-handle.top,
    .resize-handle.bottom {
        left: 0;
        right: 0;
        height: 10px;
        cursor: ns-resize;
    }

    .resize-handle.left,
    .resize-handle.right {
        top: 0;
        bottom: 0;
        width: 10px;
        cursor: ew-resize;
    }

    .resize-handle.top {
        top: -5px;
    }

    .resize-handle.bottom {
        bottom: -5px;
    }

    .resize-handle.left {
        left: -5px;
    }

    .resize-handle.right {
        right: -5px;
    }

    .resize-handle.topleft,
    .resize-handle.topright,
    .resize-handle.bottomleft,
    .resize-handle.bottomright {
        width: 10px;
        height: 10px;
        background: transparent;
    }

    .resize-handle.topleft {
        top: -5px;
        left: -5px;
        cursor: nwse-resize;
    }

    .resize-handle.topright {
        top: -5px;
        right: -5px;
        cursor: nesw-resize;
    }

    .resize-handle.bottomleft {
        bottom: -5px;
        left: -5px;
        cursor: nesw-resize;
    }

    .resize-handle.bottomright {
        bottom: -5px;
        right: -5px;
        cursor: nwse-resize;
    }

</style>