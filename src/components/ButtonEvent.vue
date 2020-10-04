
<template>
  <div id="app">
    <p v-if="sleeping">zzz...</p>
    <p v-if="!sleeping">Good morning</p>
    <button v-on:click="toggleSleeping">{{selected}}</button>
    <p>{{ clickNumber }}回クリックされました</p>
    <button v-on:click="countUp()">カウントアップ</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      sleeping: true,
      clickNumber: 0
    };
  },
  computed: {
    selected: function() {
      return this.sleeping ? "Before" : "After";
    }
  },
  methods: {
    toggleSleeping: function() {
      this.sleeping = !this.sleeping;
    },
    countUp: function() {
      this.clickNumber += 1;
    }
  }
};
</script>


<style scoped>
#app {
  font-size: 16px;
}
</style>