# vue-horizontal-screen

=====================

no longer maintained！！

please use the [horizontal-screen-web](https://www.npmjs.com/package/horizontal-screen-web?activeTab=dependencies) instead.

The author does not have enough energy to manage the two versions of vue and react separately

=====================

## Desc

- Mobile web page landscape.listen swipe events

## preview

demo1

![image](https://raw.githubusercontent.com/MTTTM/vue-horizontal-screen/main/distTest/qrcode.png)

demo2

![image](https://raw.githubusercontent.com/MTTTM/vue-horizontal-screen/main/distTest/qrcode_1.png)

## Start

```
npm install vue-horizontal-screen
```

#### import

```javascript
import { HorizontalScreen, SwipeWrap } from "vue-horizontal-screen";
```

### HorizontalScreen props

| key             | desc                                                          | default  | required |
| --------------- | ------------------------------------------------------------- | -------- | -------- |
| width           | Design draft width                                            | --       | TRUE     |
| height          | Design draft height                                           | --       | TRUE     |
| rotate          | Rotation angle. 90 and -90 choose one                         | 90       | FALSE    |
| cssVar          | css variable name                                             | --hs-var | FALSE    |
| times           | Design draft multiple                                         | --       | TRUE     |
| triggerTime     | Time to trigger adaptation after window change                | 1000     | FALSE    |
| adaptedCallback | adapted callback function,string or function,params:(el,bool) | --       | FALSE    |
| setWrapAttr     | Set the width and height of the container                     | TRUE     | FALSE    |

### SwipeWrap props

| key           | desc                          | default | required |
| ------------- | ----------------------------- | ------- | -------- |
| swipeCallback | swipe event callBack function | --      | FALSE    |
| stop          | event.stopPropagation         | false   | FALSE    |
| prevent       | event.preventDefault          | false   | FALSE    |

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

### Usage demo (Design draft size （667 _ 3）_（375 \* 3）)

#### vue template

```html
<template>
  <horizontal-screen v-bind="obj" :adapted-callback="adaptedCallback">
    <div id="wrap">
      <div class="header">
        <div class="left">25</div>
        <div class="mid">
          <span @click="changeRotate"> CLICKME{{ obj.rotate }}</span>
        </div>
        <div class="right">50</div>
      </div>
      <div class="main">
        <swipe-wrap class="dom-event" :swipe-callback="hsSwipe">
          <p>Horizontal event</p>
          <h3>swipe type:{{ domSwipe }}</h3>
        </swipe-wrap>
        <swipe-wrap class="dom-event2" :swipe-callback="hsSwipe2">
          <p>Vertical event</p>
          <h3>swipe type:{{ domSwipe2 }}</h3>
        </swipe-wrap>
      </div>
      <div class="footer"></div>
    </div>
  </horizontal-screen>
</template>
```

#### vue script

```javascript
import { HorizontalScreen, SwipeWrap } from "vue-horizontal-screen";
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
      }, 1000);
    },
    swipeCallback(obj) {
      if (obj.data.data.type) {
        alert(obj.data.data.type);
      } else {
        alert("hsAdapt");
      }
    },
    hsSwipe(data, el) {
      let { type, dis } = data;
      if (type == "swipeLeft" && dis >= 20) {
        this.domSwipe = "swipeLeft";
      } else if (type == "swipeRight" && dis >= 20) {
        this.domSwipe = "swipeRight";
      }
    },
    hsSwipe2(data, el) {
      let { type, dis } = data;
      if (type == "swipeBottom" && dis >= 5) {
        this.domSwipe2 = "swipeBottom";
      } else if (type == "swipeTop" && dis >= 5) {
        this.domSwipe2 = "swipeTop";
      }
    },
  },
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
