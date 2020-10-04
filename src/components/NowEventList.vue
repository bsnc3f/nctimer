<template>
  <div id="app">
    <div v-for="item in NowEventListChild"></div>
    <span>{{ counts }}</span>
  </div>
</template>


<script>
import moment from "moment";
export default {
  name: "app",
  props: ["NowEventListChild"],
  data() {
    return {
      counts: [], // カウンタを持つ配列
    };
  },
  methods: {
    getDuration(endTime) {
      let diff = moment(endTime).diff(moment());
      return moment.duration(diff);
    },
    formatRemain(duration) {
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      return "${days}日${hours}時間${minutes}分${seconds}秒";
    },
  },
  mounted() {
    // プロパティの配列でループ
    // ただしmountedフックで一度動作するだけなので、
    // 配列にあとから追加や削除があっても検知しない
    this.NowEventListChild.forEach((item, index) => {
      // dataに定義したcounts配列に初期値をぶっこむ
      this.counts.push(this.formatRemain(this.getDuration(item.end_time)));

      // 個別にsetIntervalをセットする
      setInterval(() => {
        // 自分のindexのカウンタを更新する
        this.counts.splice(
          index,
          1,
          this.formatRemain(this.getDuration(item.end_time))
        );
      }, 1000);
    });
  },
  filters: {
    format_test(time) {
      return moment(time).format("YYYY/MM/DD HH:mm");
    },
    year(time) {
      return moment(time).format("YYYY");
    },
    month(time) {
      return moment(time).format("MM");
    },
    date(time) {
      return moment(time).format("DD");
    },
    day(time) {
      return moment(time).format("dddd");
    },
  },
};
</script>