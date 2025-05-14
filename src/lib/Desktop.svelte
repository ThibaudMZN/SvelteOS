<script lang="ts">
    import {type ComponentType, onMount, type SvelteComponent} from "svelte";
    import {windowManager} from "../stores/windowManager.store";

    const modules = import.meta.glob('/src/lib/applications/*.svelte');

    let applications: { name: string; component: ComponentType }[] = [];

    onMount(async () => {
        for (const path in modules) {
            const name = path.match(/\/([^/]+)\.svelte$/)?.[1];
            const module: SvelteComponent = (await modules[path]()) as SvelteComponent;
            applications = [...applications, {name, component: module.default}]
        }
    })

</script>

<div class="desktop-container">
    {#each applications as {name, component}}
        <div class="application">
            <div class="application-icon" role="button" tabindex="0" on:dblclick={() => windowManager.open(name, component)}>
                <img src="/applications-icons/{name}.svg" alt="Icon for {name}" />
            </div>
            <span><b>{name}</b></span>
        </div>
    {/each}
</div>

<style lang="scss">
    .desktop-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        gap: 32px;
        flex-wrap: wrap;
        padding: 32px;
    }

    .application {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        height: fit-content;
    }

    .application-icon {
        --icon-size: 64px;
        width: var(--icon-size);
        height: var(--icon-size);
        border-radius: 4px;
        background: var(--background-with-transparency);
        transition: all 0.1s linear;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 32px;
            height: 32px;
            filter: brightness(0) invert(1);
        }

        &:hover {
            transform: scale(1.2);
        }
    }
</style>