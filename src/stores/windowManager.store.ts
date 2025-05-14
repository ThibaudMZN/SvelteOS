import {writable, get} from 'svelte/store';
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

const defaultWindows: Windows = {
    [crypto.randomUUID()]: {
        size: {x: 400, y: 400},
        title: "Text Editor",
        position: {x: 100, y: 100},
        state: WindowState.Normal,
        zIndex: 1,
        component: TextEditor
    },
    [crypto.randomUUID()]: {
        size: {x: 400, y: 400},
        title: "Text Editor",
        position: {x: 200, y: 200},
        state: WindowState.Normal,
        zIndex: 2,
        component: TextEditor
    }
}

const {subscribe, update} = writable<Windows>(defaultWindows)

const maxZIndex = () => {
    const windows = Object.values(get(windowManager));
    return Math.max(...windows.map(w => w.zIndex));
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

export const windowManager = {
    bringToFront,
    close: closeWindow,
    demaximize: (id: UUID) => switchState(id, WindowState.Normal),
    maximize: (id: UUID) => switchState(id, WindowState.Maximized),
    move,
    subscribe
}