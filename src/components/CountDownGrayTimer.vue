<template>
  <div id="app">
    <canvas id="mycanvas" width="250" height="250"></canvas>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // canvas: "#mycanvas",
      // ctx: this.canvas.getContext("2d"),
      // cWidth: this.canvas.width,
      // cHeight: this.canvas.height,
      countTo: 59, //カウント時間
      min: 0, //Math.floor(this.countTo / 60),
      sec: 59, // this.countTo - this.min * 60,
      counter: 0,
      angle: 270,
      pi: 360,
    };
  },
  methods: {
    window: (onload = function () {
      // var canvas = document.getElementById("mycanvas");
      // var ctx = canvas.getContext("2d");
      // var cWidth = canvas.width;
      // var cHeight = canvas.height;
      // var inc = 360 / this.countTo; //フルカウント時のライン位置
    }),

    //======= reset canvas
    drawCanvas() {
      var min = Math.floor(this.countTo / 60);
      var sec = this.countTo - this.min * 60;

      var inc = 360 / this.countTo; //フルカウント時のライン位置

      //      var namm = Number.isNaN(this.inc);
      console.log("goo");

      //      var countTo = 10; //カウント時間
      // var counter = 0;

      var canvas = document.getElementById("mycanvas");
      var ctx = canvas.getContext("2d");
      var cWidth = canvas.width;
      var cHeight = canvas.height;

      //var angle = 270;
      //      var inc = 360 / this.countTo; //フルカウント時のライン位置
      ctx.fillStyle = "#161616"; //canvasの背景色  #2e3032
      ctx.fillRect(0, 0, cWidth, cHeight); //矩形の左上端の x,y 矩形の幅 w, 高さh

      //========== base arc //ベースライン

      ctx.beginPath();
      ctx.strokeStyle = "#333"; //円の元の色  #252424
      ctx.lineWidth = 14;
      ctx.arc(
        cWidth / 2,
        cHeight / 2,
        100,
        (Math.PI / 180) * 0,
        (Math.PI / 180) * 360,
        false
      );
      ctx.stroke();
      ctx.closePath();

      //========== dynamic arc  //上書きライン

      ctx.beginPath();
      ctx.strokeStyle = "#df8209"; //上書きラインの色
      ctx.lineWidth = 14;
      ctx.arc(
        cWidth / 2,
        cHeight / 2,
        100,
        (Math.PI / 180) * 270,
        (Math.PI / 180) * this.angle,
        false
      );
      ctx.stroke();
      ctx.closePath();

      //======== inner shadow arc //インナーシャドウ

      var grad = ctx.createRadialGradient(
        cWidth / 2,
        cHeight / 2,
        80,
        cWidth / 2,
        cHeight / 2,
        115
      );
      grad.addColorStop(0.0, "rgba(0,0,0,.4)");
      grad.addColorStop(0.5, "rgba(0,0,0,0)");
      grad.addColorStop(1.0, "rgba(0,0,0,0.4)");

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 14;
      ctx.arc(
        cWidth / 2,
        cHeight / 2,
        100,
        (Math.PI / 180) * 0,
        (Math.PI / 180) * 360,
        false
      );
      ctx.stroke();
      ctx.closePath();

      //======== bevel arc  //べベル

      grad = ctx.createLinearGradient(cWidth / 2, 0, cWidth / 2, cHeight);
      grad.addColorStop(0.0, "#6c6f72"); //内側の円の上側ベベル //#6c6f72
      grad.addColorStop(0.5, "#252424"); //内側の円の下側ベベル　//#252424

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2; //内側ベベルのライン幅  //元は 1
      ctx.arc(
        cWidth / 2,
        cHeight / 2,
        93,
        (Math.PI / 180) * 0,
        (Math.PI / 180) * 360,
        true
      );
      ctx.stroke();
      ctx.closePath();

      //====== emboss arc   //外側のエンボス

      grad = ctx.createLinearGradient(cWidth / 2, 0, cWidth / 2, cHeight);
      grad.addColorStop(0.0, "transparent"); //外側の円の上側エンボス //transparent
      grad.addColorStop(0.98, "#6c6f72"); //外側の円の下側エンボス  //#6c6f72

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2; //外側のエンボス幅  //元は 1
      ctx.arc(
        cWidth / 2,
        cHeight / 2,
        107,
        (Math.PI / 180) * 0,
        (Math.PI / 180) * 360,
        true
      );
      ctx.stroke();
      ctx.closePath();

      //====== Labels   //[MIN, SEC] の文字設定

      var textColor = "#646464"; //#646464
      var textSize = "14"; //元は12
      var fontFace = "helvetica, arial, sans-serif";

      ctx.fillStyle = textColor;
      ctx.font = textSize + "px " + fontFace;
      ctx.fillText("MIN", cWidth / 2 - 46, cHeight / 2 - 40); //MINの位置
      ctx.fillText("SEC", cWidth / 2 + 25, cHeight / 2 - 15); //SECの位置

      //====== Values   //カウント部分

      ctx.fillStyle = "#6292ae"; //カウント文字色    //#6292ae

      if (this.min > 59) {
        ctx.font = "84px " + fontFace;
        ctx.fillText("59", cWidth / 2 - 55, cHeight / 2 + 35);

        ctx.font = "30px " + fontFace;
        ctx.fillText("+", cWidth / 2 - 72, cHeight / 2 - 5);
      } else {
        ctx.font = "84px " + fontFace;
        ctx.fillText(this.min, cWidth / 2 - 60, cHeight / 2 + 35);
      }

      ctx.font = "50px " + fontFace;
      if (this.sec < 10) {
        ctx.fillText("0" + this.sec, cWidth / 2 + 10, cHeight / 2 + 35);
      } else {
        ctx.fillText(this.sec, cWidth / 2 + 10, cHeight / 2 + 35);
      }

      if (this.sec <= 0 && this.counter < this.countTo) {
        this.angle += inc;
        this.counter++;
        this.min--;
        this.sec = 59;
      } else if (this.counter >= this.countTo) {
        this.sec = 0;
        this.min = 0;
      } else {
        this.angle += inc;
        this.counter++;
        this.sec--;
      }
    },
    // test() {
    //   console.log("hoge");
    //   //      setInterval(function() {this.count()}, 1000);
    // },
  },
  mounted() {
    setInterval(this.drawCanvas, 1000);
  },
};
</script>

<style scoped>
body {
  background: #080808;
}
canvas {
  display: block;
  margin: 20px auto;
}
</style>