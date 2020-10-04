import Vue from "vue";
import Index from "./Index.vue";
// router.jsでエクスポートしたrouterを必ずrotuerという名前でインポートしなければならない
import router from "./route.js";
import axios from "axios";
//import moment from "vue-moment";

import "moment/src/locale/ja";
import moment from "moment";

Vue.prototype.$axios = axios;
// Vue.use(require("vue-moment"));

Vue.prototype.$moment = moment;
Vue.filter("LLLL", (date) => moment(date).format("LLLL"));
Vue.filter("fromNow", (date) => moment(date).fromNow());

// JQuery 読み込み
import jQuery from "jquery";
global.jquery = jQuery;
global.$ = jQuery;
window.$ = window.jQuery = require("jquery");

//import jExcel from "jexcel";

Vue.config.productionTip = false;

/*
// 読み込んだvueファイルをグローバルコンポーネントとして登録
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});
*/

new Vue({
  router,
  // vue-moment,
  //  moment,
  render: (h) => h(Index)
}).$mount("#app");

// new Vue({
//   router,
//   //  moment,
//   render: (h) => h(Index)
// }).$mount("#app");
