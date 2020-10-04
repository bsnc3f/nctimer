<template>
  <div id="app">
    <!--  キーボードイベント発火 -->
    <!-- <AnalogClock /> -->
    <div id="form">
      <input
        v-model.number="inputValue"
        type="text"
        class="input"
        ref="focusThis"
        v-on:keyup.enter="keyEvent"
        v-on:keyup.+="keyEvent2"
        v-on:keydown.a="call('down')"
        v-on:keyup.a="call('up')"
      />
    </div>
    <input type="text" id="selector" value="" v-model="souceSelector" />

    <div class="checkbox">
      <input
        type="checkbox"
        id="Analog"
        value="AnalogClock"
        v-model="checkedNames"
      />
      <label for="Analog">AnalogClock</label>
      <input type="checkbox" id="Bg" value="BgTimer" v-model="checkedNames" />
      <label for="Bg">ButtonEvent</label>
      <input
        type="checkbox"
        id="Button"
        value="Button Event"
        v-model="checkedNames"
      />
      <label for="Button">ButtonEvent</label>
      <br />

      <span>Checked names: {{ checkedNames }}</span>
    </div>
    <!-- keep-alive でcomponentタグの要素がデストロイされなくなる -->
    <components :is="CurrentComponent"></components>
    <!-- <keep-alive> </keep-alive> -->
    <!-- <JqueryTimer /> -->
    <div class="cupTimer" v-if="show">
      <CupTimer />
      <DualcountTimer />
    </div>
    <p class="inputValue">{{ inputValue }}</p>

    <!-- <div id="BgTimer" v-if="show2">
      <BgTimer />
    </div> -->
  </div>
</template>

<script>
import AnalogClock from "../components/AnalogClock.vue";
import CupTimer from "../components/CupTimer.vue";
import CountDownGrayTimer from "../components/CountDownGrayTimer";
import BgTimer from "../components/BgTimer.vue";
import DualcountTimer from "../components/DualcountTimer.vue";
import moment from "vue-moment";
import JqueryTimer from "../components/JqueryTimer.vue";
import axios from "../components/axios.vue";
import Footer from "../components/Footer.vue";
import Jexcel from "../components/JExcel.vue";

import NowEventList from "../components/NowEventList.vue";
import test from "../components/test.vue";
import test2 from "../components/test2.vue";
// import test3 from "../components/test3.vue";

export default {
  name: "app",
  moment,
  components: {
    AnalogClock,
    CupTimer,
    CountDownGrayTimer,
    BgTimer,
    DualcountTimer,
    JqueryTimer,
    Jexcel,
    axios,
    NowEventList,
    test,
    test2,
    // test3,
    Footer,
  },
  data() {
    return {
      inputValue: "",
      checkedNames: [],
      CurrentComponent: test,
      setValue: "",
      show: false,
      show2: false,
    };
  },
  mounted() {
    //    this.$refs.focusThis.focus();
  },
  methods: {
    // キーボードイベント発火
    keyEvent: function () {
      this.setValue = this.inputValue;
      this.show = !this.show;
      this.inputValue = "";
      //      console.log(this.setValue);
    },
    keyEvent2: function () {
      this.show2 = !this.show2;
    },
  },
  // destroyed() {}, // デストロイ
  // deactivated() {}, // keep-alive使用時、動的コンポーネントが切り替わり、表示される前
  // activated() {}, // keep-alive使用時、動的コンポーネントが表示される時
};
</script>


<style scoped>
#app {
  position: fixed;
  width: 100%;
  height: 100%;
}
#form {
  position: fixed;
  top: 10px;
  left: 5px;
}
.input {
  width: 140px;
  height: 30px;
  background-color: #111;
  color: #999;
  font-size: 1.4rem;
}

.inputValue {
  position: absolute;
  height: 15%;
  top: 485px;
  left: 170px;
  font-size: 180px;
}
.cupTimer {
  position: fixed;
  right: 55px;
  top: 35px;
}
#BgTimer {
  position: fixed;
  top: 0px;
  right: 0px;
}
</style>
