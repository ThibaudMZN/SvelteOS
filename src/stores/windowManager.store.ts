import {writable, get, derived} from 'svelte/store';
import type {ComponentType} from "svelte";
import TextEditor from "../lib/applications/TextEditor.svelte";

export enum WindowState { Minimized, Maximized, Normal}

export type Window = {
    title: string;
    position: Vector2;
    size: Vector2;
    zIndex: number;
    state: WindowState;
    component: ComponentType;
}
type Windows = Record<UUID, Window>;

const {subscribe, update} = writable<Windows>({})

const maxZIndex = () => {
    const windows = Object.values(get(windowManager));
    return Math.max(...windows.map(w => w.zIndex), 0);
}

const bringToFront = (id: UUID) => {
    update((currentValue) => {
        currentValue[id].zIndex = maxZIndex() + 1;
        return currentValue;
    })
}

const closeWindow = (id: UUID) => {
    update((currentValue) => {
        delete currentValue[id];
        return currentValue;
    })
}

const switchState = (id: UUID, state: WindowState) => {
    update((currentValue) => {
        currentValue[id].state = state;
        if (state === WindowState.Maximized)
            bringToFront(id);
        return currentValue;
    })
}

const move = (id: UUID, offset: Vector2) => {
    update((currentValue) => {
        currentValue[id].position.x += offset.x;
        currentValue[id].position.y += offset.y;
        return currentValue;
    })
}

const resize = (id: UUID, position: Vector2, size: Vector2) => {
    update((currentValue) => {
        currentValue[id].position = position;
        currentValue[id].size = size;
        return currentValue;
    })
}

const open = (name: string, component: ComponentType) => {
    const size = 600;
    const newWindow = {
        size: {x: size, y: size},
        title: name,
        position: {x: window.innerWidth / 2 - size / 2, y: window.innerHeight / 2 - size / 2},
        state: WindowState.Normal,
        zIndex: maxZIndex() + 1,
        component
    }
    update((currentValue) => {
        currentValue[crypto.randomUUID()] = newWindow;
        return currentValue;
    })
}

export const windowManager = {
    bringToFront,
    close: closeWindow,
    demaximize: (id: UUID) => switchState(id, WindowState.Normal),
    maximize: (id: UUID) => switchState(id, WindowState.Maximized),
    move,
    open,
    resize,
    subscribe
}

export const focusedWindow = derived<[typeof windowManager], Window | undefined>([windowManager], ([$windowManager]) => {
    const sortedWindows = Object.values($windowManager).sort((a, b) => b.zIndex - a.zIndex);
    return sortedWindows.length ? sortedWindows[0] : undefined
});