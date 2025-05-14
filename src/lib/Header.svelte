<script>
    import Clock from "./widgets/Clock.svelte";
</script>

<header>
    <Clock/>
</header>

<style lang="scss">
  header {
    --padding: 8px
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: calc(100% - 2 * var(--padding));
    display: flex;
    flex-direction: row-reverse;
    padding: 4px 8px;
  }
</style>