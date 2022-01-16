<template>
  <div class="horizotal-screen-swipe-lucy" ref="hs">
    <slot />
  </div>
</template>
<script>
import { directiveForDom } from "../../index.js";
export default {
  inject: ["app"],
  props: {
    stop: {
      type: Number,
      requred: false,
    },
    prevent: {
      type: Number,
      requred: false,
    },
    swipeCallback: {
      type: Function,
    },
  },
  watch: {
    "app.rotate"(newV) {
      console.log("rotate x", newV);
      this.bindFunc();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.bindFunc();
    });
  },
  beforeDestroy() {
    directive.unbind(this.$refs["hs"]);
  },
  methods: {
    bindFunc() {
      console.log("this.$props*****", this.$props);
      directiveForDom.unbind(this.$refs["hs"]);
      directiveForDom.bind(this.$refs["hs"], {
        rotate: this.app.rotate,
        ...this.$props,
      });
    },
  },
};
</script>
