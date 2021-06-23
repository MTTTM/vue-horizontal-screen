# vue-horizontal-screen

## Desc

- It provides horizontal web page layout and events.[online](https://2gt9f.csb.app/)
- Support computer(Version 0.1.3 or greater)
- Support V3(Version 0.1.11 or greater)

## Start

```
npm install vue-horizontal-screen
```

### Directive

| key             | desc                                                                                                | default  | required |
| --------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| width           | Design draft width                                                                                  | --       | TRUE     |
| height          | Design draft height                                                                                 | --       | TRUE     |
| rotate          | Rotation angle. 90 and -90 choose one                                                               | 90       | FALSE    |
| cssVar          | css variable name                                                                                   | --hs-var | FALSE    |
| times           | Design draft multiple                                                                               | --       | TRUE     |
| triggerTime     | Time to trigger adaptation after window change(no work on computer side)                            | 1000     | FALSE    |
| AdaptEventName  | Adaptation status Event <font color='red'> No longer recommend</font>                               | hsAdapt  | FALSE    |
| adaptedCallback | adapted callback function,string or function,params:(el,bool) <font color='green'> recommend</font> | --       | FALSE    |
| setWrapAttr     | Set the width and height of the container                                                           | TRUE     | FALSE    |

### directiveForDom

- Bind events to document nodes
- Modifier:`.stop` event.stopPropagation()
- Modifier: `.prevent` event.preventDefault()
- Modifier:`.clockwise` default true, when Directive params rotate is 90，use it
- Modifier:`.counterclockwise`,when Directive params rotate is -90,use it.

### params of event

- params {obj}
- description pre {string} Event name prefix
- description distance {number} The distance to trigger the event, default 50
- description rotate {number} 90 or -90，Please stay the same as params rotate of Directive

### window.addEventListener

- swipeLeft
- swipeRight
- swipeTop
- swipeBottom
- hsAdapt <font color='red'> No longer recommend</font>

### css var usage (Just recommended, you can replace it with other layout units)

```scss
@function px($num) {
  @return calc((#{$num}/ 3 * var(--hs-var)) * 1px);
}
.main {
  height: px(275 * 3);
  background: green;
}
```

### trigger screen adaptation

```javascript
this.$refs["hscreen"].$hsLayout();
```

### Usage demo

### Design draft size （667 _ 3）_（375 \* 3）;

#### main.js

```javascript
import { directive, event, directiveForDom } from "vue-horizontal-screen";
Vue.directive("horizontal-screen", { ...directive });
Vue.directive("hs-swipe", { ...directiveForDom });
event(); //  addEventListener
```

#### vue template

```html
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
          <p>Let's do it!!</p>
          <div v-hs-swipe.stop="hsSwipe" class="dom-event">Dom Swipe Event</div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
```

#### vue script

```javascript
export default {
  name: "App",
  data() {
    return {
      obj: {
        width: 2001,
        height: 1125,
        cssVar: "hs-var",
        times: 3,
        adaptedCallback: "adaptedCallback" //Replace  window’s event hsAdapt
      }
    };
  },
  mounted() {
    //window.addEventListener("hsAdapt", this.swipeCallback); //No longer recommend
    window.addEventListener("swipeLeft", this.swipeCallback);
    window.addEventListener("swipeRight", this.swipeCallback);
    window.addEventListener("swipeTop", this.swipeCallback);
    window.addEventListener("swipeBottom", this.swipeCallback);
  },
  beforeDestroy() {
    /*don't forget to remove eventlistener!!*/
    // window.removeEventListener("hsAdapt", this.swipeCallback); //No longer recommend
    window.removeEventListener("swipeLeft", this.swipeCallback);
    window.removeEventListener("swipeRight", this.swipeCallback);
    window.removeEventListener("swipeTop", this.swipeCallback);
    window.removeEventListener("swipeBottom", this.swipeCallback);
  },
  methods: {
    adaptedCallback(e) {
      alert("adaptedCallback");
      console.log("e", e);
    },
    swipeCallback(obj) {
      if (obj.data.data.type) {
        alert(obj.data.data.type);
      } else {
        alert("hsAdapt");
      }
    },
    reset() {
      this.$refs["hscreen"].$hsLayout();
    },
    hsSwipe(data, el) {
      let { type, dis } = data;
      console.log("dom event", data, type, dis, el);
      if (type == "swipeLeft" && dis >= 20) {
        console.log("swipeLeft");
      } else if (type == "swipeRight" && dis >= 20) {
        console.log("swipeRight");
      }
      // if (type == "swipeBottom" && dis >= 5) {
      //   console.log("swipeBottom");
      // } else if (type == "swipeTop" && dis >= 5) {
      //   console.log("swipeTop");
      // }
    }
  }
};
```

#### scss

```scss
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
  @return calc((#{$num}/ 3 * var(--hs-var)) * 1px);
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
```
