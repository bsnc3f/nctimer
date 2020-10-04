<!--  https://qiita.com/moriwm77/items/5d5430c80cfccd5fb397  -->

<template>
  <div id="app">
    <div class="count">
      <div class="count-up">{{ countupTime }}</div>
      <div class="count-down">{{ countdownTime }}</div>

      <!--      <button v-on:click="start" v-if="!timerOn">Start</button>
      <button v-on:click="stop" v-if="timerOn">Stop</button>  -->
    </div>
  </div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {
      downMin: 1,
      upMin: 0,
      downSec: 59,
      upSec: 1,
      maxMin: 1,
      timerOn: false,
      timerObj: null,
    };
  },
  methods: {
    countup: function () {
      if (this.upSec >= 59 && this.upMin <= this.maxMin) {
        this.upMin++;
        this.upSec = 0;
      } else if (this.upSec == 0 && this.upMmin == this.maxMin) {
        this.complete();
      } else {
        this.upSec++;
      }
    },
    countdown: function () {
      if (this.downSec <= 0 && this.downMin >= this.maxMin) {
        this.downMin--;
        this.downSec = 59;
      } else if (this.downSec <= 0 && this.downMin <= 0) {
        this.complete();
      } else {
        this.downSec--;
      }
    },

    start: function () {
      let self = this;
      this.timerObj = setInterval(function () {
        self.countdown();
        self.countup();
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
    countupTime: function () {
      let timeStringsUp = [this.upMin.toString(), this.upSec.toString()].map(
        function (strUp) {
          if (strUp.length < 2) {
            return "0" + strUp;
          } else {
            return strUp;
          }
        }
      );
      return timeStringsUp[1];
      //      return timeStringsUp[0] + ":" + timeStringsUp[1];
    },
    countdownTime: function () {
      let timeStringsDown = [
        this.downMin.toString(),
        this.downSec.toString(),
      ].map(function (strDown) {
        if (strDown.length < 2) {
          return "0" + strDown;
        } else {
          return strDown;
        }
      });
      return timeStringsDown[1];
      //      return timeStringsDown[0] + ":" + timeStringsDown[1];
    },
  },
  mounted: function () {
    let self = this;
    this.timerObj = setInterval(function () {
      self.countdown();
      self.countup();
    }, 1000);
    this.timerOn = true; //timerがOFFであることを状態として保持
  },
};
</script>

<style scoped>
#app {
  display: flex;
}
.count {
  position: fixed;
  font-size: 120px;
  bottom: 200px;
  color: #AAA;
}
.count-up {
  position: fixed;
  left: 40px;

  display: inline-block;
  font-family: sans-serif;
  font-size: 72px;
  margin: 10px;
  padding: 10px 20px;
  vertical-align: middle;
  text-align: center;
  background: #fff;
  border: 5px solid #c0c5c5;
  color: #535154;
  cursor: pointer;
}
.count-down {
  position: fixed;
  left: 550px;

  display: inline-block;
  font-family: sans-serif;
  font-size: 72px;
  margin: 10px;
  padding: 10px 20px;
  vertical-align: middle;
  text-align: center;
  background: #fff;
  border: 5px solid #c0c5c5;
  color: #535154;
  cursor: pointer;
}

.timer {
  display: inline-block;
  font-family: sans-serif;
  font-size: 72px;
  margin: 10px;
  padding: 10px 20px;
  vertical-align: middle;
  text-align: center;
  background: #fff;
  border: 5px solid #c0c5c5;
  color: #535154;
  cursor: pointer;
}

.add-timer {
  display: inline-block;
  font-family: sans-serif;
  font-size: 72px;
  margin: 10px;
  padding: 0 10px 10px 10px;
  min-width: 72px;
  min-height: 72px;
  vertical-align: middle;
  text-align: center;
  background: #fff;
  border: 5px dashed #c0c5c5;
  color: #c0c5c5;
  cursor: pointer;
  pointer-events: none;
}
</style>