import Vue from 'vue'
import App from './App.vue'
import {directive,event} from "./index.js"
Vue.config.productionTip = false
Vue.directive('horizontal-screen', {...directive});
event();//  addEventListener
new Vue({
  render: h => h(App),
}).$mount('#app')
