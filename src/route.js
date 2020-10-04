// https://www.e-loop.jp/knowledges/14/

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/home.vue";
import Page1 from "./views/page1.vue";
import Page2 from "./views/page2.vue";
import Page3 from "./views/page3.vue";
import page4 from "./views/page4.vue";
import axios from "axios";
import NowEventList from "./components/NowEventList.vue";

Vue.use(VueRouter);

const NotFound = { template: "<div>このページは存在しません</div>" };

const routes = [
  { path: "/home", component: Home },
  { path: "/page1", component: Page1 },
  { path: "/Page2", component: Page2 },
  { path: "/Page3", component: Page3 },
  { path: "/page4", component: page4 },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  routes: routes,

  components: {
    NowEventList
  },

  data() {
    return {
      // 現在のイベントリスト格納用
      NowEventList: []
    };
  },

  created() {
    // ------------------------------
    // 現在のイベントリスト表示用データ取得
    // ------------------------------
    axios
      .get("test.json")
      .then(
        function (response) {
          this.noweventlist = response.data;
        }.bind(this)
      )
      .catch(function (e) {
        console.error(e);
      });
  }
});

export default router;
