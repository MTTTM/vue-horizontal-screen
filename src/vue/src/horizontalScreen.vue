<template>
  <div class="horizotal-screen-lucy" ref="hs">
    <slot />
  </div>
</template>
<script>
import { directive } from "../../index.js";
export default {
  provide() {
    return {
      app: this,
    };
  },
  props: {
    width: {
      type: Number,
      requred: true,
    },
    height: {
      type: Number,
      requred: true,
    },
    cssvar: {
      type: String,
    },
    times: {
      type: Number,
      requred: true,
    },
    times: {
      type: Number,
      requred: true,
    },
    triggerTime: {
      type: Number,
      requred: true,
    },
    setWrapAttr: {
      type: Boolean,
      default: () => true,
    },
    rotate: {
      type: Number,
      validator: function (value) {
        return [90, -90].indexOf(value) !== -1;
      },
      default: () => 90,
    },
    adaptedCallback: {
      type: Function,
    },
  },
  watch: {
    rotate() {
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
      directive.unbind(this.$refs["hs"]);
      console.log("this.$props", this.$props);
      directive.bind(this.$refs["hs"], this.$props);
    },
  },
};
</script>
