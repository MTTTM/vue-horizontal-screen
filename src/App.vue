<template>
  <div id="app">
    <div v-horizontal-screen="obj" class="box">
      <div id="wrap">
        <div class="header">
          <div class="left">25</div>
          <div class="mid">40</div>
          <div class="right">50</div>
        </div>
        <div class="main"></div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      obj: {
        width: 2001,
        height: 1125,
        cssVar: "hc-var",
        times: 3
      }
    };
  },
  mounted() {
    window.addEventListener('swipeLeft', function(obj){
      console.log("swipeLeft",obj.data.data)
      alert("swipeLeft")
    });
    window.addEventListener('swipeRight', function(obj){
      console.log("swipeRight",obj.data.data)
       alert("swipeRight")
    });
    window.addEventListener('swipeTop', function(obj){
      console.log("swipeTop",obj.data.data)
       alert("swipeTop")
    });
    window.addEventListener('swipeBottom', function(obj){
      console.log("swipeBottom",obj.data.data)
       alert("swipeBottom")
    });
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
@function px($num) {
  @return calc((#{$num}/ 3 * var(--hc-var)) * 1px);
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
}
#wrap {
  width: px(667 * 3);
  height: px(375 * 3);
}
.header {
  height: px(50 * 3);
  background: blue;
  display: flex;
  color: red;
  .left {
    background: pink;
    height: px(25 * 3);
    width: px(300 * 3);
  }
  .mid {
    background: yellow;
    height: px(40 * 3);
    width: px(300 * 3);
  }
  .right {
    background: black;
    height: px(50 * 3);
    width: px(75 * 3);
  }
}
.main {
  height: px(275 * 3);
  background: green;
}
.footer {
  height: px(50 * 3);
  background: blue;
}
</style>
