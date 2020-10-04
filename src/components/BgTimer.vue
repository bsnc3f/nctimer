<template>
  <div id="bgCol">
    <div class="bgCol">
      <div class="timecontainer">
        <div class="time">
          <div class="switcher" type="minutes">
            <div class="time"></div>
          </div>
          <div class="switcher" type="none">
            <div class="time">:</div>
          </div>
          <div class="switcher" type="seconds">
            <div class="time"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bgCol",
  data() {
    return {
      munut: 0,
      second: 15,
      offsetTime: -1,
      runnning: false,
      played: false,
    };
  },
  // Vue化前　基本的にJQuery動作
  mounted: function () {
    var minutesel = 0,
      secondsel = 15;
    //      secondInterval = 5;
    var starttime = -1,
      time = -1,
      running = false,
      played = false;
    var arerttime = 11;
    var endtime = -6;
    var intervalId = setInterval(bgTimer, 1000);

    if (!running) {
      starttime = minutesel * 60 + secondsel;
      time = starttime - 0;
      running = true;
    } else {
      $(this).text("Begin");
      running = false;
      $('.switcher[type="minutes"] .time').text(minutesel);
      $('.switcher[type="seconds"] .time').text(
        (secondsel < 10 ? "0" : "") + secondsel
      );
      $(".bgCol").css("height", "100%");
      $(".bgCol").removeClass("timeup");
      $(".switcher").removeClass("active");
    }

    function bgTimer() {
      //      console.log(time);
      if (running) {
        time -= 1;
        time = time < endtime ? 0 : time;
        $(".bgCol").css("height", (time * 100) / starttime + "%"); // BGのheightを縮小させる
        $('.switcher[type="minutes"] .time').text(Math.floor(time / 60));
        $('.switcher[type="seconds"] .time').text(
          (time % 60 < 10 ? "0" : "") + (time % 60)
        );

        if (time <= arerttime) {
          if (played) {
            $(".bgCol").addClass("timeup"); //  BGの背景色を変更
            //$(".bgCol").css("height", "100%");
          }
          if (!played) {
            played = true;
            //$.playSound('http://freesound.org/data/previews/135/135125_2337290-lq.mp3');
          }
        } else {
          played = false;
          //$(".bgCol").removeClass("timeup");
        }

        if (time <= 0) {
          $(".bgCol").addClass("timeupAfter"); //  BGの背景色を変更
          $(".bgCol").css("height", 100 + "%");
          $('.switcher[type="minutes"] .time').text("");
          $('.switcher[type="none"] .time').text("");
          $('.switcher[type="seconds"] .time').text(time);
        }
        if (time <= endtime) {
          running = !running;
          secondsel = 16;
          //          $(".bgCol").css("height", 100);
          time = secondsel;
          $("#bgCol").remove();
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    }

    /*
    (function($) {
      $.extend({
        playSound: function() {
          return $(
            '<audio autoplay="autoplay" style="display:none;"><source src="' +
              arguments[0] +
              '" /><embed src="' +
              arguments[0] +
              '" hidden="true" autostart="true" loop="false" class="playSound" /></audio>'
          ).appendTo("body");
        }
      });
    })(jQuery);
*/
  },
};
</script>


<style lang="scss" scoped>
#bgCol {
  background-color: #323133;
  font-family: "Comfortaa", cursive;
  margin: 0;
  color: #fff;
  width: 50%;
  height: 50%;
}
.begin {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  cursor: pointer;
}
.bgCol {
  position: fixed;
  top: 50%;
  left: 0px;
  right: 0px;
  transform: translateY(-50%);
  height: 100%;
  background-color: #2ABA66;
  transition: height 0.5s ease;
  &.timeup {
    background-color: #D8334A;
  }
  &.timeupAfter {
    background-color: rgb(200, 200, 66);
    height: 100%;
  }
}
.timecontainer {
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  transform: translateY(-50%);
  > .time {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .switcher {
      display: flex;
      position: relative;
      .time {
        font-size: 25vw;
      }
      &:not([type="none"]):not(.active) {
        .up,
        .down {
          position: absolute;
          left: 0px;
          right: 0px;
          height: 3vw;
          cursor: pointer;
          &:before {
            position: absolute;
            content: "";
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 3vw solid transparent;
          }
        }
      }
    }
  }
}
</style>
