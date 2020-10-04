<!--  https://codepen.io/BSNC/pen/YzqBYoB  -->

<template>
  <div id="sw">
    <label id="l" for="s">seconds</label>
    <div class="wrapper">
      <div id="timers">
        <div
          id="timer_0"
          class="timer"
          style="color: #396AB1; border-color: #82A3DB"
        ></div>
      </div>
      <div class="add-timer">+</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "sw",
  methods: {
    // キーボードイベント発火
    keyEvent: function () {
      this.show = !this.show;
      this.input = "";
    },
  },
  mounted: function () {
    var dark = [
      "#396AB1",
      "#3E9651",
      "#948B3D",
      "#DA7C30",
      "#922428",
      "#CC2529",
      "#6B4C9A",
      "#535154",
    ];
    var light = [
      "#82A3DB",
      "#94CA6B",
      "#DCD280",
      "#F1A75C",
      "#B68570",
      "#E36E90",
      "#B087C7",
      "#c0c5c5",
    ];

    var setCount = 10;
    var i = 0;
    var instanceid = 0;
    var count = [10];
    var counter = setInterval(timer, 1000);

    function timer() {
      for (i = 0; i <= instanceid; i++) {
        if (count[i] > 0) {
          count[i] = count[i] - 1;
          document.getElementById("timer_" + i).innerHTML = count[i];
        } else {
          $("#timer_" + i).hide();
        }
      }
    }

    $(document).ready(function () {
      $(document).click(function () {
        instanceid++;
        console.log(instanceid);
        var seconds = parseInt($("#s").val()) || 60;
        count.push(seconds);
        //数値無効時のカウント数

        //var w = (seconds > 999) ? '240px' : '120px';

        //クリックで一番最後にDom追加動作
        //$("#timers").append('<div id="timer_'+instanceid+'" //class="timer">'+seconds+'</div>');

        //ほかにafter()　対象とする「要素外」への追加
        //      before() は「after()」と逆の性質があり、対象の要素外の先頭に任意のHTML要素を追加することができるメソッド

        //クリックで一番先頭にDom追加動作
        $("#timers").prepend(
          '<div id="timer_' +
            instanceid +
            '" class="timer">' +
            seconds +
            "</div>"
        );

        // Keyダウン動作テスト
        // $(function () {
        //	$("timer").keydown(timer);
        //});

        $("#timer_" + instanceid).css("color", dark[instanceid]);
        $("#timer_" + instanceid).css("border-color", light[instanceid]);
        //$("#timer_"+instanceid).css("background", light[instanceid]);

        $(".timer")
          .unbind("click")
          .bind("click", function (e) {
            e.stopImmediatePropagation();
            $(this).hide();
            instanceid - 1;

            if (!$(".timer").is(":visible")) {
              instanceid - 1;
              count = [0];
              $(".timer").remove();
            }
          });
      });

      $("#l,#s").click(function (e) {
        e.stopImmediatePropagation();
      });

      $("#s").change(function (e) {
        var find_stamina = /[0-9]*a/gi;
        var find_hour = /[0-9]*h/gi;
        var find_min = /[0-9]*m/gi;
        var find_sec = /[0-9]*s/gi;

        var a = find_stamina.exec($(this).val());

        if (a) {
          a = a[0];
          a = a.substring(0, a.length - 1);
        }

        var h = find_hour.exec($(this).val());

        if (h) {
          h = h[0];
          h = h.substring(0, h.length - 1);
        }

        var m = find_min.exec($(this).val());

        if (m) {
          m = m[0];
          m = m.substring(0, m.length - 1);
        }

        var s = find_sec.exec($(this).val());

        if (s) {
          s = s[0];
          s = s.substring(0, s.length - 1);
        }

        var total = 0;

        if (parseInt(a) > 0) {
          // 数値無効時の処理用

          total += parseInt(a) * 180;
        }

        if (parseInt(h) > 0) {
          total += parseInt(h) * 3600;
        }

        if (parseInt(m) > 0) {
          total += parseInt(m) * 60;
        }

        if (parseInt(s) > 0) {
          total += parseInt(s);
        }

        if (total > 0) {
          $(this).val(total);
        }
      });
    });
  },
};
</script>


<style>
/*
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
*/

#timers {
  display: inline-block;
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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#l {
  font-family: sans-serif;
  color: #444;
  margin-left: 10px;
}

#s {
  font-size: 14px;
  width: 58px;
  color: #444;
  background: #f4f4f4;
  border: 2px solid #ccc;
  padding: 2px;
}
</style>
