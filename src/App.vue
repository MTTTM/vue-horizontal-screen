<template>
  <div id="app" @click="reset">
    <!-- <div
      v-horizontal-screen="obj"
      class="box"
      ref="hscreen"
      v-if="show2"
      @click="show2 = false"
    >
      <div id="wrap">
        <div class="header">
          <div class="left">25</div>
          <div class="mid">40</div>
          <div class="right">50</div>
        </div>
        <div class="main">
          <div v-hs-swipe.stop.prevent="hsSwipe" class="dom-event">
            <p>Red block is Dom Swipe area.</p>
            <h3>swipe type:{{ domSwipe }}</h3>
          </div>
          <p>window swipe area</p>
        </div>
        <div class="footer"></div>
      </div>
    </div> -->
    <div v-horizontal-screen="obj" class="box" ref="hscreen">
      <div id="wrap">
        <div class="header">
          <div class="left">25</div>
          <div class="mid">40</div>
          <div class="right">50</div>
        </div>
        <div class="main">
          <div v-hs-swipe.stop.prevent="hsSwipe" class="dom-event">
            <p>Red block is Dom Swipe area.</p>
            <h3>swipe type:{{ domSwipe }}</h3>
          </div>
          <p>window swipe area</p>
        </div>
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
        times: 3,
        setWrapAttr: false,
        AdaptEventName: "", //(No longer recommend)Monitor adaptation status events，default is hsAdapt
        adaptedCallback: "adaptedCallback", //(recommend)Replace  AdaptEventName
      },
      domSwipe: "--",
      show2: true,
    };
  },
  mounted() {
    // window.addEventListener("hsAdapt", this.swipeCallback);//No longer recommend
    window.addEventListener("swipeLeft", this.swipeCallback);
    window.addEventListener("swipeRight", this.swipeCallback);
    window.addEventListener("swipeTop", this.swipeCallback);
    window.addEventListener("swipeBottom", this.swipeCallback);
  },
  beforeUnmount() {
    /*don't forget to remove eventlistener!!*/
    // window.removeEventListener("hsAdapt", this.swipeCallback);//No longer recommend
    window.removeEventListener("swipeLeft", this.swipeCallback);
    window.removeEventListener("swipeRight", this.swipeCallback);
    window.removeEventListener("swipeTop", this.swipeCallback);
    window.removeEventListener("swipeBottom", this.swipeCallback);
  },
  methods: {
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
      // if (type == "swipeBottom" && dis >= 5) {
      //   console.log("swipeBottom");
      //   this.domSwipe = "swipeBottom";
      // } else if (type == "swipeTop" && dis >= 5) {
      //   console.log("swipeTop");
      //   this.domSwipe = "swipeTop";
      // }
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
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  word-wrap: break-word;
  width: 100%;
  height: 100%;
}
#wrap {
  width: px(667 * 3);
  height: px(375 * 3);
}
p {
  font-size: px(16 * 3);
  text-align: center;
  line-height: 1.4;
}
.header {
  height: px(50 * 3);
  background: goldenrod;
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
  display: flex;
  flex-direction: column;
}
.dom-event {
  height: 50%;
  background: red;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer {
  height: px(50 * 3);
  background: blue;
}
</style>
