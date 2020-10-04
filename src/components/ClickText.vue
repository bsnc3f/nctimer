
<template>
  <div id="app">
    <!-- jQuery - ボタンクリックで出現する要素 -->
    <div class="module">
      <button id="fuu" class="secList">Section1</button>
    </div>
    <div class="module">
      <button id="euu" class="secList">Section2</button>
    </div>
    <div class="module">
      <button id="guu" class="secList">Section3</button>
    </div>

    <div class="fuu section">
      <div class="innerText1">
        <h2>Section1</h2>
        <p>hoge1</p>
      </div>
    </div>
    <div class="euu section">
      <div class="innerText2">
        <h2>Section2</h2>
        <p>hoge2</p>
      </div>
    </div>
    <div class="guu section">
      <div class="innerText3">
        <h2>Section3</h2>
        <p>hoge3</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "app",
  mounted: function() {
    // <!-- jQuery - ボタンクリックで出現する要素 -->
    $(function() {
      $(".section").hide();

      $(".secList").on("click", function() {
        // クリックした要素の ID と違うクラス名のセクションを非表示
        $(".section")
          .not($("." + $(this).attr("id")))
          .hide();
        // クリックした要素の ID と同じクラスのセクションを表示
        $("." + $(this).attr("id")).toggle(500);
        // クリックした要素の ID と同じクラスのセクションを表示　hide() / show() / toggle() / fadeIn() / fadeOut() slideDown() slideUp()
        //$('.'+$(this).attr('id')).show(500);
      });
    });
  }
};
</script>


<style scoped>
/* jQuery - ボタンクリックで出現する要素 */
.module {
  display: inline-block;
}

.secList {
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #67c5ff;
  border: solid 2px #67c5ff;
  border-radius: 3px;
  transition: 0.4s;
}

.secList:hover {
  background: #67c5ff;
  color: white;
}

.innerText1 {
  background-color: #EAD9FF;
}

.innerText2 {
  background-color: #FFD5EC;
}

.innerText3 {
  background-color: #FFDBC9;
}
</style>