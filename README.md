# horizontal-screen-web

## Desc

- suppert vue(2 and 3) and react

- Mobile web page landscape and finger swipe events

## preview

demo1

![image](https://raw.githubusercontent.com/MTTTM/vue-horizontal-screen/main/distTest/qrcode.png)

demo2

![image](https://raw.githubusercontent.com/MTTTM/vue-horizontal-screen/main/distTest/qrcode_1.png)

## Start

```
npm install vue-horizontal-screen

```

#### vue import

```javascript
import {
  HorizontalScreen,
  SwipeWrap,
} from "vue-horizontal-screen/dist/vue.horizontalScreen.es.js";
```

#### react import

```javascript
import {
  HorizontalScreen,
  SwipeWrap,
} from "vue-horizontal-screen/dist/react.horizontalScreen.es.js";
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
import {
  HorizontalScreen,
  SwipeWrap,
} from "vue-horizontal-screen/dist/vue.horizontalScreen.es.js";
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

#### react demo

```jsx
import React from "react";
import {
  HorizontalScreen,
  SwipeWrap,
} from "vue-horizontal-screen/dist/react.horizontalScreen.es.js";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hsObj: {
        width: 2001,
        height: 1125,
        cssvar: "hs-var",
        times: 3,
        rotate: 90,
      },
      domSwipeText: "",
      domSwipeText2: "",
    };
    this.myRef = React.createRef();
  }
  swipeCallBack(data, el) {
    let { type, dis } = data;
    console.log("dom event", data, type, dis, el);
    if (type === "swipeLeft" && dis >= 20) {
      this.setState({ domSwipeText: "swipeLeft" });
      console.log("swipeLeft");
    } else if (type === "swipeRight" && dis >= 20) {
      console.log("swipeRight");
      this.setState({ domSwipeText: "swipeRight" });
    }
  }
  swipeCallBack2(data, el) {
    let { type, dis } = data;
    console.log("dom   event", data, type, dis, el);

    if (type == "swipeBottom" && dis >= 5) {
      console.log("swipeBottom");
      this.setState({ domSwipeText2: "swipeBottom" });
    } else if (type == "swipeTop" && dis >= 5) {
      this.setState({ domSwipeText2: "swipeTop" });
    }
  }
  swipeCallback(obj) {
    if (obj.data.data.type) {
      alert(obj.data.data.type);
    } else {
      clearTimeout(window.hsAdaptTimer);
      window.hsAdaptTimer = setTimeout(() => {
        alert("hsAdapt");
      }, 1000);
    }
  }
  adaptedCallback() {
    clearTimeout(window.hsAdaptTimer);
    window.hsAdaptTimer = setTimeout(() => {
      alert("hsAdapt");
    }, 1000);
  }
  changeRoate() {
    let rotate = this.state.hsObj.rotate == 90 ? -90 : 90;
    this.setState({
      hsObj: {
        width: 2001,
        height: 1125,
        cssvar: "hs-var",
        times: 3,
        rotate: rotate,
      },
    });
  }

  render() {
    return (
      <div className="App">
        <HorizontalScreen
          {...this.state.hsObj}
          adaptedCallback={this.adaptedCallback}
          className="box"
        >
          <div id="wrap">
            <div className="header">
              <div className="left">25</div>
              <div className="mid">
                <span onClick={() => this.changeRoate()}>
                  CLICK ME!current route {this.state.hsObj.rotate}
                </span>
              </div>
              <div className="right">50</div>
            </div>
            <div className="main">
              <SwipeWrap
                swipeCallback={(data, el) => this.swipeCallBack(data, el)}
                stop={true}
                prevent={true}
                className="dom-event"
              >
                <div className="dom-event">
                  <p>Horizontal sliding area.</p>
                  <h3>swipe type:{this.state.domSwipeText}</h3>
                </div>
              </SwipeWrap>

              <SwipeWrap
                swipeCallback={(data, el) => this.swipeCallBack2(data, el)}
                stop={true}
                prevent={true}
                className="dom-event"
              >
                <div className="dom-event2">
                  <p>Vertical sliding area.</p>
                  <h3>swipe type:{this.state.domSwipeText2}</h3>
                </div>
              </SwipeWrap>
            </div>
            <div className="footer"></div>
          </div>
        </HorizontalScreen>
      </div>
    );
  }
}
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
