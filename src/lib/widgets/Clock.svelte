<script lang="ts">
    import {onDestroy} from "svelte";

    const dateFormat = new Intl.DateTimeFormat("en-GB", {
        timeStyle: "short",
    })
    let time = new Date();

    const interval = setInterval(() => {
        time = new Date()
    }, 2_000);

    $: displayTime = dateFormat.format(time);

    onDestroy(() => clearInterval(interval))
</script>

<span>{displayTime}</span>

<style>
    span {
        font-size: 0.8rem;
    }
</style>