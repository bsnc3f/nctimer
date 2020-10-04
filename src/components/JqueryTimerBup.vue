<template>
  <div id="app" class="countdown"></div>
  <!-- <div id="app" class="countdown"></div> -->
</template>

<script>
export default {
  name: "app",
  mounted: function () {
    const moment = require("moment");
    var duration = moment.duration({
      minutes: 5,
      seconds: 0,
    });

    var timestamp = new Date(0, 0, 0, 2, 10, 30);
    var interval = 1;
    var timer = setInterval(function () {
      timestamp = new Date(timestamp.getTime() + interval * 1000);

      duration = moment.duration(duration.asSeconds() - interval, "seconds");
      var min = duration.minutes();
      var sec = duration.seconds();

      sec -= 1;
      if (min < 0) return clearInterval(timer);
      if (min < 10 && min.length != 2) min = "0" + min;
      if (sec < 0 && min != 0) {
        min -= 1;
        sec = 59;
      } else if (sec < 10 && length.sec != 2) sec = "0" + sec;

      $(".countdown").text(min + ":" + sec);
      if (min == 0 && sec == 0) clearInterval(timer);

      //      console.log(duration);
    }, 1000);
  },
};
</script>


<style scoped>
/* Styling it all now! */

@font-face {
  font-family: "digi";
  src: url("http://cssdeck.com/uploads/resources/fonts/digii/DS-DIGII.TTF");
}

* {
  box-sizing: border-box;
}

html,
#app {
  width: 250px;
  height: 110px;
  font-family: "digi";
  font-size: 70px;
  background: #CCC;
  background-image: radial-gradient(center 0, white, #B9B7B1);
}

.countdown {
  width: 250px;
  height: 100px;
  background: white;
  font-size: 4em;
  color: #707070;

  /* Centering everything */
  position: absolute;
  left: 850px;
  bottom: 50px;
  margin-left: -125px;
  margin-top: -50px;

  text-align: center;
  line-height: 100px;

  border-top: 10px solid rgb(30, 33, 233);
  border-bottom: 10px solid rgb(30, 33, 233);
  /* border-bottom: 10px solid #E54B6B; */
  background-image: linear-gradient(#f0f0f0, white);
}
</style>