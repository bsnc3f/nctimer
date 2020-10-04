<template>
  <div id="app">
    <!-- v-bind -->
    <a :[attribute]="url">google |</a>
    <a v-bind="AlarmList">twitter</a>
    <!-- v-on:mousemove -->
    <!--    <p v-on:mousemove="mousePosition">マウスをのせると座標を取得します</p>  -->
    <!-- .stopでイベント修飾子のevent.stopProoagation、　.preventで　event.prebentDefaultの代わりになる  -->
    <p v-on:mousemove="mousePosition">
      home.vue 内のマウス座標 但し、
      <span v-on:mousemove.stop>【この文字上では反応しません】</span>
      X:{{x}}, Y:{{y}}
    </p>
    <!--  キーボードイベント発火 -->
    <input type="text" v-on:keyup.enter="keyEvent">
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      attribute: "href",
      url: "http://google.com",
      // オブジェクト化
      AlarmList: {
        href: "http://twitter.com",
        id: 1,
        housou: 37
      },
      x: 0,
      y: 0
    };
  },
  methods: {
    // v-on:mousemove
    mousePosition: function(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    },
    // キーボードイベント発火
    keyEvent: function() {
      alert("キーボードイベント発火");
    }
  }
};
</script>
