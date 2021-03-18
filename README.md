# vue-horizontal-screen
## Desc
It provides horizontal web page layout and events.[online](https://2gt9f.csb.app/)

## Start
```
npm install vue-horizontal-screen
```
### Directive
|  key   | desc  |default |required|
|  ----  | ----  |---| ---|
| width  | Design draft width | -- | TRUE|
| height  | Design draft height | --|TRUE|
| cssVar  | css variable name | --hc-var |FALSE|
| times  | Design draft multiple |--|TRUE|
| disabledresized  | Disable response to trigger layout when window changes |FALSE|FALSE|

### params of event
* params {obj} 
*  description pre {string} Event name prefix
*  description distance {number}  The distance to trigger the event, default 50

### event name
* swipeLeft
* swipeRight
* swipeTop
* swipeBottom

### css var usage
```scss
@function px($num) {
  @return calc((#{$num}/ 3 * var(--hc-var)) * 1px);
}
.main {
  height: px(275 * 3);
  background: green;
}
```
### trigger screen adaptation
```javascript
  this.$refs['hscreen'].$hsLayout();
```

### Usage demo
### Design draft size  （667 * 3）*（375 * 3）;
#### main.js
```javascript
 import {directive,event} from "vue-horizontal-screen"
 Vue.directive('horizontal-screen', {...directive});
 event();//  addEventListener
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
        <div class="main"></div>
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
        cssVar: "hc-var",
        times: 3
      }
    };
  },
  mounted() {
    window.addEventListener('swipeLeft', function(obj){
      console.log("swipeLeft",obj.data.data)
    });
    window.addEventListener('swipeRight', function(obj){
      console.log("swipeRight",obj.data.data)
    });
    window.addEventListener('swipeTop', function(obj){
      console.log("swipeTop",obj.data.data)
    });
    window.addEventListener('swipeBottom', function(obj){
      console.log("swipeBottom",obj.data.data)
    });
  },
  methods: {
    reset(){
      this.$refs['hscreen'].$hsLayout();
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
```
