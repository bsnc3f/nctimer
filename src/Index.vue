<template>
  <div id="app">
    <HumBurgerMenu />
    <router-view />
    <div class="routerNav">
      <router-link to="/home" exact>Home</router-link>
      <router-link to="/page1" exact>Page1</router-link>
      <router-link to="/page2" exact>Page2</router-link>
      <router-link to="/page3" exact>Page3</router-link>
      <router-link to="/page4" exact>page4</router-link>
      <!--      <router-link to="/home"  exact tag="li" >ABOUT</router-link>  -->
    </div>
    <JqueryTimer />
    <!-- <CountDownGrayTimer /> -->

    <div id="under">
      <!-- <CountDownGrayTimer /> -->
    </div>
    <!-- <cupTimer/>  -->
    <Footer />
  </div>
</template>


<script>
import AnalogClock from "./components/AnalogClock.vue";
import HumBurgerMenu from "./components/HumBurgerMenu.vue";
import ButtonEvent from "./components/ButtonEvent.vue";
import TempTimer from "./components/TempTimer.vue";
import CupTimer from "./components/CupTimer.vue";
import CountDownGrayTimer from "./components/CountDownGrayTimer.vue";
import Footer from "./components/Footer.vue";
import axios from "./components/axios.vue";
import BgTimer from "./components/BgTimer.vue";
import DualcountTimer from "./components/DualcountTimer.vue";
import JqueryTimer from "./components/JqueryTimer.vue";

export default {
  name: "app",
  data() {
    return {
      // 現在のイベントリスト格納用
      NowEventList: [],
    };
  },

  components: {
    //    ButtonText,
    //    clickText,
    AnalogClock,
    HumBurgerMenu,
    ButtonEvent,
    BgTimer,
    BgTimer,
    CupTimer,
    CountDownGrayTimer,
    TempTimer,
    DualcountTimer,
    axios,
    JqueryTimer,
    Footer,
  },
  created() {
    // ------------------------------
    // 現在のイベントリスト表示用データ取得
    // ------------------------------
    axios
      .get("./test.json")
      .then(
        function (response) {
          this.NowEventList = response.data;
        }.bind(this)
      )
      .catch(function (e) {
        console.error(e);
      });
  },
};
</script>


<style>
body {
  background-color: rgb(22, 22, 22);
  color: #CCC;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4c4e4e;
  margin: 0px;
}
#clock {
  width: 500px;
  height: 200px;
  position: absolute;
}
#under {
  width: 500px;
  height: 200px;
  position: fixed;
  top: 300px;
  left: 200px;
}

.routerNav {
  position: absolute;
  right: 30px;
  bottom: 25px;
}
</style>

