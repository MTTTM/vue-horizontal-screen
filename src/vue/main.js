
import App from './App.vue'
import { createApp } from 'vue'
import router from './router/index.js'
const app = createApp(App)

import { directive, directiveForDom } from "./index.js"
//import {directive,event,directiveForDom} from "vue-horizontal-screen"

app.directive('horizontal-screen', { ...directive });
app.directive('hs-swipe', { ...directiveForDom });
// event();
app.use(router)
app.mount('#app');
