<template>
  <div id="app">
    <div class="whole-page vertical-middle">
      <div class="vertical-middle__child">
        <div class="clock">
          <ul class="clock__marks"></ul>
          <div class="clock__hands">
            <div class="clock__hand clock__hand--hour"></div>
            <div class="clock__hand clock__hand--minute"></div>
            <div class="clock__hand clock__hand--second"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: function () {
    // diffメソッドを使って、日時の差を、ミリ秒で取得
    const diff = moment("2021-01-01").diff(moment());

    // ミリ秒からdurationオブジェクトを生成
    const duration = moment.duration(diff);

    // 日・時・分・秒を取得
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    //カウントダウンの結果を変数に代入
    this.countDown =
      days + "日" + hours + "時" + minutes + "分" + seconds + "秒";
  },
  mounted: function () {
    var radius = 6;
    $(document).ready(function () {
      for (var i = 0; i < 60; i++) $(".clock__marks").append("<li></li>");

      var currentTime = new Date();
      var second = currentTime.getSeconds() * radius;
      var minute =
        currentTime.getMinutes() * radius +
        Math.floor((second / (radius * 10)) * 10) / 10;
      var hour =
        currentTime.getHours() * radius * 5 +
        Math.floor((minute / (radius * 2)) * 10) / 10;

      setClockHands(second, minute, hour);
    });

    function setClockHands(second, minute, hour) {
      var secondElm = $(".clock__hand--second");
      var minuteElm = $(".clock__hand--minute");
      var hourElm = $(".clock__hand--hour");

      secondElm.css("transform", "rotate(" + second + "deg)");
      minuteElm.css("transform", "rotate(" + minute + "deg)");
      hourElm.css("transform", "rotate(" + hour + "deg)");

      var interval = 1000; //1 second
      var before = new Date();

      setInterval(function () {
        var now = new Date();
        var elapsedTime = now.getTime() - before.getTime(); //Fix calculating in inactive tabs
        var delay = Math.round(elapsedTime / interval);

        second += radius * delay;
        for (var i = 0; i < delay; i++) {
          if (((second - i) * radius) % (radius * 5) === 0) {
            minute += 0.5;
            if (minute % radius === 0) {
              hour += 0.5;
            }
          }
        }

        secondElm.css("transform", "rotate(" + second + "deg)");
        minuteElm.css("transform", "rotate(" + minute + "deg)");
        hourElm.css("transform", "rotate(" + hour + "deg)");

        before = new Date();
      }, interval);
    }
  },
};
</script>


<style lang="scss">

*{ backface-visibility: hidden; }

/*
 .whole-page{ background: radial-gradient(circle, #FFFFFF 0%, #8E8E8E 17%, #202020 100%); }

.vertical-middle{ display: table; width: 50%; height: 60%; position: absolute;  // width: 100%  height: 100%
    &__child{ display: table-cell; vertical-align: middle; text-align: center; }
}
*/

/* Math functions */
$pi: 3.14159265359;
$_precision: 10;

@function radian($angle){
    @return $angle * $pi / 180;
}

@function strip-units($number) {
    @return $number / ($number * 0 + 100);
}

@function even($number){
    $number: round($number);
    @if strip-units($number)%2 != 0{
        $number: $number + 1;  // 長針・短針の太さ
    }
    @return $number;
}

@function pow($base, $exp) {
  $value: $base;
  @if $exp > 1 {
    @for $i from 2 through $exp {
      $value: $value * $base;
    }
  }
  @if $exp < 1{
    @for $i from 0 through -$exp {
      $value: $value / $base;
    }
  }
  @return $value;
}

@function fact($num) {
  $fact: 1;
  @if $num > 0{
    @for $i from 1 through $num {
      $fact: $fact * $i;
    }
  }
  @return $fact;
}

@function _to_unitless_rad($angle) {
  @if unit($angle) == "deg" {
    $angle: $angle / 180deg * $pi;
  }
  @if unit($angle) == "rad" {
    $angle: $angle / 1rad;
  }
  @return $angle;
}

@function sin($angle){
  $a: _to_unitless_rad($angle);
  $sin: $a;
  @for $n from 1 through $_precision {
    $sin: $sin + (pow(-1, $n) / fact(2 * $n + 1) ) * pow($a, (2 * $n + 1));
  }
  @return $sin;
}

@function cos($angle){
  $a: _to_unitless_rad($angle);
  $cos: 1;
  @for $n from 1 through $_precision {
    $cos: $cos + ( pow(-1,$n) / fact(2*$n) ) * pow($a,2*$n);
  }
  @return $cos;
}

@function tan($angle){
  @return sin($angle) / cos($angle);
}



/* Clock */
$clockSize: 550px;  //600px

$clockPadding: $clockSize/60;  // 文字盤　分マーカー（線） padding
$clockBorderWidth: $clockSize * 0.035;  // 時計枠サイズ
$digitsSize: round($clockSize / 10);  // 文字盤　文字サイズ

$numOfMinuteMarks: 60;
$radius: 360 / $numOfMinuteMarks;

$handsCircleSize: round($clockSize/20);  // 長針・短針　太さ（連動）

$handHourLength: round($clockSize * 0.3);  // 短針の長さ
$handHourWidth: even($handsCircleSize * 0.5);  // 短針単独の太さ

$handMinuteLength: round($clockSize * 0.4);  // 長針の長さ
$handMinuteWidth: even($handsCircleSize * 0.35);  // 長針の太さ

$handSecondLength: $handMinuteLength * 1.1;  // 秒針の長さ
$handSecondWidth: ceil($clockSize/300);  // 秒針の太さ

$S: (
    x: ($clockSize - $clockPadding)/2,
    y: ($clockSize - $clockPadding)/2
);
$A: (
    x: ($clockSize - $clockPadding)/2,
    y: 0
);
 // 文字盤位置
$u: (
    x: -1 * map-get($S, x),
    y: -1 * map-get($S, y)
);

.clock{ font-family: "Droid Serif", serif; display: inline-block; width: $clockSize; height: $clockSize; border: $clockBorderWidth solid #000; border-radius: 100%; position: absolute; top: 38%; left: 30%; /* top: 50%; left: 50%; */ margin-top: -$clockSize/2 - $clockBorderWidth; margin-left: -$clockSize/2 - $clockBorderWidth; background: linear-gradient(to bottom right, #E3E3E3, #FFF); box-shadow: 5px 5px 10px rgba(#000, 0.5) inset;
    &__marks{ list-style: none; position: absolute; top: 0; left: 0; margin: 0; padding: 0;
        li{ display: block; position: absolute;
            &:before{ content: ""; display: block; width: 1px; height: 6px; position: absolute; top: 0; left: 0; background: #000 }  // 文字盤 マーカーの太さ・長さ
            &:after{ font-size: $digitsSize; line-height: 1; position: absolute; top: $digitsSize*0.4; width: 50px; left: -25px; text-align: center; -webkit-font-smoothing: antialiased; } // 文字盤数字の位置（回転等）
            
            @for $i from 1 through $numOfMinuteMarks{
                $B: (
                    x: -(map-get($A, y) + map-get($u, y)) * sin(radian($i * $radius))  -  map-get($u, x) + $clockPadding/2,
                    y: (map-get($A, y) + map-get($u, y)) * cos(radian($i * $radius))  -  map-get($u, y) + $clockPadding/2
                );
                &:nth-child(#{$i}){ left: map-get($B, x); top: map-get($B, y); transform: rotate(#{$i * $radius}deg);
                    @if $i%5 == 0{
                      /////////////////////////////////////////////////////////////////////////////////////  文字盤　数字 
                        &:before{ width: 3px; height: 7px; left: -1px; }
                        &:after{ content: "#{$i/5}"; transform: rotate(#{-1 * $i * $radius}deg); }
                    }
                }
            }
        }
    }

    &__hands{ width: $handsCircleSize; height: $handsCircleSize; border-radius: 100%; background: #6C5116; box-sizing: border-box; position: absolute; left: 50%; top: 50%; margin-left: -$handsCircleSize/2; margin-top: -$handsCircleSize/2; transform: rotate(180deg); }
    // 長針・短針・中心点
    &__hand{ transform-origin: top center; background: #000; position: absolute; top: $handsCircleSize/2; transition: transform 0.2s;
         &:before{ content: ""; display: block; width: 0; height: 0; position: absolute; }
        &:after{ content: ""; display: block; position: absolute; background: #000; }

        &--hour{ width: $handHourWidth; height: $handHourLength; left: $handsCircleSize/2 - $handHourWidth/2;
            &:before{ bottom: -2 * floor($handHourWidth*0.8); border: solid transparent; border-width: floor($handHourWidth*0.8) $handHourWidth/2; border-top-color: #000; }
            &:after{ width: $handHourWidth; height: $handHourLength/5; top: -$handHourLength/5; }
        }

        &--minute{ width: $handMinuteWidth; height: $handMinuteLength; left: $handsCircleSize/2 - $handMinuteWidth/2;
            &:before{ bottom: -2 * floor($handMinuteWidth*0.8); border: solid transparent; border-width: floor($handMinuteWidth*0.8) $handMinuteWidth/2; border-top-color: #000; }
            &:after{ width: $handMinuteWidth; height: $handMinuteLength/5; top: -$handMinuteLength/5; }
        }

        &--second{ width: $handSecondWidth; height: $handSecondLength; left: $handsCircleSize/2 - $handSecondWidth/2;
            &:before{ top: -$handSecondLength*0.33; border: 0; width: $handSecondWidth + 2; height: $handSecondLength*0.25; background: #000; left: -1px; }
            &:after{ width: $handSecondWidth; height: $handSecondLength/5; top: -$handSecondLength/5; }
        }
    }
}
</style>
