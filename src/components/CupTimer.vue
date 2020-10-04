<template>
  <main>
    <div id="app">
      <div class="timer-group">
        <div class="timer hour">
          <div class="hand">
            <span></span>
          </div>
          <div class="hand">
            <span></span>
          </div>
        </div>
        <div class="timer minute">
          <div class="hand">
            <span></span>
          </div>
          <div class="hand">
            <span></span>
          </div>
        </div>
        <div class="timer second">
          <div class="hand">
            <span></span>
          </div>
          <div class="hand">
            <span></span>
          </div>
        </div>
        <div class="face">
          <h2>ConnectLine</h2>
          <p id="lazy">00:00:00</p>
        </div>
      </div>
      <div class="moment">残り{{ remainTime }}</div>
    </div>
  </main>
</template>


<script>
import moment from "moment";
//Vue.use(moment);

export default {
  name: "app",
  moment,
  data() {
    return {
      inputTime: 0,
      remainTime: "",
    };
  },
  created: function () {
    // created 以外で動かす方法を探る　(まだ動かない)
    //////////////////////////////////////////

    // // 差を計算
    // var now = moment([2020, 0, 28]);
    // var addTime = moment([2020, 0, 29]);
    // addTime.diff(now); // n ms
    // var addDiff = addTime.diff(now, "second"); //

    // 足し算.
    // diffメソッドを使って、日時の差を、ミリ秒で取得
    const diff = moment("2020-09-28T21:55:00", "THH:mm:ss").diff(moment());
    //    const diff = moment( '2021-01-01' ).diff( moment() );
    //    const diff = now.add(this.inputTime, 'seconds');

    // const diff = moment(
    //   "2020-11-23T12:34:56+0900",
    //   "YYYY-MM-DDTHH:mm:ssZ"
    // ).diff(moment());

    // ミリ秒からdurationオブジェクトを生成
    const duration = moment.duration(diff);

    // 日・時・分・秒を取得
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    //カウントダウンの結果を変数に代入
    //    this.countDown = timestamp;
    this.remainTime = minutes + "分" + seconds + "秒";
    //      days + "日" + hours + "時" + minutes + "分" + seconds + "秒";
  },
  mounted: function () {
    // ***** Chronograph Timer *****
    ////////////////////////////////
    var defaults = {},
      one_second = 1000,
      one_minute = one_second * 60,
      one_hour = one_minute * 60,
      one_day = one_hour * 24,
      //startDate = new Date("2022/05/06 20:58:10")
      //startDate = new Date(2020,8,27,11,15),
      startDate = new Date(),
      face = document.getElementById("lazy");

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    var requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    tick();

    function tick() {
      var now = new Date(),
        //    , elapsed = startDate - now // startDateに目標時を入れこの形式にすればカウントダウン動作。
        //        elapsed = startDate - now,  // カウントダウン
        elapsed = now - startDate, // カウントアップ
        parts = [];

      //  時間表示はOFF
      //  parts[0] = '' + Math.floor( elapsed / one_hour );
      parts[0] = "" + Math.floor((elapsed % one_hour) / one_minute);
      parts[1] =
        "" + Math.floor(((elapsed % one_hour) % one_minute) / one_second + 1);

      //  parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
      parts[0] = parts[0].length == 1 ? "0" + parts[0] : parts[0];
      parts[1] = parts[1].length == 1 ? "0" + parts[1] : parts[1];

      /*
  //  parts[0] = '' + Math.floor( elapsed / one_hour );
    parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
    parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

  //  parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
    parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
    parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];
  */

      face.innerText = parts.join(":");

      requestAnimationFrame(tick);
    }
  },
};
</script>

<style scoped>
.timer-group {
  /*  background-color: #111; */
  transform: scale(1, 1);
  height: 400px;
  margin: 0;
  position: relative;
  width: 400px;
}

.timer {
  border-radius: 50%;
  height: 100px;
  overflow: hidden;
  position: absolute;
  width: 100px;
}

.timer:after {
  /* 内側ボーダー */
  background: #111;
  border-radius: 50%;
  content: "";
  display: block;
  height: 80px;
  left: 10px;
  position: absolute;
  width: 80px;
  top: 10px;
}

.timer .hand {
  /* 内側の追っかけ曲線 */
  float: left;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 50%;
}

.timer .hand span {
  /* 内側の追っかけ曲線 */
  border: 50px solid rgba(0, 255, 255, 0.4);
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  display: block;
  height: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: rotate(225deg);
  width: 0;
}

.timer .hand:first-child {
  /* 真下 */
  transform: rotate(180deg);
}

.timer .hand span {
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.timer .hand:first-child span {
  animation-name: spin1;
}

.timer .hand:last-child span {
  animation-name: spin2;
}

.timer.hour {
  background: rgba(0, 0, 0, 0.3);
  height: 400px;
  left: 0;
  width: 400px;
  top: 0;
}

.timer.hour .hand span {
  /* 外側の追っかけ曲線 */
  animation-duration: 240s; /* hourアニメーションのデュレーション 240s */
  border-top-color: rgba(255, 0, 255, 0.4);
  border-right-color: rgba(255, 0, 255, 0.4);
  border-width: 200px;
}

.timer.hour:after {
  height: 360px;
  left: 20px;
  width: 360px;
  top: 20px;
}

.timer.minute {
  background: rgba(0, 0, 0, 0.2);
  height: 350px;
  left: 25px;
  width: 350px;
  top: 25px; /* 25px */
}

.timer.minute .hand span {
  animation-duration: 60s; /* minuteアニメーションのデュレーション 60s */
  border-top-color: rgba(0, 255, 255, 0.4);
  border-right-color: rgba(0, 255, 255, 0.4);
  border-width: 175px;
}

.timer.minute:after {
  height: 310px;
  left: 20px;
  width: 310px;
  top: 20px;
}

.timer.second {
  background: rgba(0, 0, 0, 0.2); /* rgba(0, 0, 0, .2) */
  height: 300px; /* 300px */
  left: 50px;
  width: 300px; /* 300px */
  top: 50px;
}

.timer.second .hand span {
  /* 秒カウント追っかけ */
  animation-duration: 1s;
  border-top-color: rgba(255, 255, 255, 0.3); /* rgba(255, 255, 255, .15) */
  border-right-color: rgba(255, 255, 255, 0.3);
  border-width: 150px;
}

.timer.second:after {
  /* 秒カウント追っかけ */
  height: 286px; /* 296px */
  left: 7px; /* 2px */
  width: 286px; /* 296px */
  top: 7px; /* 2px */
}

.face {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  height: 296px;
  left: 56px;
  position: absolute;
  width: 296px;
  text-align: center;
  top: 52px; /* 52 */
}

.face h2 {
  font-size: 20px;
  font-weight: 300;
  color: #333;
  position: absolute;
  top: 180px; /* 52 */
  left: 85px;
}

.face p {
  border-radius: 20p;
  font-size: 100px; /* 76 */
  font-weight: 400;
  position: absolute;
  top: -10px; /* 17 */
  width: 260px;
  left: 16px; /* 20px */
  color: #CCC;
}

@keyframes spin1 {
  0% {
    transform: rotate(225deg);
  }
  50% {
    transform: rotate(225deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

@keyframes spin2 {
  0% {
    transform: rotate(225deg);
  }
  50% {
    transform: rotate(405deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
</style>
