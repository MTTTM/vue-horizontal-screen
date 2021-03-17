import Vue from 'vue'
import App from './App.vue'
import {directive,event} from "./index.js"
//import {directive,event} from "vue-horizontal-screen"

Vue.config.productionTip = false
Vue.directive('horizontal-screen', {...directive});
event();//  addEventListener
new Vue({
  render: h => h(App),
}).$mount('#app')
