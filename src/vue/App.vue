<template>
  <div id="app">
    <a href="javascript:;" class="home" onclick="history.back()">home</a>
    <router-view></router-view>
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
.home {
  position: fixed;
  right: 20px;
  top: 10px;
  background: red;
  color: #fff;
  z-index: 9999;
}
</style>
