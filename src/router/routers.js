import Home from '../index.vue';
import Clockwise from "../Clockwise.vue"
import Counterclockwise from "../Counterclockwise.vue"
export default [
  {
    path: '/',  // 重定向到home页面
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    title: "home",
  },
  {
    path: "/Clockwise",
    component: Clockwise,
    title: "Clockwise"
  },
  {
    path: "/Counterclockwise",
    component: Counterclockwise,
    title: "Counterclockwise"
  }
]
