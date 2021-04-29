
import App from './App.vue'
import { createApp } from 'vue'
const app = createApp(App)

import {directive,event,directiveForDom} from "./index.js"
//import {directive,event,directiveForDom} from "vue-horizontal-screen"

app.directive('horizontal-screen', {...directive});
app.directive('hs-swipe', {...directiveForDom});
event();
app.mount('#app');
