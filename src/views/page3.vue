<template>
  <div id="page3">
    <ButtonEvent />
    <TempTimer />
    <!--    <ledSw/>  -->
  </div>
</template>

<script>
import ButtonEvent from "../components/ButtonEvent.vue";
import LedSw from "../components/LedSw.vue";
import TempTimer from "../components/TempTimer.vue";

export default {
  name: "page3",
  components: {
    ButtonEvent,
    LedSw,
    TempTimer,
  },
};
</script>
