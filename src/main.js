import Vue from 'vue'
import App from './App.vue'
import {directive,event,directiveForDom} from "./index.js"
//import {directive,event,directiveForDom} from "vue-horizontal-screen"

Vue.config.productionTip = false
Vue.directive('horizontal-screen', {...directive});
Vue.directive('hs-swipe', {...directiveForDom});
event();//  addEventListener
event();//  addEventListener
new Vue({
  render: h => h(App),
}).$mount('#app')
