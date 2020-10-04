// moment.js test

<template>
  <div id="app">
    <h2 v-for="({ date, format }, index) in tests" :key="index">
      {{ date | moment(format) }}
    </h2>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "app",
  data() {
    const formats = [
      "MMMM Do YYYY, h:mm:ss a",
      "dddd",
      "MMM Do YY",
      "YYYY [escaped] YYYY",
      "LTS",
    ];
    return {
      tests: new Array(formats.length)
        .fill(new Date())
        .map((date, i) => ({ date, format: formats[i] })),
    };
  },
  filters: {
    /**
     * @param {Date} value    - Date オブジェクト
     * @param {string} format - 変換したいフォーマット
     */
    moment(value, format) {
      return moment(value).format(format);
    },
  },
};
</script>