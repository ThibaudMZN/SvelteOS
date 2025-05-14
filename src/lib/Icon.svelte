<script lang="ts">
    type Size = '16' | '24' | '32';
    type Color = 'Default' | 'White';

    export let src: string;
    export let alt: string;
    export let size: Size = '16';
    export let color: Color = 'Default';
</script>

<img {src} {alt} width={size} height={size} class={color}/>

<style>
    img {
        transition: all 0.1s linear;
    }

    img:hover {
        transform: scale(1.2);
    }

    .White {
        filter: brightness(0) invert();
    }
</style>