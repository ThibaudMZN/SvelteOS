import {writable, get} from 'svelte/store';
import type {ComponentType} from "svelte";

export enum WindowState { Minimized, Maximized, Normal}

type Window = {
    title: string;
    position: Vector2;
    size: Vector2;
    zIndex: number;
    state: WindowState;
}
type Windows = Record<UUID, Window>;

const defaultWindows: Windows = {
    [crypto.randomUUID()]: {
        size: {x: 400, y: 400},
        title: "My first window",
        position: {x: 100, y: 100},
        state: WindowState.Normal,
        zIndex: 1
    },
    [crypto.randomUUID()]: {
        size: {x: 400, y: 400},
        title: "My second window",
        position: {x: 200, y: 200},
        state: WindowState.Normal,
        zIndex: 2
    }
}

const { subscribe, update } = writable<Windows>(defaultWindows)

const maxZIndex = () => {
    const windows = Object.values(get(windowManager));
    return Math.max(...windows.map(w => w.zIndex));
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
        if(state === WindowState.Maximized)
            currentValue[id].zIndex = maxZIndex() + 1;
        return currentValue;
    })
}

export const windowManager = {
    close: closeWindow,
    demaximize: (id: UUID) => switchState(id, WindowState.Normal),
    maximize: (id: UUID) => switchState(id, WindowState.Maximized),
    subscribe
}