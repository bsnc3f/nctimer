<!--  https://qiita.com/moriwm77/items/5d5430c80cfccd5fb397  -->

<template>
  <div id="app">
    <div class="countdown">
      <div class="countdown">{{ formatTime }}</div>
      <button v-on:click="start" v-if="!timerOn">Start</button>
      <button v-on:click="stop" v-if="timerOn">Stop</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {
      min: 1,
      sec: 0,
      timerOn: false,
      timerObj: null,
    };
  },
  methods: {
    count: function () {
      if (this.sec <= 0 && this.min >= 1) {
        this.min--;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec--;
      }
    },

    start: function () {
      let self = this;
      this.timerObj = setInterval(function () {
        self.count();
      }, 1000);
      this.timerOn = true; //timerがOFFであることを状態として保持
    },

    stop: function () {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerがOFFであることを状態として保持
    },

    complete: function () {
      clearInterval(this.timerObj);
    },
  },
  computed: {
    formatTime: function () {
      let timeStrings = [this.min.toString(), this.sec.toString()].map(
        function (str) {
          if (str.length < 2) {
            return "0" + str;
          } else {
            return str;
          }
        }
      );
      return timeStrings[0] + ":" + timeStrings[1];
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
}
.countdown {
  font-size: 80px;
}
</style>