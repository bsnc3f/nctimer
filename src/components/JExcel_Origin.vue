<template>
  <div id="spreadsheet" class="spreadsheet">
    <div ref="spreadsheet"></div>
    <div>
      <input type="button" value="Add new row" @click="() => spreadsheet.insertRow()">
    </div>
  </div>
</template>


<script>
import jexcel from "jexcel";
import "jexcel/dist/jexcel.css";

var mySchedule = [
  [
    "N7",
    "定時アラーム",
    "2020-02-12",
    "通知内容はこんな感じ",
    true,
    "黒",
    "#777700",
    "文字",
    "15"

    //          imageExample
  ],
  [
    "NW9",
    "実線通知",
    "2019-02-12",
    "管中気象まで",
    true,
    "青",
    "#0e0438",
    "背景",
    "30"

    //          imageExample]
  ],
  [
    "おはよう",
    "カウントダウン",
    "2020-11-24",
    "花壇前中継まで",
    true,
    "オレンジ",
    "#700d0d",
    "×",
    "×"
  ],
  [
    "シブ5時",
    "タスク通知",
    "2020-08-24",
    "三條マイクを確認",
    true,
    "灰",
    "#0e0438",
    "×",
    "×"
  ]
];
var options = {
  data: mySchedule,
  allowToolbar: true,
  columns: [
    { type: "text", title: "番組", width: "80x" },
    {
      type: "dropdown",
      title: "機能",
      width: "140px",
      source: ["定時アラーム", "実線通知", "カウントダウン", "タスク通知"]
    },
    {
      type: "calendar",
      title: "通知開始",
      width: "80px",
      options: {
        // Date format
        //        format: "HH:mm:ss",
        format: "HH:mm:ss",
        // Allow keyboard date entry
        readonly: 0,
        // Today is default
        today: 1,
        // Show timepicker
        time: 1,
        // Show the reset button
        resetButton: true,
        // Placeholder
        placeholder: "",
        // Translations can be done here
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        weekdays_short: ["日", "月", "火", "水", "木", "金", "土"],
        // Value
        value: null,
        // Events
        onclose: null,
        onchange: null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen: false
      }
    },
    { type: "TEXT", title: "通知内容", width: "180px" },
    { type: "checkbox", title: "有効", width: "30px" },
    {
      type: "dropdown",
      title: "背景色",
      width: "70px",
      source: ["黒", "青", "赤", "オレンジ", "灰"]
    },
    { type: "color", title: "TEXT色", width: "60px", render: "square" },
    {
      type: "dropdown",
      title: "点滅",
      width: "70px",
      source: ["文字", "背景", "両方", "×"]
    },
    {
      type: "dropdown",
      title: "点滅時間",
      width: "70px",
      source: ["15", "30", "45", "60", "90", "×"]
    }

    /*
    { type: 'text', title: 'Car', width: '120px' },
    { type: 'dropdown', title: 'Make', width: '250px', source: [ 'Alfa Romeo', 'Audi', 'Bmw' ] },
    { type: 'calendar', title: 'Available', width: '250px' },
    { type: 'image', title: 'Photo', width: '120px' },
    { type: 'checkbox', title: 'Stock', width: '80px' },
    { type: 'numeric', title: 'Price', width: '100px', mask: '$ #.##,00', decimal: ',' },
    { type: 'color', width: '100px', render: 'square' }
    */
  ]
};
//};
export default {
  name: "spreadsheet",
  mounted: function() {
    let spreadsheet = jexcel(this.$el, options);
    Object.assign(this, { spreadsheet });
  }
};
</script>

<!--
<script>
jexcel(document.getElementById('my-spreadsheet'), {
    url:'data.json',
    columns:[
        { title:'Model', width:300 },
        { title:'Price', width:80 },
        { title:'Model', width:100 }
    ]
});
</script>
-->

<!--

(2). Loading from a JSON file
サーバサイドのJSONファイルをロードする場合は、urlパラメータにファイルのパスをセットします。

<div id='my-spreadsheet'></div>
<script>
jexcel(document.getElementById('my-spreadsheet'), {
    url:'data.json',
    columns:[
        { title:'Model', width:300 },
        { title:'Price', width:80 },
        { title:'Model', width:100 }
    ]
});
</script>

-->

<style scoped>
.spreadsheet {
  font-size: 12px;
}
</style>
