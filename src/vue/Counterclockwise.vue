<template>
  <div id="app" @click="reset">
    <div v-horizontal-screen="obj" class="box" ref="hscreen">
      <div id="wrap">
        <div class="header">
          <div class="left">25</div>
          <div class="mid">40</div>
          <div class="right">50</div>
        </div>
        <div class="main">
          <div v-hs-swipe.stop.prevent="hsSwipe" class="dom-event">
            <p>Horizontal event</p>
            <h3>swipe type:{{ domSwipe }}</h3>
          </div>
          <div v-hs-swipe.stop.prevent="hsVSwipe" class="dom-event-v">
            <p>Vertical event</p>
            <h3>swipe type:{{ domVSwipe }}</h3>
          </div>
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
        rotate: -90,
        AdaptEventName: "", //(No longer recommend)Monitor adaptation status events，default is hsAdapt
        adaptedCallback: "adaptedCallback", //(recommend)Replace  AdaptEventName
      },
      domSwipe: "--",
      domVSwipe: "--",
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
    },
    hsVSwipe(data) {
      let { type, dis } = data;
      if (type == "swipeBottom" && dis >= 5) {
        console.log("swipeBottom");
        this.domVSwipe = "swipeBottom";
      } else if (type == "swipeTop" && dis >= 5) {
        console.log("swipeTop");
        this.domVSwipe = "swipeTop";
      }
    },
  },
};
</script>

<style lang="scss">
</style>
