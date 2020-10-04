<!-- http://www.qrunch.net/@popy1017/entries/EEIjucypNX0qQAiR?ref=qrunch  -->
<!-- https://blog.asial.co.jp/1158  -->
<template>
  <div id="app">
    <h3>直接的な呼び出し</h3>
    <p>{{ $moment("320904123456", "YYMMDDHH:mm:ss") }}</p>
    <p>{{ $moment().format("llll") }}</p>
    <p>{{ $moment().fromNow() }}</p>
    <p>{{ $moment().minutes(10) }}</p>
    <p>{{ $moment().format("YYYY[年]MM[月]DD[日]") }}</p>
    <p>{{ $moment().format(jp) }}</p>

    <hr />
    <h3>computed経由での呼び出し</h3>
    <p>{{ now }}</p>
    <p>{{ llll }}</p>
    <p>{{ fromNow }}</p>
    <hr />
    <h3>フィルター適用</h3>
    <p>{{ $moment() | fromNow }}</p>
    <p>{{ $moment() | LLLL }}</p>
    <p>{{ $moment() | diff }}</p>
  </div>
</template>  1

<script>
import moment from "moment";
var m = moment("123456", "HH:mm:ss");

// つかいかた（基礎編）
// momentオブジェクトを初期化して・・・
// var m = moment();

// formatで出力!
var output = m.format("YYYY年MM月DD日 HH:mm:ss dddd");

console.log(output); // => 2013年05月15日 12:34:56 Wednesday

// 初期化方法いろいろ

// 現在時刻
moment();
// ミリ秒で指定
moment(1368543600000);
// タイムスタンプ（秒）で指定
moment.unix(1368543600);
// Date.parseで解析可能な文字列を指定
moment("May 15, 2013");
// Dateオブジェクトから初期化
moment(new Date(2013, 4, 15));
// 配列から初期化
moment([2013, 4, 15]); // ※monthは-1した値を指定
// 別のmomentオブジェクトから初期化
moment(moment([2013, 4, 15]));
// 第二引数で入力値フォーマットを指定して初期化
moment("05-15-2013", "DD-MM-YYYY");
moment("20130515", "YYYYMMDD");
moment("2013年05月15日", "YYYY年MM月DD日"); // 実は"YYYYMMDD"だけでも通る
moment(1368543600 + "", "X");

//出力方法あれこれ

// formatを指定して出力
m.format("YYYY年MM月DD日 ddd");
// 各単位のメソッド
m.year(); // 年
m.month(); // 月 ※ 0〜11の値!
m.date(); // 日
m.day(); // 曜日
m.hours(); // 時
m.minutes(); // 分
m.seconds(); // 秒
m.milliseconds(); // ミリ秒

//曜日を日本語で出力したい

// lang:jaを登録。これ以降はlangを指定しなくても自動的にjaが使用される。
moment.lang("ja", {
  weekdays: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
});
// moment生成して・・・
var m = moment("May 15, 2013");
// 日本語で出力
m.format("MM/DD (ddd) dddd"); // => 05/15 (水) 水曜日
// でもやっぱり英語で出力
m.lang("en").format("MM/DD (ddd) dddd"); // => 05/15 (Wed) Wednesday

//今月1日の曜日を数値で

// dayメソッドが「曜日」（0〜6）でdateメソッドが「日」（1〜31）なので注意！
moment().date(1).day(); // => 3  （水曜日）
//今週の月曜日、正午キッチリのタイムスタンプがほしい

moment()
  .day(1) // dayで曜日指定. 0:日曜 〜 6:土曜
  .hours(12) // 12時を指定
  .minutes(0)
  .seconds(0)
  .milliseconds(0) // これを指定しないと現在時刻の分,秒が使用される
  .format("X"); // => 1368414000

// Vue.prototype.$moment = moment;
// Vue.filter("LLLL", (date) => moment(date).format("LLLL"));
// Vue.filter("fromNow", (date) => moment(date).fromNow());
const diff = moment("2020-12-30").diff(moment());

// ミリ秒からdurationオブジェクトを生成
const duration = moment.duration(diff);

// 日・時・分・秒を取得
const days = Math.floor(duration.asDays());
const hours = duration.hours();
const minutes = duration.minutes();
const seconds = duration.seconds();

export default {
  name: "app",
  methods: {
    // diffメソッドを使って、現時刻と2017年7月1日の日時の差を、ミリ秒で取得
    // 出力
  },
  computed: {
    now() {
      return this.$moment();
    },
    fromNow() {
      return this.$moment().fromNow();
    },
    llll() {
      return this.$moment().format("llll");
    },
    jp() {
      return this.$moment().format("YY[年]MM[月]DD[日] HH:mm:ss");
    },
  },
};
</script>  