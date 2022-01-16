<template>
  <HorizontalScreen v-bind="obj" :adaptedCallback="adaptedCallback">
    <div id="wrap">
      <div class="header">
        <div class="left">25</div>
        <div class="mid">
          <span @click="changeRotate">Click HERE: {{ obj.rotate }}</span>
        </div>
        <div class="right">50</div>
      </div>
      <div class="main">
        <SwipeWrap class="dom-event" :swipeCallback="hsSwipe">
          <p>Horizontal event</p>
          <h3>swipe type:{{ domSwipe }}</h3>
        </SwipeWrap>
        <SwipeWrap class="dom-event2" :swipeCallback="hsSwipe2">
          <p>Vertical event</p>
          <h3>swipe type:{{ domSwipe2 }}</h3>
        </SwipeWrap>
      </div>
      <div class="footer"></div>
    </div>
  </HorizontalScreen>
</template>

<script>
import "../index.scss";
import { HorizontalScreen, SwipeWrap } from "./src/index.js";
export default {
  name: "App",
  components: { HorizontalScreen, SwipeWrap },
  data() {
    return {
      obj: {
        width: 2001,
        height: 1125,
        cssvar: "hs-var",
        times: 3,
        rotate: 90,
        AdaptEventName: "", //(No longer recommend)Monitor adaptation status events，default is hsAdapt
      },
      domSwipe: "--",
      domSwipe2: "--",
      show2: true,
    };
  },
  methods: {
    changeRotate() {
      this.obj.rotate = this.obj.rotate == 90 ? -90 : 90;
    },
    adaptedCallback(e) {
      clearTimeout(window.timer);
      window.timer = setTimeout(() => {
        alert("adaptedCallback");
        console.log("e", e);
      }, 1000);
    },
    swipeCallback(obj) {
      if (obj.data.data.type) {
        alert(obj.data.data.type);
      } else {
        alert("hsAdapt");
      }
    },
    reset() {
      // this.$refs["hscreen"].$hsLayout();
    },
    hsSwipe(data, el) {
      let { type, dis } = data;
      console.log("dom event", data, type, dis, el);
      if (type == "swipeLeft" && dis >= 20) {
        this.domSwipe = "swipeLeft";
        console.log("swipeLeft");
      } else if (type == "swipeRight" && dis >= 20) {
        console.log("swipeRight");
        this.domSwipe = "swipeRight";
      }
    },
    hsSwipe2(data, el) {
      let { type, dis } = data;
      console.error("dom event", data, type, dis, el);

      if (type == "swipeBottom" && dis >= 5) {
        console.log("swipeBottom");
        this.domSwipe2 = "swipeBottom";
      } else if (type == "swipeTop" && dis >= 5) {
        console.log("swipeTop");
        this.domSwipe2 = "swipeTop";
      }
    },
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
  touch-action: none; /**disabled browser native event */
}
@function px($num) {
  @return calc((#{$num}/ 3 * var(--hc-var)) * 1px);
}
.home {
  position: fixed;
  right: 20px;
  top: 10px;
  background: red;
  color: #fff;
  z-index: 9999;
}
</style>
