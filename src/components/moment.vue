<template>
  <div id="app"></div>
</template>

<script>
import moment from "vue-moment";

export default {
  name: "app",
  moment,
  data() {},
  mounted: function () {
    // 現在時刻を取得して文字列として表示する
    // moment.js で現在時刻は moment() で取得できます。さらに format メソッドで文字列に変換できます。

    //   const moment = require("moment");
    const m = moment();

    m.format(); // => 2019-06-17T21:21:54+09:00
    m.format("YYYY-MM-DD HH:mm:ss"); // => 2019-06-17 21:21:54

    // 文字列をパースして時刻に変換する
    // moment() の引数に文字列を渡すとその文字列をパースして時刻に変換してくれます。
    m = moment("2019-06-18 10:01:34");
    m.format(); // => 2019-06-18T10:01:34+09:00

    // 日時の計算を行う
    // add メソッドや year メソッドを使って日時の計算を行うことができます。
    //各メソッドの呼び出しはチェーンできるのが便利です。
    m = moment("2019-06-18 10:01:34");

    m.add(1, "hour").format(); // => 2019-06-18T11:01:34+09:00
    m.add(-1, "day").format(); // => 2019-06-17T11:01:34+09:00
    m.year(2020).minute(2).format(); // => 2020-06-17T11:02:34+09:00
    //メソッドを呼び出すとインスタンス (上のコード内の m) の状態が変わっていることには注意が必要です。

    //計算を行う前に clone メソッドを使って先にインスタンスをコピーしておくと安全です。
    m = moment("2019-06-18 10:01:34");

    m.clone().add(1, "hour").format(); // => 2019-06-18T11:01:34+09:00
    m.clone().add(-1, "day").format(); // => 2019-06-17T10:01:34+09:00
    m.clone().year(2020).minute(2).format(); // => 2020-06-18T10:02:34+09:00

    //日時の比較を行う
    //isBefore, isAfter, isSame などのメソッドで日時の比較を行えます。
    const m1 = moment("2019-06-18 10:01:34");
    const m2 = moment("2019-06-18 10:02:34");

    m1.isBefore(m2); // => true
    m1.isAfter(m2); // => false
    m1.isSame(m2); // => false
    m1.isSameOrBefore(m2); // => true
  },
};
</script>

