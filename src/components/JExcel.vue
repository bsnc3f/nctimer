<template>
  <div id="app" class="spreadsheet">
    <button id="download" @click="csvDownload()">CSVファイルへ書き出す</button>
    <div ref="spreadsheet"></div>
    <div>
      <p></p>
      <input
        type="button"
        value="Add new row"
        @click="() => spreadsheet.insertRow()"
      />
    </div>
  </div>
</template>


<script>
import jexcel from "jexcel";
import "jexcel/dist/jexcel.css";

var mySchedule = [
  [
    "平日",
    "おはよう",
    true,
    false,
    false,
    "カウントダウン",
    "06:52",
    "06:53",
    "花壇前中継",
    "まで",
    true,
    "オレンジ",
    "#700d0d",
    "文字",
    "×",
  ],
  [
    "平日",
    "N7",
    true,
    false,
    false,
    "定時アラーム",
    "18:55",
    "18;58",
    "通知内容はこんな感じ",
    "",
    true,
    "黒",
    "#777700",
    "文字",
    "15",

    //          imageExample
  ],
  [
    "祝日",
    "NW9",
    true,
    false,
    true,
    "実線通知",
    "18:55",
    "18;58",
    "管中気象まで",
    "",
    true,
    "青",
    "#0e0438",
    "背景",
    "30",

    //          imageExample]
  ],
  [
    "土日",
    "おはよう",
    false,
    true,
    false,
    "カウントダウン",
    "06:05",
    "06:07",
    "花壇前中継まで",
    "",
    true,
    "オレンジ",
    "#700d0d",
    "×",
    "×",
  ],
  [
    "平日",
    "シブ5時",
    false,
    false,
    true,
    "タスク通知",
    "17:18",
    "17:22",
    "三條マイクを確認",
    "",
    true,
    "灰",
    "#0e0438",
    "×",
    "×",
  ],
];

var options = {
  //url: "../json/mySchedule.json",
  data: mySchedule,

  //  data: mySchedule,
  allowToolbar: true,
  minSpareRows: 1, // 最下段の余白行数
  columns: [
    {
      type: "dropdown",
      title: "曜日",
      width: "50px",
      source: [
        "平日",
        "土日",
        "祝日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土",
        "日",
      ],
    },
    { type: "text", title: "番組", width: "80x" },
    { title: "A卓", width: 30, type: "checkbox" },
    { title: "B卓", width: 30, type: "checkbox" },
    { title: "C卓", width: 30, type: "checkbox" },
    {
      type: "dropdown",
      title: "機能",
      width: "120px",
      source: ["定時アラーム", "実線通知", "カウントダウン", "タスク通知"],
    },
    {
      type: "calendar",
      title: "開始",
      width: "50px",
      options: {
        // Date format
        //        format: "HH:mm:ss",
        //        format: "YYYY/MM/DD",  //  年月日
        //        format: "MM/DD HH24:MI", time:1, // 日付と時間
        format: "HH24:MI",
        // Show timepicker
        time: 1, // 時間のみ
        // Allow keyboard date entry
        readonly: 0,
        // Today is default
        today: 1,
        // Show the reset button
        resetButton: true,
        // Placeholder
        placeholder: "",
        // Translations can be done here
        months: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        weekdays_short: ["日", "月", "火", "水", "木", "金", "土"],
        // Value
        value: null,
        // Events
        onclose: null,
        onchange: null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen: false,
      },
    },
    {
      type: "calendar",
      title: "終了",
      width: "50px",
      options: {
        // Date format
        //        format: "HH:mm:ss",
        //        format: "YYYY/MM/DD",  //  年月日
        //        format: "MM/DD HH24:MI", time:1, // 日付と時間
        format: "HH24:MI",
        time: 1, // 時間のみ
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
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        weekdays_short: ["日", "月", "火", "水", "木", "金", "土"],
        // Value
        value: null,
        // Events
        onclose: null,
        onchange: null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen: false,
      },
    },
    { type: "text", title: "通知内容１", width: "180px" },
    { type: "text", title: "通知内容２", width: "180px" },
    { type: "checkbox", title: "有効", width: "30px" },
    {
      type: "dropdown",
      title: "背景色",
      width: "70px",
      source: ["黒", "青", "赤", "オレンジ", "灰"],
    },
    { type: "color", title: "TEXT色", width: "60px", render: "square" },
    {
      type: "dropdown",
      title: "点滅",
      width: "70px",
      source: ["文字", "背景", "両方", "×"],
    },
    {
      type: "dropdown",
      title: "点滅時間",
      width: "70px",
      source: ["15", "30", "45", "60", "90", "×"],
    },

    /*
    { type: 'text', title: 'Car', width: '120px' },
    { type: 'dropdown', title: 'Make', width: '250px', source: [ 'Alfa Romeo', 'Audi', 'Bmw' ] },
    { type: 'calendar', title: 'Available', width: '250px' },
    { type: 'image', title: 'Photo', width: '120px' },
    { type: 'checkbox', title: 'Stock', width: '80px' },
    { type: 'numeric', title: 'Price', width: '100px', mask: '$ #.##,00', decimal: ',' },
    { type: 'color', width: '100px', render: 'square' }
    */
  ],

  // ネスト化
  nestedHeaders: [
    [
      { title: "大見出し", colspan: "7" },
      { title: "大見出し", colspan: "7" },
    ],

    [
      { title: "通知", colspan: "8" },
      { title: " 表示", colspan: "7" },
      //      { title: " Other Information", colspan: "0" }
    ],
  ],
};

export default {
  name: "app",
  data() {
    return {
      // schedule: [],
    };
  },
  created() {},
  methods() {},
  mounted() {
    let spreadsheet = jexcel(this.$el, options);
    Object.assign(this, { spreadsheet });
  },
  computed() {},
};

/*
const jexcelData = jexcel(table, {  data: [[""]],  columns: [] });

const download = document.getElementById("download");
download.addEventListener("click", () => {
  jexcelData.download();
});

*/
</script>

<style scoped>
.spreadsheet {
  font-size: 12px;
}
</style>
