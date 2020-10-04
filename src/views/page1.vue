<template>
  <div id="page1">
    <span id="jissen">
      <BgTimer />
    </span>
  </div>
</template>

<script>
import BgTimer from "../components/BgTimer.vue";

export default {
  name: "page1",
  components: {
    BgTimer,
  },
};
</script>

<style>
#jissen {
  transform: scale(0.5, 0.5);
}
</style>

